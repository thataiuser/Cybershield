const $ = s => document.querySelector(s), app = $("#app");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = s => { const m = Math.floor(s / 60); return m < 60 ? m + " min" : Math.floor(m / 60) + "h " + (m % 60) + "m"; };
let me = null, cur = null, t0 = 0, timer = null;

async function api(path, body) {
  const r = await fetch("/api" + path, body === undefined ? {} : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(data.error || "Request failed"), { status: r.status, needsVerification: data.needsVerification, email: data.email, devCode: data.devCode });
  return data;
}

/* ---- theme ---- */
try { const t = localStorage.getItem("theme"); if (t) document.documentElement.dataset.theme = t; } catch {}
function toggleTheme() {
  const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  const t = dark ? "light" : "dark"; document.documentElement.dataset.theme = t;
  try { localStorage.setItem("theme", t); } catch {}
}

/* ---- effects ---- */
function confetti() {
  const c = $("#cf"), x = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight;
  const cols = ["#14b8a6", "#6366f1", "#f59e0b", "#ef4444", "#22c55e", "#3b82f6"];
  const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * .4, w: 6 + Math.random() * 6, v: 2 + Math.random() * 4, dx: (Math.random() - .5) * 3, r: Math.random() * 6, col: cols[Math.random() * 6 | 0] }));
  let f = 0;
  (function draw() {
    x.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.y += p.v; p.x += p.dx; p.r += .1; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.col; x.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2); x.restore(); });
    if (++f < 170) requestAnimationFrame(draw); else x.clearRect(0, 0, c.width, c.height);
  })();
}
function countUp() {
  document.querySelectorAll("[data-n]").forEach(el => {
    const end = +el.dataset.n, suf = el.dataset.s || "", st = performance.now();
    (function step(t) { const p = Math.min((t - st) / 900, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); })(st);
  });
}

function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 20); setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 400); }, 3000);
}

/* ---- time tracking ---- */
function flush() {
  if (cur && t0) {
    const s = Math.round((Date.now() - t0) / 1000); t0 = Date.now();
    if (s > 0) fetch("/api/time", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seconds: s }), keepalive: true });
  }
}
addEventListener("pagehide", flush);

/* ---- navigation (collapsible sidebar) ---- */
const ICONS = {
  home: '<path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3zM4 17a3 3 0 0 1 3-3h12"/>',
  game: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  dash: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
  board: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
  admin: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  out: '<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
};
const svg = k => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;
function setNav(active) {
  const side = $("#side"), tg = $("#tg");
  side.hidden = tg.hidden = !me; document.body.classList.toggle("noside", !me);
  if (!me) return;
  const items = [["home", "Lessons"], ["game", "Challenge"], ["lab", "Lab"], ["dash", "My Progress"], ["board", "Leaderboard"]];
  if (me.role === "admin") items.push(["admin", "Admin"]);
  side.innerHTML = items.map(([v, t]) => `<button data-v="${v}" title="${t}" class="${v === active ? "on" : ""}">${svg(v)}<span class="lbl">${t}</span></button>`).join("")
    + `<div class="grow"></div><div class="who"><span class="lbl">${esc(me.name)}</span></div><button id="out" title="Log out">${svg("out")}<span class="lbl">Log out</span></button>`;
  side.querySelectorAll("[data-v]").forEach(b => b.onclick = () => { document.body.classList.remove("open"); go(b.dataset.v); });
  $("#out").onclick = async () => { flush(); cur = null; await api("/logout", {}); me = null; document.body.classList.remove("open"); setNav(); authView("login"); };
}
$("#th").onclick = toggleTheme;
$("#tg").onclick = () => {
  if (matchMedia("(max-width:760px)").matches) document.body.classList.toggle("open");
  else { const c = document.body.classList.toggle("collapsed"); try { localStorage.setItem("side", c ? "c" : "o"); } catch {} }
};
try { if (localStorage.getItem("side") === "c") document.body.classList.add("collapsed"); } catch {}
app.addEventListener("click", () => document.body.classList.remove("open"));

async function go(v, id, n) {
  flush(); clearInterval(timer); cur = null; setNav(v === "course" || v === "day" ? "home" : v);
  try { await ({ home, game, lab, dash, board, course, day, admin, cert })[v](id, n); }
  catch (e) { if (e.status === 401) { me = null; setNav(); authView("login"); } else app.innerHTML = `<p class="err">${esc(e.message)}</p><button id="bk">← Back</button>`, $("#bk").onclick = () => go(v === "day" ? "course" : "home", id); }
  scrollTo(0, 0);
}

