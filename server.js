require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const LESSONS = require("./lessons");
const GAME = require("./games");
const STORIES = require("./scenarios");
const { unlockedDay, dayStatuses } = require("./progress-logic");

const { MONGODB_URI, JWT_SECRET, PORT = 3000, ADMIN_EMAIL = "", COOKIE_SECURE,
  APP_URL = `http://localhost:${process.env.PORT || 3000}`, SMTP_HOST, SMTP_PORT = 587, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
if (!MONGODB_URI || !JWT_SECRET) { console.error("Set MONGODB_URI and JWT_SECRET in .env"); process.exit(1); }

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  done: { type: [String], default: [] },
  scores: { type: Map, of: Number, default: {} },
  secs: { type: Number, default: 0 },
  days: { type: [String], default: [] },
  lastLogin: Date,
  verified: { type: Boolean, default: true },   // legacy accounts count as verified; new sign-ups start unverified
  verifyHash: String, verifyExpires: Date, verifyAttempts: { type: Number, default: 0 }, verifySentAt: Date,
  xp: { type: Number, default: 0 },
  activity: { type: Map, of: Number, default: {} },
  gameDay: String, gameXpToday: { type: Number, default: 0 }, gameBest: { type: Number, default: 0 },
  storiesDone: { type: [String], default: [] },
  courseStart: { type: Map, of: String, default: {} },
  courseDays: { type: Map, of: [Number], default: {} },
  resetHash: String,
  resetExpires: Date,
  completedAt: Date,
  certId: String,
}, { timestamps: true });
const User = mongoose.model("User", userSchema);

const app = express();
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });
const today = () => new Date().toISOString().slice(0, 10);
const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

function setCookie(res, user) {
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: COOKIE_SECURE === "true", maxAge: 7 * 864e5 });
}
const auth = wrap(async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.cookies.token || "", JWT_SECRET);
    req.user = await User.findById(id);
  } catch { /* fall through */ }
  if (!req.user) return res.status(401).json({ error: "Please log in" });
  next();
});
const adminOnly = (req, res, next) => req.user.role === "admin" ? next() : res.status(403).json({ error: "Admins only" });

const publicUser = u => ({ id: u._id, name: u.name, email: u.email, role: u.role });
const levelOf = xp => Math.floor(xp / 200) + 1;
function progress(u) {
  const scores = Object.fromEntries(u.scores || []);
  const vals = Object.values(scores);
  const cd = Object.fromEntries([...u.courseDays].map(([k, v]) => [k, v.length]));
  const sumDone = Object.values(cd).reduce((a, b) => a + b, 0), daysTotal = LESSONS.reduce((a, l) => a + l.days.length, 0);
  let streak = 0; const d = new Date();
  const has = x => u.days.includes(x.toISOString().slice(0, 10));
  if (!has(d)) d.setDate(d.getDate() - 1);
  while (has(d)) { streak++; d.setDate(d.getDate() - 1); }
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const x = new Date(); x.setDate(x.getDate() - i); const k = x.toISOString().slice(0, 10);
    week.push({ day: x.toLocaleDateString("en", { weekday: "short" }), min: Math.round((u.activity.get(k) || 0) / 60) });
  }
  const n = u.done.length, E = {
    first: sumDone >= 1, learner: sumDone >= 7, perfect: vals.some(v => v === 100), streak: streak >= 7, hunter: u.gameBest >= 4, story: u.storiesDone.length >= 2, grad: n === LESSONS.length,
  };
  const badges = [["first","🌱","First Steps","Complete a study day"],["learner","📚","Week One","Complete 7 study days"],["perfect","💯","Perfect Score","Get 100% on a quiz"],
    ["hunter","🎣","Phish Hunter","Score 4/5 in Spot the Phish"],["story","🧭","Decision Maker","Finish both story scenarios"],["streak","🔥","On Fire","7-day streak"],["grad","🏅","Graduate","Complete every lesson"]]
    .map(([id, ico, t, d]) => ({ id, ico, t, d, earned: E[id] }));
  return {
    done: u.done, scores, courseDays: cd, daysTotal, secs: u.secs, activeDays: u.days.length, streak, week, badges,
    xp: u.xp, level: levelOf(u.xp), xpInLevel: u.xp % 200,
    avg: vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0,
    percent: Math.round(sumDone / daysTotal * 100), certified: !!u.completedAt,
  };
}

