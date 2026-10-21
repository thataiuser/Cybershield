# CyberShield – Security Awareness Academy

Node/Express + MongoDB app: email/password accounts, 6 lessons with server-graded quizzes,
a personal progress dashboard per user, and an admin overview.

## Run locally
1. Install Node 18+ and MongoDB (or use a free MongoDB Atlas cluster).
2. `cp .env.example .env` and fill in `JWT_SECRET` (long random string) and `ADMIN_EMAIL`.
3. `npm install && npm start`, then open http://localhost:3000
4. Register with the `ADMIN_EMAIL` address to get the **Admin** tab (all users' progress).

## Deploy
Any Node host works (Render, Railway, a VPS). Set the same env vars, use HTTPS and set `COOKIE_SECURE=true`.

## Add or edit lessons
Edit `lessons.js`. Each lesson: `id, ico, t, d, min, body[[heading, html]], q[[question, options, correctIndex, explanation]]`.

## Password reset and certificates
- **Forgot password:** emails a one-hour, single-use link. Fill in the `SMTP_*` and `APP_URL` values in `.env`
  (Gmail app password, Brevo, Mailgun and similar all work). With `SMTP_HOST` empty, the link is printed in the server console for testing.
- **Certificates:** unlocked when a user passes all lessons. They can print or save it as PDF from the dashboard.
  Each has a unique ID that anyone can check at `/#verify=<ID>`.

## Extras
- **XP, levels and badges:** 100 XP + 10 per correct answer for each newly passed lesson; 200 XP per level.
- **Spot the Phish challenge:** 5 random scam-or-legit messages per round, graded on the server, up to 50 XP a day (edit `games.js`).
- **Leaderboard:** top 10 by XP, with names shortened for privacy.
- **Dashboard:** level bar, 7-day activity chart, badges, per-lesson scores. Light and dark themes.

## Interactive Lab
- **Password Lab:** live strength meter with estimated crack time, plus a passphrase generator. Runs entirely in the browser.
- **Link Inspector:** quick-fire safe-or-suspicious quiz on real-looking URLs (edit the `LINKS` list in `public/app.js`).
- **Story Mode:** branching scenarios in `scenarios.js`. The server replays the player's choices to award XP, once per story.

## Look and content
Lessons are now longer (6 sections and 5 quiz questions each). Illustrations are self-made SVGs in `public/img/` (one per lesson id, plus `hero.svg` and `logo.svg`),
so they work offline and you can replace them with your own images using the same file names.

## 30-day courses and sidebar
- Each of the 6 lessons is now a 30-day course: 24 daily lessons, 4 weekly review quizzes and a final exam on day 30. One new session unlocks per day, in order.
- Learners can run all six courses side by side, so the whole programme takes about a month. Set `UNLOCK_ALL=true` in `.env` to open every day at once for demos.
- XP: 10 per lesson day, 30 per weekly quiz, 100+ for passing the exam. The certificate unlocks when all six final exams are passed.
- Menu options live in a collapsible sidebar (the hamburger button in the header). It remembers whether you collapsed it, and becomes a slide-over menu on phones.
- Course content lives in `lessons.js` (days with `type` of lesson, quiz or exam).

## Photos and design
Your cyber security photos are in `public/img/photos/` and are used on the landing page, the home banner, each course (thumbnail and banner), the dashboard, Challenge, Lab and Leaderboard pages, and an "Explore the essentials" section. The "Types of attacks" infographic is cropped to remove the third-party logos. Make sure you have the right to use every image you publish.

## Verification code and welcome letter
- New members must confirm their email: sign-up sends a 6-digit code (valid 15 minutes, 5 attempts, resend after 45 seconds) together with a thank-you letter signed by **Eta Orock Dobgima, Creator & Manager**. Entering the code activates the account, logs the member in and shows the same letter on a welcome page.
- Members who try to log in before verifying get a fresh code. Password reset also counts as verification. Accounts created before this update are treated as already verified.
- Email needs your SMTP settings (`SMTP_*` in `.env`). With none, the message (including the code) is printed in the server console. For local testing only you can set `SHOW_CODE_IN_RESPONSE=true` to show the code on the verification screen. Never enable it in production.
- Change the signature with `FOUNDER_NAME` and `FOUNDER_TITLE`; the letter text is `LETTER` in `server.js`.