/* ---- auth ---- */
const TEASE = [["phish", "Spotting phishing", "Recognise fake emails, SMS and links."], ["pass", "Strong passwords", "Build passwords that resist cracking."], ["mfa", "Multi-factor authentication", "Add a second lock to every account."],
  ["social", "Social engineering", "Resist manipulation by phone or in person."], ["browse", "Safe browsing and Wi-Fi", "Stay safe on any network."], ["mal", "Malware and backups", "Prevent, spot and recover from infection."]];
function authView(mode) {
  const reg = mode === "register";
  app.innerHTML = `<section class="landing"><div class="landin"><div class="pitchtxt"><div class="eyebrow">Cyber security awareness academy</div><h1>Think before you click.</h1>
  <p>Friendly, practical lessons that help you spot scams, protect your accounts and stay safe online. Learn a little every day and earn a certificate you can share.</p>
  <ul class="ticks"><li>Six 30-day courses with daily lessons and weekly quizzes</li><li>A hands-on phishing challenge and a safe practice lab</li><li>Your own dashboard with XP, badges and progress</li><li>Email-verified accounts and a verifiable certificate</li></ul></div>
  <div class="authcard"><h2 style="margin-top:0">${reg ? "Create your account" : "Welcome back"}</h2><p class="mute">${reg ? "Join in a minute. We will email you a 6-digit code to confirm it is you." : "Log in to continue learning."}</p>
  <form id="f">${reg ? '<input type="text" name="name" placeholder="Full name" required maxlength="60" autocomplete="name">' : ""}
  <input type="text" name="email" placeholder="Email" required autocomplete="email" inputmode="email">
  <input type="password" name="password" placeholder="Password${reg ? " (8+ characters)" : ""}" required autocomplete="${reg ? "new-password" : "current-password"}">
  <div class="err" id="err"></div><button class="pri" type="submit" style="width:100%">${reg ? "Create account" : "Log in"}</button></form>
  ${reg ? "" : '<p class="note"><button class="link" id="fg">Forgot password?</button></p>'}
  <p class="note">${reg ? "Already registered?" : "New here?"} <button class="link" id="sw">${reg ? "Log in" : "Create an account"}</button></p></div></div></section>
  <section class="wrapx"><h2 class="sec">What you will learn</h2><div class="grid">${TEASE.map(([id, t, d]) => `<div class="card lc"><img class="thumb" src="/img/photos/course-${id}.jpg" alt="" loading="lazy"><b>${t}</b><span class="mute">${d}</span><span class="tag">30-day course</span></div>`).join("")}</div></section>`;
  $("#sw").onclick = () => authView(reg ? "login" : "register");
  if ($("#fg")) $("#fg").onclick = forgotView;
  $("#f").onsubmit = async e => {
    e.preventDefault();
    try {
      const r = await api(reg ? "/register" : "/login", Object.fromEntries(new FormData(e.target)));
      if (r.needsVerification) return verifyView(r.email, r.devCode);
      me = r; go("home");
    } catch (er) { if (er.needsVerification) return verifyView(er.email, er.devCode); $("#err").textContent = er.message; }
  };
}
function verifyView(email, devCode) {
  app.innerHTML = `<div class="card codecard"><div class="seal">🔐</div><h1>Verify your email</h1><p class="mute">We sent a 6-digit code to <b>${esc(email)}</b>. Enter it below to activate your account. It expires in 15 minutes.</p>
  ${devCode ? `<p class="tip">Test mode: your code is <b>${esc(devCode)}</b></p>` : ""}
  <form id="vf"><input id="vc" class="codebox" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="······" required><div class="err" id="err"></div>
  <button class="pri" style="width:100%">Verify and continue</button></form>
  <p class="note">Did not get it? Check your spam folder or <button class="link" id="rs">send a new code</button> <span id="cd"></span></p><p class="note"><button class="link" id="bk">← Back</button></p></div>`;
  let cd = 45; const tick = () => { if (!$("#rs")) return; $("#rs").disabled = cd > 0; $("#cd").textContent = cd > 0 ? `(wait ${cd}s)` : ""; if (cd > 0) { cd--; setTimeout(tick, 1000); } }; tick();
  const submit = async () => {
    $("#err").textContent = "";
    try { me = await api("/verify", { email, code: $("#vc").value }); welcomeView(me); } catch (er) { $("#err").textContent = er.message; }
  };
  $("#vf").onsubmit = e => { e.preventDefault(); submit(); };
  $("#vc").oninput = e => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6); if (e.target.value.length === 6) submit(); };
  $("#rs").onclick = async () => { try { await api("/resend-code", { email }); toast("A new code is on its way"); cd = 45; tick(); } catch (er) { $("#err").textContent = er.message; } };
  $("#bk").onclick = () => authView("register");
}
async function welcomeView(u) {
  setNav("home"); confetti();
  const a = await api("/about").catch(() => null);
  app.innerHTML = `<div class="letter card"><div class="seal">🎉</div><h1>Welcome to CyberShield, ${esc(u.name.split(" ")[0])}!</h1><p class="mute">Your email is verified and your account is ready.</p>
  <div class="lettertxt">${((a && a.letter) || []).map(p => `<p>${esc(p)}</p>`).join("")}</div>
  <div class="sign"><div class="signname">${esc(a ? a.founder.name : "")}</div><div class="mute">${esc(a ? a.founder.title : "")}</div></div><button class="pri" id="st">Start learning</button></div>`;
  $("#st").onclick = () => go("home");
}
function forgotView() {
  app.innerHTML = `<div class="card" style="max-width:400px;margin:30px auto"><h1>Reset password</h1><p class="mute">Enter your email and we'll send a reset link.</p>
  <form id="f"><input type="text" name="email" placeholder="Email" required inputmode="email"><div class="err" id="err"></div>
  <button class="pri" type="submit" style="width:100%">Send reset link</button></form><p class="note"><button class="link" id="bk">Back to log in</button></p></div>`;
  $("#bk").onclick = () => authView("login");
  $("#f").onsubmit = async e => {
    e.preventDefault();
    try { await api("/forgot", { email: new FormData(e.target).get("email") }); $("#f").innerHTML = "<p>If that email is registered, a reset link is on its way. It expires in 1 hour.</p>"; }
    catch (er) { $("#err").textContent = er.message; }
  };
}
function resetView(token) {
  app.innerHTML = `<div class="card" style="max-width:400px;margin:30px auto"><h1>Choose a new password</h1><form id="f">
  <input type="password" name="password" placeholder="New password (8+ characters)" required autocomplete="new-password"><div class="err" id="err"></div>
  <button class="pri" type="submit" style="width:100%">Save password</button></form></div>`;
  $("#f").onsubmit = async e => {
    e.preventDefault();
    try { me = await api("/reset", { token, password: new FormData(e.target).get("password") }); history.replaceState(null, "", "/"); go("home"); }
    catch (er) { $("#err").textContent = er.message; }
  };
}