const mailer = SMTP_HOST ? nodemailer.createTransport({
  host: SMTP_HOST, port: +SMTP_PORT, secure: +SMTP_PORT === 465, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
}) : null;
async function sendMail(to, subject, text, html) {
  if (!mailer) { console.log(`\n[DEV MAIL – SMTP not configured]\nTo: ${to}\n${subject}\n${text}\n`); return; }
  await mailer.sendMail({ from: MAIL_FROM || SMTP_USER, to, subject, text, html });
}
const sha = t => crypto.createHash("sha256").update(t).digest("hex");

const FOUNDER = { name: process.env.FOUNDER_NAME || "Eta Orock Dobgima", title: process.env.FOUNDER_TITLE || "Creator & Manager, CyberShield" };
const SHOW_CODE = process.env.SHOW_CODE_IN_RESPONSE === "true";   // local testing only: returns the code in the API response
const LETTER = [
  "Thank you for joining CyberShield. By choosing to learn how to protect yourself online, you are also helping to protect your family, your colleagues and your community.",
  "I created this platform so that anyone, whatever their background, can build real and practical cyber security habits in short daily steps. Take your time, stay curious and revisit a lesson whenever you need to. Every scam you spot is a win.",
  "I am glad to have you with us. Welcome aboard.",
];
const codeHash = (code, email) => crypto.createHmac("sha256", JWT_SECRET).update(`${email}:${code}`).digest("hex");
const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function verificationEmail(user, code) {
  const first = user.name.split(" ")[0];
  const text = `Hello ${first},\n\nYour CyberShield verification code is:\n\n    ${code}\n\nEnter it on the website to activate your account. It expires in 15 minutes. If you did not sign up, you can ignore this email.\n\n${LETTER.join("\n\n")}\n\nWarm regards,\n${FOUNDER.name}\n${FOUNDER.title}\n`;
  const html = `<div style="background:#f4f6fa;padding:24px;font-family:Arial,Helvetica,sans-serif"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #dde3ee">
  <div style="background:linear-gradient(135deg,#14305e,#2563eb);padding:22px 26px;color:#fff;font-size:22px;font-weight:700">CyberShield</div>
  <div style="padding:26px;color:#0f1b33;line-height:1.6"><p style="margin-top:0">Hello ${esc(first)},</p><p>Your verification code is:</p>
  <div style="font-size:34px;font-weight:800;letter-spacing:10px;text-align:center;background:#e9effd;color:#14305e;border-radius:12px;padding:16px;margin:14px 0">${code}</div>
  <p style="color:#5a6a85;font-size:14px">Enter it on the website to activate your account. It expires in 15 minutes. If you did not sign up, you can ignore this email.</p><hr style="border:0;border-top:1px solid #dde3ee;margin:22px 0">
  ${LETTER.map(p => `<p>${esc(p)}</p>`).join("")}<p style="margin-bottom:2px">Warm regards,</p><p style="font:italic 22px Georgia,serif;margin:4px 0;color:#14305e">${esc(FOUNDER.name)}</p><p style="color:#5a6a85;font-size:14px;margin-top:0">${esc(FOUNDER.title)}</p></div></div></div>`;
  return { subject: "Your CyberShield verification code", text, html };
}
// Creates a fresh 6-digit code (valid 15 min, 5 attempts) and emails it with the thank-you letter
async function issueCode(user, soft) {
  if (soft && user.verifySentAt && Date.now() - user.verifySentAt < 45000) return null;
  const code = String(crypto.randomInt(100000, 1000000));
  user.verifyHash = codeHash(code, user.email); user.verifyExpires = new Date(Date.now() + 15 * 60e3); user.verifyAttempts = 0; user.verifySentAt = new Date();
  await user.save();
  const m = verificationEmail(user, code);
  sendMail(user.email, m.subject, m.text, m.html).catch(e => console.error("Mail failed:", e.message));
  return code;
}

// ---- auth ----
app.post("/api/register", authLimiter, wrap(async (req, res) => {
  const { name = "", email = "", password = "" } = req.body;
  if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: "Enter a name and a valid email" });
  if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });
  if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ error: "Email already registered" });
  const user = await User.create({
    name, email, passwordHash: await bcrypt.hash(password, 12),
    role: ADMIN_EMAIL && email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user",
    days: [today()], lastLogin: new Date(), verified: false,
  });
  const devCode = await issueCode(user);
  res.status(201).json({ needsVerification: true, email: user.email, ...(SHOW_CODE ? { devCode } : {}) });
}));