/* ---- courses (30 days each) ---- */
async function home() {
  const ls = await api("/lessons"), tot = ls.reduce((a, l) => a + l.total, 0), dn = ls.reduce((a, l) => a + l.daysDone, 0), h = new Date().getHours();
  app.innerHTML = `<div class="homebanner"><div class="eyebrow">Your learning hub</div><h1>${h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"}, ${esc(me.name.split(" ")[0])}</h1>
  <p class="lead">${dn === 0 ? "Welcome! Every course is a 30-day programme: one short session a day, a quiz each week and a final exam. Start any course today, and run several side by side." : `You have completed ${dn} of ${tot} study days. Small daily sessions are what make good habits stick.`}</p>
  <div class="bar"><i style="width:0" data-w="${Math.round(dn / tot * 100)}"></i></div><small>${dn} of ${tot} study days complete</small></div>
  <h2>Your courses</h2><div class="grid">${ls.map(l => `<div class="card lc"><img class="thumb" src="/img/photos/course-${l.id}.jpg" alt="" loading="lazy"><b>${esc(l.t)}</b><span class="mute">${esc(l.d)}</span>
  <div class="bar"><i style="width:0" data-w="${Math.round(l.daysDone / l.total * 100)}"></i></div>
  <span class="tag ${l.done ? "done" : ""}">${l.done ? "Course complete · exam " + l.score + "%" : l.started ? `Day ${Math.min(l.daysDone + 1, l.total)} of ${l.total}` : "30 days · about 10 min a day"}</span>
  <button class="${l.done ? "" : "pri"}" data-l="${l.id}">${l.done ? "Review course" : l.started ? "Continue" : "Start course"}</button></div>`).join("")}</div>
  <h2 style="margin-top:36px">Explore the essentials</h2><div class="grid explore">
  <div class="card lc"><img class="xthumb" src="/img/photos/explore-attacks.jpg" alt="Types of cyber security attacks" loading="lazy"><b>Know the threats</b><span class="mute">Phishing, ransomware, malware, social engineering and insider threats are the five attack types you are most likely to meet.</span></div>
  <div class="card lc"><img class="xthumb" src="/img/photos/explore-network.jpg" alt="Physical, technical and administrative network security" loading="lazy"><b>Three layers of network security</b><span class="mute">Physical controls, technical controls and administrative policies work together. Strong security needs all three.</span></div>
  <div class="card lc"><img class="xthumb" src="/img/photos/explore-principles.jpg" alt="Cyber security principles" loading="lazy"><b>Core principles</b><span class="mute">Keep data confidential, accurate and available, and give every person only the access they need.</span></div></div>`;
  app.querySelectorAll("[data-l]").forEach(b => b.onclick = () => go("course", b.dataset.l));
  requestAnimationFrame(() => document.querySelectorAll("[data-w]").forEach(e => e.style.width = e.dataset.w + "%"));
}

async function course(id) {
  const c = await api("/lessons/" + id), done = c.days.filter(d => d.status === "done").length, wait = c.days.find(d => d.status === "wait");
  app.innerHTML = `<button id="back">← All courses</button><img class="banner" src="/img/photos/course-${c.id}.jpg" alt=""><h1>${esc(c.t)}</h1>
  <p class="mute lead">${esc(c.d)} A 30-day programme: a short daily session, a review quiz every week and a final exam.</p>
  <div class="bar"><i style="width:0" data-w="${Math.round(done / c.days.length * 100)}"></i></div><p class="note">${done} of ${c.days.length} days complete</p>
  <div class="daygrid">${c.days.map(d => `<button class="day ${d.status}" data-n="${d.n}" title="${esc(d.title)}" ${d.status === "wait" || d.status === "locked" ? "disabled" : ""}>
  <b>${d.n}</b><small>${d.type === "lesson" ? "Lesson" : d.type === "quiz" ? "Quiz" : "Exam"}</small><span>${d.status === "done" ? "✓" : d.status === "open" ? "●" : "🔒"}</span></button>`).join("")}</div>
  <p class="note">${wait ? `Day ${wait.n} unlocks in ${wait.unlocksIn} day(s). One new session opens each day so the habits stick.` : done === c.days.length ? "You have completed this course." : "Tap the highlighted day to continue."}</p>`;
  $("#back").onclick = () => go("home");
  app.querySelectorAll(".day:not(:disabled)").forEach(b => b.onclick = () => go("day", id, +b.dataset.n));
  requestAnimationFrame(() => document.querySelectorAll("[data-w]").forEach(e => e.style.width = e.dataset.w + "%"));
}