app.post("/api/login", authLimiter, wrap(async (req, res) => {
  const { email = "", password = "" } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase() });
  if (!user || !(await bcrypt.compare(String(password), user.passwordHash))) return res.status(401).json({ error: "Wrong email or password" });
  if (!user.verified) {
    const devCode = await issueCode(user, true);
    return res.status(403).json({ error: "Please verify your email first. We sent you a code.", needsVerification: true, email: user.email, ...(SHOW_CODE && devCode ? { devCode } : {}) });
  }
  if (!user.days.includes(today())) user.days.push(today());
  user.lastLogin = new Date(); await user.save();
  setCookie(res, user); res.json(publicUser(user));
}));

// Always answers the same way so attackers cannot discover which emails are registered
app.post("/api/forgot", authLimiter, wrap(async (req, res) => {
  const user = await User.findOne({ email: String(req.body.email || "").toLowerCase() });
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    user.resetHash = sha(token); user.resetExpires = new Date(Date.now() + 3600e3); await user.save();
    sendMail(user.email, "Reset your CyberShield password",
      `Hello ${user.name},\n\nUse this link within 1 hour to choose a new password:\n${APP_URL}/#reset=${token}\n\nIf you did not ask for this, ignore this email.`)
      .catch(e => console.error("Mail failed:", e.message));
  }
  res.json({ ok: true });
}));

app.post("/api/reset", authLimiter, wrap(async (req, res) => {
  const { token = "", password = "" } = req.body;
  if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });
  const user = await User.findOne({ resetHash: sha(String(token)), resetExpires: { $gt: new Date() } });
  if (!user) return res.status(400).json({ error: "This reset link is invalid or has expired" });
  user.passwordHash = await bcrypt.hash(password, 12); user.resetHash = undefined; user.resetExpires = undefined; user.verified = true;
  await user.save(); setCookie(res, user); res.json(publicUser(user));
}));

app.post("/api/verify", authLimiter, wrap(async (req, res) => {
  const email = String(req.body.email || "").toLowerCase().trim(), code = String(req.body.code || "").replace(/\D/g, "");
  const user = await User.findOne({ email });
  if (!user || !user.verifyHash) return res.status(400).json({ error: user && user.verified ? "This account is already verified. Please log in." : "Invalid or expired code" });
  if (user.verifyExpires < new Date()) return res.status(400).json({ error: "This code has expired. Please request a new one." });
  if (user.verifyAttempts >= 5) return res.status(429).json({ error: "Too many wrong attempts. Please request a new code." });
  const a = Buffer.from(codeHash(code, email)), b = Buffer.from(user.verifyHash);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) { user.verifyAttempts += 1; await user.save(); return res.status(400).json({ error: "That code is not correct" }); }
  user.verified = true; user.verifyHash = undefined; user.verifyExpires = undefined; user.verifyAttempts = 0; user.lastLogin = new Date();
  await user.save(); setCookie(res, user); res.json({ ...publicUser(user), welcome: true });
}));

app.post("/api/resend-code", authLimiter, wrap(async (req, res) => {
  const user = await User.findOne({ email: String(req.body.email || "").toLowerCase().trim() });
  if (user && !user.verified) {
    const devCode = await issueCode(user, true);
    if (!devCode) return res.status(429).json({ error: "Please wait a moment before requesting another code" });
    return res.json({ ok: true, ...(SHOW_CODE ? { devCode } : {}) });
  }
  res.json({ ok: true });   // same answer for unknown or already verified emails
}));
app.get("/api/about", (req, res) => res.json({ founder: FOUNDER, letter: LETTER }));

app.post("/api/logout", (req, res) => { res.clearCookie("token"); res.json({ ok: true }); });
app.get("/api/me", auth, (req, res) => res.json(publicUser(req.user)));

// ---- courses: 30 daily sessions each (lessons, weekly quizzes, final exam) ----
const UNLOCK_ALL = process.env.UNLOCK_ALL === "true";   // set true to open every day (demo / testing)
const findCourse = id => LESSONS.find(x => x.id === id);
const doneOf = (u, id) => u.courseDays.get(id) || [];
const state = (u, c) => dayStatuses(c.days, doneOf(u, c.id), unlockedDay(u.courseStart.get(c.id), today(), UNLOCK_ALL, c.days.length));

app.get("/api/lessons", auth, (req, res) => res.json(LESSONS.map(l => {
  const st = state(req.user, l);
  return { id: l.id, ico: l.ico, t: l.t, d: l.d, total: l.days.length, daysDone: st.filter(d => d.status === "done").length,
    started: req.user.courseStart.has(l.id), done: req.user.done.includes(l.id), score: req.user.scores.get(l.id) ?? null };
})));

app.get("/api/lessons/:id", auth, wrap(async (req, res) => {
  const c = findCourse(req.params.id); if (!c) return res.status(404).json({ error: "Course not found" });
  const u = req.user;
  if (!u.courseStart.has(c.id)) { u.courseStart.set(c.id, today()); await u.save(); }
  res.json({ id: c.id, ico: c.ico, t: c.t, d: c.d, days: state(u, c) });
}));

app.get("/api/lessons/:id/days/:n", auth, (req, res) => {
  const c = findCourse(req.params.id), n = parseInt(req.params.n, 10), day = c && c.days.find(x => x.n === n);
  if (!day) return res.status(404).json({ error: "Day not found" });
  const st = state(req.user, c).find(x => x.n === n);
  if (st.status !== "done" && st.status !== "open")
    return res.status(403).json({ error: st.status === "wait" ? `This session unlocks in ${st.unlocksIn} day(s). Come back soon!` : "Finish the previous day first" });
  res.json({ n, title: day.title, type: day.type, total: c.days.length, course: c.t, done: st.status === "done", html: day.html,
    questions: day.q && day.q.map(q => ({ q: q[0], options: q[1] })) });
});

app.post("/api/lessons/:id/days/:n/complete", auth, wrap(async (req, res) => {
  const c = findCourse(req.params.id), n = parseInt(req.params.n, 10), day = c && c.days.find(x => x.n === n);
  if (!day) return res.status(404).json({ error: "Day not found" });
  const u = req.user, st = state(u, c).find(x => x.n === n);
  if (st.status !== "done" && st.status !== "open") return res.status(403).json({ error: "This day isn't unlocked yet" });
  const wasDone = st.status === "done"; let gained = 0, out = { ok: true };
  if (day.type === "lesson") gained = wasDone ? 0 : 10;
  else { // quizzes and the exam are graded on the server
    const answers = Array.isArray(req.body.answers) ? req.body.answers : [];
    const results = day.q.map((q, i) => ({ correct: q[2], chosen: Number.isInteger(answers[i]) ? answers[i] : null, explanation: q[3] }));
    const ok = results.filter(r => r.chosen === r.correct).length, pct = Math.round(ok / day.q.length * 100), pass = pct >= 67;
    out = { ok, total: day.q.length, pct, pass, results };
    if (!pass) return res.json({ ...out, gained: 0 });
    gained = wasDone ? 0 : day.type === "exam" ? 100 + ok * 10 : 30;
    if (day.type === "exam") u.scores.set(c.id, Math.max(u.scores.get(c.id) || 0, pct));
  }
  if (!wasDone) { u.courseDays.set(c.id, [...doneOf(u, c.id), n]); u.xp += gained; }
  if (day.type === "exam" && !u.done.includes(c.id)) { u.done.push(c.id); out.courseDone = true; }
  if (u.done.length === LESSONS.length && !u.completedAt) { u.completedAt = new Date(); u.certId = crypto.randomBytes(5).toString("hex").toUpperCase(); }
  if (!u.days.includes(today())) u.days.push(today());
  await u.save(); res.json({ ...out, gained });
}));

app.post("/api/time", auth, wrap(async (req, res) => {
  const s = Math.min(Math.max(parseInt(req.body.seconds, 10) || 0, 0), 600);
  req.user.secs += s;
  req.user.activity.set(today(), (req.user.activity.get(today()) || 0) + s);
  if (req.user.activity.size > 30) [...req.user.activity.keys()].sort().slice(0, -30).forEach(k => req.user.activity.delete(k));
  if (!req.user.days.includes(today())) req.user.days.push(today());
  await req.user.save(); res.json({ ok: true });
}));

app.get("/api/dashboard", auth, (req, res) => res.json({
  user: publicUser(req.user), total: LESSONS.length,
  lessons: LESSONS.map(l => ({ id: l.id, ico: l.ico, t: l.t, days: l.days.length })), ...progress(req.user),
}));