async function day(id, n) {
  const d = await api(`/lessons/${id}/days/${n}`);
  cur = id; t0 = Date.now(); timer = setInterval(flush, 30000);
  const kind = d.type === "lesson" ? "Lesson" : d.type === "quiz" ? "Weekly review" : "Final exam";
  const next = async () => {
    const c = await api("/lessons/" + id), nx = c.days.find(x => x.n === n + 1);
    if (nx && nx.status === "open") return go("day", id, n + 1);
    if (nx && nx.status === "wait") toast(`Great work! Day ${n + 1} unlocks in ${nx.unlocksIn} day(s).`);
    go("course", id);
  };
  const body = d.type === "lesson" ? d.html : `<p class="mute">Score 67% or more to pass.</p>${d.questions.map((q, i) => `<div class="q"><b>${i + 1}. ${esc(q.q)}</b>${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"> ${esc(o)}</label>`).join("")}<div class="exp" hidden></div></div>`).join("")}`;
  app.innerHTML = `<button id="back">← Course overview</button><p class="tag" style="margin-top:12px">Day ${n} of ${d.total} · ${kind}</p><h1>${esc(d.title)}</h1><div class="card slide">${body}</div>
  <p><button class="pri" id="act">${d.type === "lesson" ? (d.done ? "Next day →" : "Mark complete & continue") : "Submit answers"}</button> <span id="res"></span></p>`;
  $("#back").onclick = () => go("course", id);
  $("#act").onclick = async () => {
    const answers = d.type === "lesson" ? [] : d.questions.map((_, i) => { const s = app.querySelector(`input[name=q${i}]:checked`); return s ? +s.value : null; });
    const r = await api(`/lessons/${id}/days/${n}/complete`, { answers });
    if (d.type === "lesson") { if (r.gained) toast(`+${r.gained} XP`); return next(); }
    r.results.forEach((x, i) => {
      const box = app.querySelectorAll(".q")[i], labs = box.querySelectorAll("label");
      labs.forEach(l => l.classList.remove("right", "wrong")); labs[x.correct].classList.add("right");
      if (x.chosen !== null && x.chosen !== x.correct) labs[x.chosen].classList.add("wrong");
      const e = box.querySelector(".exp"); e.hidden = false; e.textContent = x.explanation;
    });
    $("#res").innerHTML = `<b>${r.ok}/${r.total} (${r.pct}%)</b> – ${r.pass ? "Well done, you passed!" : "Almost there! Have another look at the lessons and try again. You've got this."}`;
    if (r.pass) {
      confetti(); if (r.gained) toast(`+${r.gained} XP earned!`); if (r.courseDone) toast("Course complete! 🎓");
      $("#act").textContent = "Continue →"; $("#act").onclick = next;
    }
  };
}

/* ---- phishing challenge ---- */
async function game() {
  const msgs = await api("/game/phish"), ans = {};
  app.innerHTML = `<img class="banner" src="/img/photos/challenge.jpg" alt=""><h1>🎣 Spot the Phish</h1><p class="mute">Is each message legitimate or a scam? Earn up to 50 XP a day.</p>
  ${msgs.map(m => `<div class="mail" data-id="${m.id}"><div class="meta">From: ${esc(m.from)}</div><b>${esc(m.subject)}</b><p>${esc(m.body)}</p>
  <button data-a="0">✅ Legit</button> <button data-a="1">🚩 Phishing</button><div class="exp" hidden></div></div>`).join("")}
  <button class="pri" id="sub" disabled>Check my answers</button> <span id="res"></span>`;
  app.querySelectorAll(".mail").forEach(m => m.querySelectorAll("[data-a]").forEach(b => b.onclick = () => {
    ans[m.dataset.id] = b.dataset.a === "1"; m.querySelectorAll("[data-a]").forEach(x => x.classList.toggle("on", x === b));
    $("#sub").disabled = Object.keys(ans).length < msgs.length;
  }));
  $("#sub").onclick = async () => {
    const r = await api("/game/phish", { answers: msgs.map(m => ({ id: m.id, phish: !!ans[m.id] })) });
    r.results.forEach(x => { const e = app.querySelector(`.mail[data-id=${x.id}] .exp`); e.hidden = false; e.textContent = (x.correct ? "✅ Correct. " : "❌ Not quite. ") + (x.phish ? "This was phishing. " : "This was legitimate. ") + x.why; });
    $("#res").innerHTML = `<b>${r.score}/${r.total}</b> ${r.gained ? `<span class="tag done">+${r.gained} XP</span>` : ""}`;
    $("#sub").disabled = true; if (r.score >= 4) confetti();
    $("#sub").insertAdjacentHTML("afterend", ' <button id="again">Play again</button>'); $("#again").onclick = () => go("game");
  };
}

/* ---- dashboard ---- */
async function dash() {
  const d = await api("/dashboard"), C = 2 * Math.PI * 52, n = d.done.length, max = Math.max(5, ...d.week.map(w => w.min));
  app.innerHTML = `<div class="hero photo"><div class="avatar">${esc(d.user.name[0].toUpperCase())}</div>
  <div style="flex:1;min-width:210px"><h1 style="margin:0">${esc(d.user.name)}</h1><div>Level ${d.level} · <b>${d.xp} XP</b></div>
  <div class="xpbar"><i style="width:0" data-w="${d.xpInLevel / 2}"></i></div><small>${200 - d.xpInLevel} XP to level ${d.level + 1}</small></div>
  ${d.certified ? '<button id="cert" class="pri" style="background:#fff;color:#14305e">🎓 View certificate</button>' : ""}</div>
  <div class="stats">
   <div class="card stat"><b data-n="${d.percent}" data-s="%">0</b><span class="mute">Course complete</span></div>
   <div class="card stat"><b>${fmt(d.secs)}</b><span class="mute">Time learning</span></div>
   <div class="card stat"><b data-n="${d.avg}" data-s="%">0</b><span class="mute">Avg quiz score</span></div>
   <div class="card stat"><b>${d.streak} 🔥</b><span class="mute">Day streak</span></div></div>
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
   <div class="card"><h2 style="margin-top:0">Last 7 days</h2><div class="chart">${d.week.map(w => `<div title="${w.min} min"><i style="height:0" data-h="${Math.round(w.min / max * 100)}%"></i>${w.day}</div>`).join("")}</div><p class="note">Minutes spent learning</p></div>
   <div class="card"><h2 style="margin-top:0">Course progress (days)</h2>${d.lessons.map(l => { const c = d.courseDays[l.id] || 0; return `<div class="row"><span class="n">${esc(l.t)}</span><div class="bar"><i style="width:0" data-w="${Math.round(c / l.days * 100)}"></i></div><span class="v">${c}/${l.days}</span></div>`; }).join("")}</div></div>
  <h2>Badges</h2><div class="badges">${d.badges.map(b => `<div class="bd ${b.earned ? "" : "off"}"><div class="e">${b.ico}</div><b>${b.t}</b><small>${b.d}</small></div>`).join("")}</div>`;
  if ($("#cert")) $("#cert").onclick = () => go("cert");
  countUp(); requestAnimationFrame(() => { document.querySelectorAll("[data-w]").forEach(e => e.style.width = e.dataset.w + "%"); document.querySelectorAll("[data-h]").forEach(e => e.style.height = e.dataset.h); });
}

async function board() {
  const rows = await api("/leaderboard"), medal = ["🥇", "🥈", "🥉"];
  app.innerHTML = `<img class="banner" src="/img/photos/dash.jpg" alt=""><h1>🏆 Leaderboard</h1><p class="mute">Top learners by XP. Earn XP from lessons and the phishing challenge.</p>
  ${rows.map((r, i) => `<div class="lb ${r.me ? "me" : ""}"><span class="rk">${medal[i] || i + 1}</span><span class="nm">${esc(r.name)}${r.me ? " (you)" : ""}</span><span class="mute">Lv ${r.level}</span><b>${r.xp} XP</b></div>`).join("")}`;
}

async function admin() {
  const d = await api("/admin/overview");
  app.innerHTML = `<h1>Admin overview</h1>
  <div class="stats"><div class="card stat"><b>${d.totalUsers}</b><span class="mute">Registered users</span></div>
  <div class="card stat"><b>${d.avgCompletion}%</b><span class="mute">Average completion</span></div>
  <div class="card stat"><b>${d.completed}</b><span class="mute">Fully completed</span></div></div>
  <div class="card tw"><table><thead><tr><th>Name</th><th>Email</th><th>Done</th><th>Avg score</th><th>XP</th><th>Time</th><th>Streak</th><th>Last login</th></tr></thead><tbody>
  ${d.users.map(u => `<tr><td>${esc(u.name)}${u.role === "admin" ? " ⭐" : ""}</td><td>${esc(u.email)}</td><td>${u.done.length}/${d.total} (${u.percent}%)</td><td>${u.avg}%</td><td>${u.xp}</td><td>${fmt(u.secs)}</td><td>${u.streak}</td><td>${u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "–"}</td></tr>`).join("")}</tbody></table></div>`;
}

async function cert() {
  const c = await api("/certificate"), d = new Date(c.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  app.innerHTML = `<div class="noprint"><button id="pr" class="pri">Print / Save as PDF</button></div>
  <div class="cert"><div class="big">🛡️</div><div class="mute">CyberShield Security Awareness Academy</div><h1>Certificate of Completion</h1><p>This certifies that</p>
  <div class="cname">${esc(c.name)}</div><p>has successfully completed all ${c.lessons.length} security awareness modules:</p>
  <p class="mute">${c.lessons.map(esc).join(" · ")}</p><p><b>${d}</b></p>
  <p class="note">Certificate ID: ${esc(c.id)}<br>Verify at ${esc(location.origin)}/#verify=${esc(c.id)}</p></div>`;
  $("#pr").onclick = () => print();
}
async function verify(id) {
  setNav();
  try { const r = await api("/verify/" + encodeURIComponent(id)); app.innerHTML = `<div class="card" style="max-width:420px;margin:30px auto"><h1>✅ Valid certificate</h1><p><b>${esc(r.name)}</b> completed the CyberShield programme on ${new Date(r.date).toLocaleDateString()}.</p></div>`; }
  catch { app.innerHTML = `<div class="card" style="max-width:420px;margin:30px auto"><h1>❌ Not found</h1><p class="mute">No certificate matches that ID.</p></div>`; }
}

/* ---- interactive lab ---- */
const WORDS = "river lantern maple cargo violet bridge falcon ember orbit harbor cactus meadow comet jungle pepper summit velvet anchor breeze copper dolphin forest glacier island jasmine kettle marble nectar oasis pebble quartz rocket saffron tundra umbrella voyage willow yonder zephyr coffee thunder sunrise banana".split(" ");
const COMMON = ["password", "123456", "qwerty", "letmein", "welcome", "admin", "iloveyou", "cameroon", "yaounde", "douala", "azerty", "football", "abc123", "monkey", "dragon"];
const LINKS = [
  ["https://www.paypal.com/signin", 1, "Real domain, HTTPS, normal path."], ["https://paypa1.com/signin", 0, "'paypa1' uses the digit 1 instead of the letter l."],
  ["https://accounts.google.com.verify-login.xyz/", 0, "The real domain is the part before the first single slash: verify-login.xyz, not google.com."],
  ["https://github.com/settings/security", 1, "Legitimate domain and path."], ["http://mtn-momo-prize.net/claim", 0, "Not HTTPS, not an MTN domain and a 'prize'."],
  ["https://bit.ly/3xFr9Qz", 0, "Shortened links hide the destination. Expand or avoid unknown ones."], ["https://support.microsoft.com/account", 1, "Genuine Microsoft subdomain."],
  ["https://secure-bankofamerica.login-check.com", 0, "The brand name is only a prefix; the real domain is login-check.com."]];
function pwScore(pw) {
  if (!pw) return null;
  let pool = 0; if (/[a-z]/.test(pw)) pool += 26; if (/[A-Z]/.test(pw)) pool += 26; if (/\d/.test(pw)) pool += 10; if (/[^A-Za-z0-9]/.test(pw)) pool += 32;
  let bits = pw.length * Math.log2(pool || 1);
  const low = pw.toLowerCase(), issues = [];
  if (COMMON.some(c => low.includes(c))) { bits = Math.min(bits, 20); issues.push("Contains a very common password or word"); }
  if (/(.)\1{2,}/.test(pw)) { bits *= .7; issues.push("Repeated characters"); }
  if (/(0123|1234|2345|abcd|qwer)/i.test(pw)) { bits *= .6; issues.push("Predictable sequence"); }
  if (pw.length < 12) issues.push("Shorter than 12 characters");
  const secs = Math.pow(2, bits) / 2 / 1e10;  // offline attack, 10 billion guesses/s
  return { bits, secs, issues };
}
function human(s) {
  if (s < 1) return "instantly"; if (s < 60) return Math.round(s) + " seconds"; if (s < 3600) return Math.round(s / 60) + " minutes"; if (s < 86400) return Math.round(s / 3600) + " hours";
  if (s < 31536e3) return Math.round(s / 86400) + " days"; const y = s / 31536e3; return y > 1e9 ? "billions of years" : y > 1e6 ? "millions of years" : y > 1000 ? Math.round(y).toLocaleString() + " years" : Math.round(y) + " years";
}
function pick(n) { const a = new Uint32Array(n); crypto.getRandomValues(a); return [...a].map(x => WORDS[x % WORDS.length]); }

async function lab(tab = "pw") {
  app.innerHTML = `<img class="banner" src="/img/photos/course-pass.jpg" alt=""><h1>🧪 Security Lab</h1><p class="mute">Hands-on tools. Everything on the first two tabs runs in your browser, nothing is sent anywhere.</p>
  <div class="tabs">${[["pw", "🔑 Password Lab"], ["link", "🔗 Link Inspector"], ["story", "🧭 Story Mode"]].map(([k, t]) => `<button data-t="${k}" class="${k === tab ? "on" : ""}">${t}</button>`).join("")}</div><div id="lb"></div>`;
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => lab(b.dataset.t));
  const box = $("#lb");
  if (tab === "pw") {
    box.innerHTML = `<div class="card"><b>Test a password</b> <span class="note">(try one that is similar to yours, not the real one)</span>
    <input type="text" id="pw" placeholder="Type to test..." autocomplete="off"><div class="meter"><i id="mi"></i></div>
    <p id="pr" class="mute">Start typing to see how long an attacker would need.</p><ul id="pl" class="note"></ul>
    <button id="gen" class="pri">🎲 Generate a strong passphrase</button> <button id="cp" hidden>Copy</button></div>`;
    $("#pw").oninput = e => {
      const r = pwScore(e.target.value), m = $("#mi");
      if (!r) { m.style.width = "0"; $("#pr").textContent = "Start typing to see how long an attacker would need."; $("#pl").innerHTML = ""; return; }
      const pct = Math.min(100, Math.round(r.bits / 80 * 100)), col = pct < 35 ? "var(--bad)" : pct < 65 ? "#f59e0b" : "var(--ok)";
      m.style.width = pct + "%"; m.style.background = col;
      $("#pr").innerHTML = `Estimated time to crack: <b style="color:${col}">${human(r.secs)}</b> <span class="note">(~${Math.round(r.bits)} bits)</span>`;
      $("#pl").innerHTML = r.issues.map(i => `<li>⚠️ ${i}</li>`).join("") || "<li>✅ No obvious weaknesses found</li>";
    };
    $("#gen").onclick = () => { const p = pick(4).join("-"); $("#pw").value = p; $("#pw").dispatchEvent(new Event("input")); $("#cp").hidden = false; };
    $("#cp").onclick = async () => { try { await navigator.clipboard.writeText($("#pw").value); toast("Copied!"); } catch { toast("Copy failed, select and copy manually"); } };
  } else if (tab === "link") {
    let order = [...LINKS].sort(() => Math.random() - .5), i = 0, score = 0;
    const show = () => {
      if (i >= order.length) { box.innerHTML = `<div class="card" style="text-align:center"><div style="font-size:3rem">${score >= 7 ? "🏆" : "👍"}</div><h2>${score}/${order.length} correct</h2><button class="pri" id="rs">Play again</button></div>`; if (score >= 7) confetti(); $("#rs").onclick = () => lab("link"); return; }
      const [url] = order[i];
      box.innerHTML = `<div class="card"><p class="note">Link ${i + 1} of ${order.length} · Score ${score}</p><div class="url">${esc(url)}</div>
      <button data-a="1">✅ Looks safe</button> <button data-a="0">🚩 Suspicious</button><p id="fb"></p></div>`;
      box.querySelectorAll("[data-a]").forEach(b => b.onclick = () => {
        const ok = +b.dataset.a === order[i][1]; if (ok) score++;
        box.querySelectorAll("[data-a]").forEach(x => x.disabled = true);
        $("#fb").innerHTML = `${ok ? "✅ Correct!" : "❌ Not quite."} ${esc(order[i][2])}<br><br><button class="pri" id="nx">${i + 1 < order.length ? "Next link →" : "See result"}</button>`;
        $("#nx").onclick = () => { i++; show(); };
      });
    };
    show();
  } else {
    const stories = await api("/stories");
    box.innerHTML = `<div class="grid">${stories.map(s => `<div class="card lc"><div class="ico">${s.ico}</div><b>${esc(s.title)}</b><span class="tag ${s.done ? "done" : ""}">${s.done ? "✓ Completed" : "Up to 40 XP"}</span><button class="pri" data-s="${s.id}">${s.done ? "Replay" : "Play"}</button></div>`).join("")}</div>`;
    box.querySelectorAll("[data-s]").forEach(b => b.onclick = () => play(stories.find(s => s.id === b.dataset.s), box));
  }
}
function play(s, box) {
  let node = s.nodes[s.start], path = [];
  const draw = fb => {
    if (node.end) {
      box.innerHTML = `<div class="card"><div class="story">${fb ? `<p class="tip">${esc(fb)}</p>` : ""}<p>${esc(node.text)}</p></div><p id="rs" class="mute">Saving your result...</p></div>`;
      api("/stories/" + s.id, { path }).then(r => { $("#rs").innerHTML = `Score <b>${r.pts}</b> ${r.gained ? `<span class="tag done">+${r.gained} XP</span>` : "(XP already earned for this story)"} <button id="bk">Back to stories</button>`; $("#bk").onclick = () => lab("story"); if (r.pts >= 15) confetti(); if (r.gained) toast(`🎉 +${r.gained} XP earned!`); }).catch(e => $("#rs").textContent = e.message);
      return;
    }
    box.innerHTML = `<div class="card"><p class="note">${s.ico} ${esc(s.title)} · Step ${path.length + 1}</p><div class="story">${fb ? `<p class="tip">${esc(fb)}</p>` : ""}<p>${esc(node.text)}</p></div>
    ${node.choices.map((c, i) => `<button class="choice" data-c="${i}">${esc(c.t)}</button>`).join("")}</div>`;
    box.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { const c = node.choices[+b.dataset.c]; path.push(+b.dataset.c); node = s.nodes[c.next]; draw(c.fb); });
  };
  draw("");
}

(async () => {
  api("/about").then(a => { $("#foot").innerHTML = `<b>🛡️ CyberShield</b><br>Created and managed by <b>${esc(a.founder.name)}</b> · ${esc(a.founder.title)}<br><span>© ${new Date().getFullYear()} CyberShield. Think before you click.</span>`; }).catch(() => {});
  const h = location.hash;
  if (h.startsWith("#reset=")) { setNav(); return resetView(h.slice(7)); }
  if (h.startsWith("#verify=")) return verify(h.slice(8));
  try { me = await api("/me"); go("home"); } catch { setNav(); authView("login"); }
})();