// ---- game + leaderboard ----
app.get("/api/game/phish", auth, (req, res) => {
  const pick = [...GAME].sort(() => Math.random() - 0.5).slice(0, 5);
  res.json(pick.map(({ id, from, subject, body }) => ({ id, from, subject, body })));
});
app.post("/api/game/phish", auth, wrap(async (req, res) => {
  const answers = Array.isArray(req.body.answers) ? req.body.answers.slice(0, 5) : [];
  const results = answers.map(a => { const g = GAME.find(x => x.id === a.id); return g && { id: g.id, phish: g.phish, correct: g.phish === !!a.phish, why: g.why }; }).filter(Boolean);
  const score = results.filter(r => r.correct).length, u = req.user;
  if (u.gameDay !== today()) { u.gameDay = today(); u.gameXpToday = 0; }
  const gained = Math.max(0, Math.min(score * 10, 50 - u.gameXpToday)); // daily cap stops XP farming
  u.gameXpToday += gained; u.xp += gained; u.gameBest = Math.max(u.gameBest, score); await u.save();
  res.json({ score, total: results.length, gained, results });
}));
// stories: client sends the list of choice indexes; the server replays them so points can't be faked
app.get("/api/stories", auth, (req, res) => res.json(STORIES.map(s => ({
  id: s.id, ico: s.ico, title: s.title, start: s.start, done: req.user.storiesDone.includes(s.id),
  nodes: Object.fromEntries(Object.entries(s.nodes).map(([k, n]) => [k, { end: !!n.end, text: n.text, choices: (n.choices || []).map(c => ({ t: c.t, next: c.next, fb: c.fb, good: c.pts >= 5 })) }])),
}))));
app.post("/api/stories/:id", auth, wrap(async (req, res) => {
  const s = STORIES.find(x => x.id === req.params.id), path = Array.isArray(req.body.path) ? req.body.path : [];
  if (!s) return res.status(404).json({ error: "Story not found" });
  let node = s.nodes[s.start], pts = 0;
  for (const i of path) { const c = node.choices && node.choices[i]; if (!c) return res.status(400).json({ error: "Invalid path" }); pts += c.pts; node = s.nodes[c.next]; }
  if (!node.end) return res.status(400).json({ error: "Story not finished" });
  const u = req.user; let gained = 0;
  if (!u.storiesDone.includes(s.id)) { u.storiesDone.push(s.id); gained = Math.min(pts * 2, 40); u.xp += gained; await u.save(); }
  res.json({ pts, gained });
}));
app.get("/api/leaderboard", auth, wrap(async (req, res) => {
  const top = await User.find().sort({ xp: -1 }).limit(10);
  res.json(top.map(u => { const [f, ...r] = u.name.split(" "); return { name: r.length ? `${f} ${r[r.length - 1][0]}.` : f, xp: u.xp, level: levelOf(u.xp), me: u.id === req.user.id }; }));
}));

// ---- certificates ----
const certData = u => ({ name: u.name, date: u.completedAt, id: u.certId, lessons: LESSONS.map(l => l.t) });
app.get("/api/certificate", auth, (req, res) =>
  req.user.completedAt ? res.json(certData(req.user)) : res.status(403).json({ error: "Complete all lessons to earn your certificate" }));
// public, so employers or lecturers can confirm a certificate is genuine
app.get("/api/verify/:id", wrap(async (req, res) => {
  const u = await User.findOne({ certId: String(req.params.id).toUpperCase() });
  if (!u) return res.status(404).json({ valid: false });
  res.json({ valid: true, name: u.name, date: u.completedAt });
}));

// ---- admin ----
app.get("/api/admin/overview", auth, adminOnly, wrap(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).limit(500);
  const rows = users.map(u => ({ ...publicUser(u), lastLogin: u.lastLogin, ...progress(u) }));
  res.json({
    totalUsers: rows.length, total: LESSONS.length,
    avgCompletion: rows.length ? Math.round(rows.reduce((a, r) => a + r.percent, 0) / rows.length) : 0,
    completed: rows.filter(r => r.percent === 100).length, users: rows,
  });
}));

app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: "Server error" }); });

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`CyberShield running on http://localhost:${PORT}`));
}).catch(e => { console.error("MongoDB connection failed:", e.message); process.exit(1); });
