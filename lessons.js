module.exports = [
 {
  "id": "phish",
  "ico": "🎣",
  "t": "Spotting Phishing",
  "d": "Fake emails, SMS and links that steal your data.",
  "days": [
   {
    "n": 1,
    "title": "What is phishing?",
    "type": "lesson",
    "html": "<p>Phishing is a message that pretends to come from a bank, mobile-money service, employer or friend to trick you into clicking a link, opening a file or giving up a password, PIN or code. It can arrive by email, SMS, WhatsApp, social media or even a phone call (&quot;vishing&quot;).</p>"
   },
   {
    "n": 2,
    "title": "Many flavours of phishing",
    "type": "lesson",
    "html": "<ul><li><b>Spear phishing</b>: tailored to you, using your name, role or recent activity.</li><li><b>Smishing</b>: by SMS or WhatsApp, often with a short link.</li><li><b>Vishing</b>: phone calls from a fake bank or \"support\" team.</li><li><b>Whaling</b>: aimed at executives and finance staff.</li><li><b>Clone phishing</b>: a genuine email copied, with the link swapped for a malicious one.</li></ul>"
   },
   {
    "n": 3,
    "title": "Red flags",
    "type": "lesson",
    "html": "<ul><li><b>Urgency or fear</b>: \"Your account will be blocked in 24 hours!\"</li><li><b>Sender mismatch</b>: the display name says your bank but the address is <i>support@bank-secure-login.xyz</i>.</li><li><b>Suspicious links</b>: hover (or long-press) to see the real address before clicking.</li><li><b>Unexpected attachments</b>, or requests for PINs, OTP codes and passwords.</li><li><b>Too good to be true</b>: prizes, lottery wins, easy jobs.</li></ul>"
   },
   {
    "n": 4,
    "title": "A realistic example",
    "type": "lesson",
    "html": "<p>Imagine an email titled &lt;i&gt;Action required: payroll update&lt;/i&gt; from &lt;i&gt;payroll@yourcompany-hr.com&lt;/i&gt;. It looks like HR, uses your name and links to a login page. But the domain isn&#x27;t your company&#x27;s, the page asks for your full credentials, and the deadline is &quot;today&quot;. Each detail alone seems minor; together they are a textbook attack.</p>"
   },
   {
    "n": 5,
    "title": "Mistakes people commonly make",
    "type": "lesson",
    "html": "<ul><li>Trusting the display name instead of the actual address.</li><li>Believing a logo proves authenticity (logos are easy to copy).</li><li>Clicking \"unsubscribe\" on suspicious mail.</li><li>Replying to ask \"is this real?\", which confirms your address is active.</li><li>Assuming \"it won't happen to me\". Attackers target everyone.</li></ul>"
   },
   {
    "n": 6,
    "title": "What to do",
    "type": "lesson",
    "html": "<div class='tip'>Stop. Don't click. Contact the organisation using a number or website you already trust, report the message to your IT/security team, then delete it. Real organisations never ask for your password or OTP.</div>"
   },
   {
    "n": 7,
    "title": "Week 1 review quiz",
    "type": "quiz",
    "q": [
     [
      "Phishing aimed at one specific person is called",
      [
       "Spear phishing",
       "Smishing",
       "Cloning"
      ],
      0,
      "Spear phishing is tailored to an individual."
     ],
     [
      "A common warning sign is",
      [
       "A calm friendly tone",
       "A deadline with a threat",
       "A company logo"
      ],
      1,
      "Urgency and threats push you to act without thinking."
     ],
     [
      "Replying \"is this real?\" to a scam email can",
      [
       "Prove it is safe",
       "Confirm your address is active",
       "Block the sender"
      ],
      1,
      "It tells attackers your address works."
     ]
    ]
   },
   {
    "n": 8,
    "title": "Anatomy of a phishing email",
    "type": "lesson",
    "html": "<p>Every phishing email has a hook, a story and an ask. The hook grabs attention (a delivery, a bill, a prize), the story builds urgency, and the ask is a click, a login or a payment. Spot those three parts and the trick falls apart.</p>"
   },
   {
    "n": 9,
    "title": "Reading email headers",
    "type": "lesson",
    "html": "<p>Open &quot;show original&quot; or &quot;view headers&quot; and look at From, Reply-To and Return-Path. If the Reply-To differs from the sender, or SPF and DKIM show &quot;fail&quot;, treat the message as suspect. Today, find the headers option in your email app.</p>"
   },
   {
    "n": 10,
    "title": "Safe link checking",
    "type": "lesson",
    "html": "<p>Never judge a link by its text. Hover to preview it, or long-press on a phone. For doubtful links, paste the address into a URL scanner such as VirusTotal instead of clicking, or type the real website yourself.</p>"
   },
   {
    "n": 11,
    "title": "Attachments that attack",
    "type": "lesson",
    "html": "<p>Invoices, voice notes and &quot;scanned documents&quot; are common disguises. Be wary of .exe, .js, .scr, macro-enabled Office files and zip archives. If you did not expect the file, confirm with the sender by another channel first.</p>"
   },
   {
    "n": 12,
    "title": "QR code phishing",
    "type": "lesson",
    "html": "<p>Scammers paste fake QR codes on parking meters, posters and emails. A QR code hides its destination, so check the web address your phone shows before opening it, and never enter payment details on a page you reached from an unknown code.</p>"
   },
   {
    "n": 13,
    "title": "Phishing on social media",
    "type": "lesson",
    "html": "<p>Fake giveaways, &quot;is this you in this video?&quot; messages and hijacked friend accounts spread links fast. If a friend sends something odd, ask them directly through a different channel before clicking.</p>"
   },
   {
    "n": 14,
    "title": "Week 2 review quiz",
    "type": "quiz",
    "q": [
     [
      "Which part of a phishing email is the \"ask\"?",
      [
       "The logo",
       "The request to click, log in or pay",
       "The subject spelling"
      ],
      1,
      "The ask is what the attacker wants you to do."
     ],
     [
      "If Reply-To differs from the sender address you should",
      [
       "Trust it",
       "Treat the email as suspect",
       "Reply quickly"
      ],
      1,
      "Mismatches are a classic spoofing sign."
     ],
     [
      "A QR code on a poster leads to a payment page. You should",
      [
       "Pay at once",
       "Check the address and prefer official apps",
       "Share it"
      ],
      1,
      "QR codes hide destinations, so verify first."
     ]
    ]
   },
   {
    "n": 15,
    "title": "Mobile money and SMS scams",
    "type": "lesson",
    "html": "<p>Fraudsters text that a transfer was &quot;sent by mistake&quot; or that your account is blocked. They want your PIN or a reversal. Check your balance through the official app or USSD code, and never share your PIN or OTP.</p>"
   },
   {
    "n": 16,
    "title": "Voice phishing calls",
    "type": "lesson",
    "html": "<p>Callers pretend to be a bank, telecom or government agent and rush you. Hang up, then call the official number on your card or the operator&#x27;s website. A genuine organisation will always let you call back.</p>"
   },
   {
    "n": 17,
    "title": "Business email compromise",
    "type": "lesson",
    "html": "<p>Attackers imitate a manager or supplier to change bank details or demand an urgent payment. Always confirm payment changes with a phone call to a number you already trust, and follow a two-person approval rule.</p>"
   },
   {
    "n": 18,
    "title": "Fake login pages",
    "type": "lesson",
    "html": "<p>A cloned login page looks perfect but sits on the wrong domain. Reach important sites through bookmarks or the official app, and let your password manager fill credentials: it will not offer them on a fake site.</p>"
   },
   {
    "n": 19,
    "title": "Brand impersonation and fake support",
    "type": "lesson",
    "html": "<p>Scammers buy ads and create social accounts posing as support teams. Real support will not message you first or ask for passwords. Use the contact page linked from the company&#x27;s own website.</p>"
   },
   {
    "n": 20,
    "title": "When you have already clicked",
    "type": "lesson",
    "html": "<p>Do not panic. Disconnect from the network if you downloaded a file, change the password you entered (and anywhere it was reused), enable MFA, and tell your IT team or bank quickly. Fast reporting limits the damage.</p>"
   },
   {
    "n": 21,
    "title": "Week 3 review quiz",
    "type": "quiz",
    "q": [
     [
      "A caller claiming to be your bank pushes you to act. Best step",
      [
       "Give the OTP",
       "Hang up and call the number on your card",
       "Ask for their name only"
      ],
      1,
      "Call back through a number you trust."
     ],
     [
      "A \"supplier\" asks you to change payment details. You",
      [
       "Reply with the new details",
       "Verify by phone on a known number",
       "Pay half"
      ],
      1,
      "Business email compromise relies on unverified requests."
     ],
     [
      "Your password manager does not offer to fill a login. This suggests",
      [
       "A bug",
       "The site may be fake",
       "Your vault is empty"
      ],
      1,
      "Managers match the real domain."
     ]
    ]
   },
   {
    "n": 22,
    "title": "Reporting phishing",
    "type": "lesson",
    "html": "<p>Reporting helps block the next victim. Use your email&#x27;s report-phishing button, forward scams to your IT team, and report SMS scams to your operator. Then delete the message.</p>"
   },
   {
    "n": 23,
    "title": "Building a verification habit",
    "type": "lesson",
    "html": "<p>Create a simple routine: pause, look at the sender, check the link, and confirm through a second channel. Ten seconds of checking is cheaper than recovering a hacked account.</p>"
   },
   {
    "n": 24,
    "title": "Protecting family and elders",
    "type": "lesson",
    "html": "<p>Older relatives are often targeted with emotional stories and prize scams. Agree a family code word for emergencies, set up scam-call blocking, and make it normal to ask before sending money.</p>"
   },
   {
    "n": 25,
    "title": "Phishing simulations at work",
    "type": "lesson",
    "html": "<p>Many organisations send fake phishing emails to train staff. If you click one, treat it as a free lesson, not a failure. Read the feedback and report the next one you see.</p>"
   },
   {
    "n": 26,
    "title": "AI-written scams",
    "type": "lesson",
    "html": "<p>AI removes the spelling mistakes that used to give scams away, and can clone voices. Judge the request, not the polish: unexpected urgency, secrecy and unusual payment methods are still the red flags.</p>"
   },
   {
    "n": 27,
    "title": "Data that fuels scams",
    "type": "lesson",
    "html": "<p>Public details such as your job title, travel plans and family names make phishing believable. Tighten your social profile privacy and think before posting tickets, badges or ID photos.</p>"
   },
   {
    "n": 28,
    "title": "Week 4 review quiz",
    "type": "quiz",
    "q": [
     [
      "After entering a password on a phishing page you should first",
      [
       "Ignore it",
       "Change the password and tell IT or your bank",
       "Delete your account"
      ],
      1,
      "Fast action limits damage."
     ],
     [
      "AI-written scams are best spotted by",
      [
       "Spelling mistakes only",
       "The unusual request and urgency",
       "The sender's name"
      ],
      1,
      "Judge the request, not the polish."
     ],
     [
      "A family code word helps against",
      [
       "Slow Wi-Fi",
       "Emergency impersonation scams",
       "Weak passwords"
      ],
      1,
      "It lets relatives verify a real emergency."
     ]
    ]
   },
   {
    "n": 29,
    "title": "Your personal anti-phishing plan",
    "type": "lesson",
    "html": "<p>Write down your three rules, for example: never click links in urgent messages, verify money requests by phone, report suspicious mail. Share them with someone close and revisit them monthly.</p>"
   },
   {
    "n": 30,
    "title": "Final exam",
    "type": "exam",
    "q": [
     [
      "Which is the strongest sign of a phishing email?",
      [
       "A greeting with your name",
       "Urgent threat plus a link to a look-alike domain",
       "A company logo",
       "An email sent on a Monday"
      ],
      1,
      "Urgency combined with a mismatched link is the classic phishing pattern."
     ],
     [
      "A text says you won a prize and must send your mobile-money PIN to claim it. You should…",
      [
       "Send it quickly",
       "Reply asking for details",
       "Ignore and report it",
       "Forward it to friends"
      ],
      2,
      "Nobody legitimate ever needs your PIN."
     ],
     [
      "Before clicking a link in an email you should…",
      [
       "Check the real destination by hovering over it",
       "Click and see what happens",
       "Open it on a friend's phone",
       "Reply to the sender"
      ],
      0,
      "Hovering reveals the true URL."
     ],
     [
      "What is \"smishing\"?",
      [
       "Phishing by SMS or messaging apps",
       "A virus that damages phones",
       "Password guessing",
       "A fake website banner"
      ],
      0,
      "Smishing combines SMS and phishing."
     ],
     [
      "You're unsure whether an email from your bank is real. The best approach is to…",
      [
       "Reply and ask",
       "Open the bank's official app or website yourself",
       "Click the link, it's probably fine",
       "Forward it to colleagues"
      ],
      1,
      "Go to the source yourself, never through the message."
     ]
    ]
   }
  ]
 },
 {
  "id": "pass",
  "ico": "🔑",
  "t": "Strong Passwords",
  "d": "Build passwords that resist guessing and cracking.",
  "days": [
   {
    "n": 1,
    "title": "Length beats complexity",
    "type": "lesson",
    "html": "<p>A long passphrase such as &lt;i&gt;purple-mango-river-lantern&lt;/i&gt; is far harder to crack than &lt;i&gt;P@ssw0rd1&lt;/i&gt;. Aim for 14+ characters made of random words.</p>"
   },
   {
    "n": 2,
    "title": "How attackers crack passwords",
    "type": "lesson",
    "html": "<ul><li><b>Brute force</b>: trying every combination, very fast against short passwords.</li><li><b>Dictionary attacks</b>: common words and tweaks such as P@ssw0rd.</li><li><b>Credential stuffing</b>: leaked passwords tried on other sites.</li><li><b>Phishing and keyloggers</b>: tricking or spying to get the password directly.</li></ul>"
   },
   {
    "n": 3,
    "title": "Rules to live by",
    "type": "lesson",
    "html": "<ul><li>Use a <b>different password for every account</b>. One breach should not unlock everything.</li><li>Never use names, birthdays, phone numbers or keyboard patterns (123456, qwerty).</li><li>Use a <b>password manager</b> to generate and store passwords.</li><li>Never share passwords, even with colleagues or \"IT support\" who call you.</li></ul>"
   },
   {
    "n": 4,
    "title": "Using a password manager",
    "type": "lesson",
    "html": "<p>A manager creates a unique password for every site and fills it in for you. You remember one strong master passphrase; the manager remembers everything else. Choose a reputable one, protect it with multi-factor authentication and keep a recovery option somewhere safe.</p>"
   },
   {
    "n": 5,
    "title": "Myths and facts",
    "type": "lesson",
    "html": "<ul><li><b>Myth:</b> changing passwords every month keeps you safe. <b>Fact:</b> change them when there's a reason, such as a breach. Length and uniqueness matter more.</li><li><b>Myth:</b> adding a ! makes a password strong. <b>Fact:</b> predictable tweaks are the first thing attackers try.</li></ul>"
   },
   {
    "n": 6,
    "title": "If you suspect a breach",
    "type": "lesson",
    "html": "<div class='warn'>Change the password immediately, change it anywhere else you reused it, and turn on multi-factor authentication.</div>"
   },
   {
    "n": 7,
    "title": "Week 1 review quiz",
    "type": "quiz",
    "q": [
     [
      "Which attack tries leaked passwords on other sites?",
      [
       "Credential stuffing",
       "Tailgating",
       "Spoofing"
      ],
      0,
      "Reused passwords make it work."
     ],
     [
      "Which password is strongest?",
      [
       "Summer2026!",
       "violet-anchor-pepper-cobalt",
       "P@ssw0rd"
      ],
      1,
      "Long random words win."
     ],
     [
      "A good use of a password manager is",
      [
       "One unique password per account",
       "Sharing the master password",
       "Using one password everywhere"
      ],
      0,
      "Unique passwords limit damage."
     ]
    ]
   },
   {
    "n": 8,
    "title": "Passphrase techniques",
    "type": "lesson",
    "html": "<p>Pick four or five unrelated words, add a separator, and avoid famous phrases or song lines. Example: bicycle-orange-tunnel-quiet. Length does the work, and random words are easy for you to picture but hard to guess.</p>"
   },
   {
    "n": 9,
    "title": "Checking for breaches",
    "type": "lesson",
    "html": "<p>Sites such as Have I Been Pwned tell you if your email appeared in a data leak. If it did, change that password and every place you reused it. Check your main email address today.</p>"
   },
   {
    "n": 10,
    "title": "Setting up a password manager",
    "type": "lesson",
    "html": "<p>Choose a well-reviewed manager, create a strong master passphrase, and import your saved passwords. Then replace weak and reused ones, starting with email, banking and work accounts.</p>"
   },
   {
    "n": 11,
    "title": "Master password and recovery",
    "type": "lesson",
    "html": "<p>Your master passphrase is the one you must remember. Never reuse it, add MFA to the vault, and store the recovery kit offline in a safe place, not in your email.</p>"
   },
   {
    "n": 12,
    "title": "Passkeys explained",
    "type": "lesson",
    "html": "<p>A passkey replaces the password with a cryptographic key stored on your device and unlocked by your fingerprint, face or PIN. There is nothing to phish or reuse, so turn passkeys on wherever offered.</p>"
   },
   {
    "n": 13,
    "title": "Secure your email first",
    "type": "lesson",
    "html": "<p>Your email can reset almost every other account. Give it your strongest unique password and MFA before anything else, and review recovery addresses and forwarding rules.</p>"
   },
   {
    "n": 14,
    "title": "Week 2 review quiz",
    "type": "quiz",
    "q": [
     [
      "Why check if your email was in a breach?",
      [
       "To find reused passwords to change",
       "To get a refund",
       "To speed up login"
      ],
      0,
      "Breached passwords must be changed."
     ],
     [
      "The recovery kit for your vault should be stored",
      [
       "In your email inbox",
       "Offline in a safe place",
       "On social media"
      ],
      1,
      "Keep it away from online attackers."
     ],
     [
      "A passkey is protected by",
      [
       "A shared secret on a server",
       "A key on your device unlocked by biometrics or PIN",
       "A security question"
      ],
      1,
      "There is nothing to phish."
     ]
    ]
   },
   {
    "n": 15,
    "title": "Security questions are weak",
    "type": "lesson",
    "html": "<p>Mother&#x27;s maiden name and first school are easy to research. Treat answers as extra passwords: invent random answers and store them in your password manager.</p>"
   },
   {
    "n": 16,
    "title": "Shared and family accounts",
    "type": "lesson",
    "html": "<p>Streaming and bank accounts shared with others often use weak passwords. Use your manager&#x27;s secure sharing feature, give each person their own profile, and change shared passwords when someone leaves.</p>"
   },
   {
    "n": 17,
    "title": "Router and Wi-Fi passwords",
    "type": "lesson",
    "html": "<p>Change the default admin password on your router and use WPA2 or WPA3 with a long Wi-Fi passphrase. Default credentials are published online and attackers try them first.</p>"
   },
   {
    "n": 18,
    "title": "Phone and app lock codes",
    "type": "lesson",
    "html": "<p>A six-digit PIN beats four digits, and a random one beats a birthday. Add biometrics for convenience, and set a PIN on your SIM to help against SIM swap attacks.</p>"
   },
   {
    "n": 19,
    "title": "Work passwords and policy",
    "type": "lesson",
    "html": "<p>Follow your organisation&#x27;s rules, never share credentials in chat, and use single sign-on where available. Never use your work password on personal sites.</p>"
   },
   {
    "n": 20,
    "title": "Password hygiene audit",
    "type": "lesson",
    "html": "<p>Spend 20 minutes reviewing your vault&#x27;s security report. Fix reused, weak and breached passwords, and delete accounts you no longer use. Fewer accounts means fewer targets.</p>"
   },
   {
    "n": 21,
    "title": "Week 3 review quiz",
    "type": "quiz",
    "q": [
     [
      "Security question answers should be",
      [
       "True and easy to remember",
       "Random answers stored in your manager",
       "Left blank"
      ],
      1,
      "True answers are easy to research."
     ],
     [
      "The default router admin password should be",
      [
       "Kept as it is",
       "Changed to a unique one",
       "Printed on the router"
      ],
      1,
      "Default credentials are widely published."
     ],
     [
      "For a shared streaming account you should",
      [
       "Email the password to everyone",
       "Use secure sharing and change it when someone leaves",
       "Use 123456"
      ],
      1,
      "Shared access needs control."
     ]
    ]
   },
   {
    "n": 22,
    "title": "Handling breach notices",
    "type": "lesson",
    "html": "<p>If a company reports a breach, change your password immediately, enable MFA, and watch for phishing that mentions the breach. Scammers also fake breach emails, so go to the site directly.</p>"
   },
   {
    "n": 23,
    "title": "Developers: no hardcoded secrets",
    "type": "lesson",
    "html": "<p>Keep passwords and API keys out of source code. Use environment variables or a secrets manager, add .env to .gitignore, and rotate any key that was ever committed.</p>"
   },
   {
    "n": 24,
    "title": "Biometrics: pros and cons",
    "type": "lesson",
    "html": "<p>Fingerprints and faces are convenient and hard to guess, but cannot be changed if leaked. Use them to unlock a device, backed by a strong PIN or passphrase.</p>"
   },
   {
    "n": 25,
    "title": "Teaching others",
    "type": "lesson",
    "html": "<p>Help a friend or relative set up a password manager this week. People adopt good habits when someone patient shows them, and it protects you too.</p>"
   },
   {
    "n": 26,
    "title": "The passwordless future",
    "type": "lesson",
    "html": "<p>Passkeys and hardware keys are replacing passwords. Until every site supports them, keep unique passwords, MFA and a manager as your safety net.</p>"
   },
   {
    "n": 27,
    "title": "Common attacks recap",
    "type": "lesson",
    "html": "<p>Brute force, dictionary lists, credential stuffing and phishing all struggle against long unique passwords with MFA. Review how each attack works and how your habits stop it.</p>"
   },
   {
    "n": 28,
    "title": "Week 4 review quiz",
    "type": "quiz",
    "q": [
     [
      "If a company reports a breach you should",
      [
       "Wait a month",
       "Change the password and enable MFA",
       "Ignore it"
      ],
      1,
      "Act quickly and go to the site directly."
     ],
     [
      "API keys in source code should be",
      [
       "Committed for convenience",
       "Stored in environment variables or a vault",
       "Written in comments"
      ],
      1,
      "Secrets in code leak with the repo."
     ],
     [
      "Biometrics are best used to",
      [
       "Replace all passwords",
       "Unlock a device backed by a strong PIN",
       "Share between family"
      ],
      1,
      "They cannot be changed if leaked."
     ]
    ]
   },
   {
    "n": 29,
    "title": "Your password action plan",
    "type": "lesson",
    "html": "<p>Commit to three actions: install a manager, enable MFA on email and banking, and fix your five riskiest passwords. Put a reminder in your calendar for a quarterly audit.</p>"
   },
   {
    "n": 30,
    "title": "Final exam",
    "type": "exam",
    "q": [
     [
      "Which password is strongest?",
      [
       "Law2024!",
       "qwerty123",
       "maple-cargo-violet-bridge-47",
       "MyDogName"
      ],
      2,
      "Long and random wins."
     ],
     [
      "Reusing one password across sites is risky because…",
      [
       "It is easy to remember",
       "One breach exposes all your accounts",
       "Sites forbid it",
       "It slows login"
      ],
      1,
      "Attackers try leaked passwords on other sites (credential stuffing)."
     ],
     [
      "A password manager helps you…",
      [
       "Share passwords with friends",
       "Generate and store unique passwords",
       "Avoid updates",
       "Skip logging out"
      ],
      1,
      "It removes the need to remember many unique passwords."
     ],
     [
      "Credential stuffing is…",
      [
       "Trying leaked passwords on other websites",
       "Building a long passphrase",
       "Encrypting a password manager",
       "Updating software"
      ],
      0,
      "Reused passwords are what make it work."
     ],
     [
      "Which is a good use of a password manager?",
      [
       "Writing the master password on a sticky note",
       "One unique password per account",
       "The same password everywhere for simplicity",
       "Sharing the vault with friends"
      ],
      1,
      "Unique passwords limit the damage of any single breach."
     ]
    ]
   }
  ]
 },
 {
  "id": "mfa",
  "ico": "📲",
  "t": "Multi-Factor Authentication",
  "d": "Add a second lock to every important account.",
  "days": [
   {
    "n": 1,
    "title": "Why MFA?",
    "type": "lesson",
    "html": "<p>Even if a thief steals your password, they still need a second proof: something you &lt;b&gt;have&lt;/b&gt; (phone, security key) or &lt;b&gt;are&lt;/b&gt; (fingerprint). MFA blocks the vast majority of automated account takeovers.</p>"
   },
   {
    "n": 2,
    "title": "How it works in practice",
    "type": "lesson",
    "html": "<p>After entering your password you&#x27;re asked for a second proof: a 6-digit code from an app that changes every 30 seconds, a tap on a prompt, or a touch of a security key. An attacker who only has your password gets stuck at this step.</p>"
   },
   {
    "n": 3,
    "title": "Best to weakest",
    "type": "lesson",
    "html": "<ul><li><b>Security keys / passkeys</b>: strongest and phishing-resistant.</li><li><b>Authenticator apps</b>: strong and free.</li><li><b>SMS codes</b>: better than nothing, but can be intercepted or SIM-swapped.</li></ul>"
   },
   {
    "n": 4,
    "title": "Setting it up",
    "type": "lesson",
    "html": "<ol><li>Open the security settings of your email, bank and social accounts.</li><li>Choose \"two-step verification\" or \"MFA\".</li><li>Pick an authenticator app or security key rather than SMS where possible.</li><li>Save the recovery codes somewhere safe and offline.</li></ol><div class='tip'>Start with your email: it can reset all your other accounts.</div>"
   },
   {
    "n": 5,
    "title": "MFA fatigue and other tricks",
    "type": "lesson",
    "html": "<p>Attackers who already have your password may flood you with approval prompts, hoping you&#x27;ll tap &quot;Approve&quot; just to make them stop. Others trick you into reading out codes. Treat every unexpected prompt as a sign your password is compromised: deny it and change your password.</p>"
   },
   {
    "n": 6,
    "title": "Stay alert",
    "type": "lesson",
    "html": "<div class='tip'>Never read out an OTP to anyone who calls you. If you receive an MFA prompt you did not trigger, deny it and change your password: someone has your password.</div>"
   },
   {
    "n": 7,
    "title": "Week 1 review quiz",
    "type": "quiz",
    "q": [
     [
      "MFA protects you even if",
      [
       "Your password is stolen",
       "Your phone is lost",
       "You share the code"
      ],
      0,
      "The attacker still needs the second factor."
     ],
     [
      "Which is generally the strongest method?",
      [
       "SMS code",
       "Passkey or security key",
       "Security question"
      ],
      1,
      "They resist phishing."
     ],
     [
      "Why save recovery codes?",
      [
       "To regain access if you lose your phone",
       "To share with friends",
       "To skip MFA"
      ],
      0,
      "They are your backup way in."
     ]
    ]
   },
   {
    "n": 8,
    "title": "Authenticator apps compared",
    "type": "lesson",
    "html": "<p>Apps such as Google Authenticator, Microsoft Authenticator and Authy generate codes that change every 30 seconds and work offline. Choose one that supports encrypted backup so a lost phone does not lock you out.</p>"
   },
   {
    "n": 9,
    "title": "Hardware security keys",
    "type": "lesson",
    "html": "<p>A key such as a YubiKey proves you are present by touch and cannot be tricked by a fake website. Buy two: one for daily use and one stored safely as a spare.</p>"
   },
   {
    "n": 10,
    "title": "SMS risks and SIM swapping",
    "type": "lesson",
    "html": "<p>In a SIM swap, a criminal convinces your operator to move your number to their SIM and receives your codes. Add a PIN to your SIM account and prefer app-based codes for important accounts.</p>"
   },
   {
    "n": 11,
    "title": "Backup codes and recovery",
    "type": "lesson",
    "html": "<p>When you enable MFA you receive one-time recovery codes. Print them or store them offline in a safe place. Without them, losing your phone can mean losing the account.</p>"
   },
   {
    "n": 12,
    "title": "MFA on email and social",
    "type": "lesson",
    "html": "<p>Turn on MFA for your email first, then social media. Open the security page, choose two-step verification, add an authenticator app, and test by logging in from a private window.</p>"
   },
   {
    "n": 13,
    "title": "MFA on banking and mobile money",
    "type": "lesson",
    "html": "<p>Use your bank&#x27;s official app and any extra PIN or biometric lock offered. Never approve a transaction prompt you did not start, and never read a code to someone on the phone.</p>"
   },
   {
    "n": 14,
    "title": "Week 2 review quiz",
    "type": "quiz",
    "q": [
     [
      "An authenticator app is better than SMS because",
      [
       "It cannot be SIM-swapped",
       "It is slower",
       "It needs no setup"
      ],
      0,
      "App codes stay on your device."
     ],
     [
      "Why buy two hardware keys?",
      [
       "One is a safe spare",
       "They are cheaper in pairs",
       "Keys expire"
      ],
      0,
      "A spare avoids lockout."
     ],
     [
      "In a SIM swap, criminals",
      [
       "Move your number to their SIM",
       "Delete your email",
       "Clone your face"
      ],
      0,
      "They then receive your SMS codes."
     ]
    ]
   },
   {
    "n": 15,
    "title": "Push fatigue attacks",
    "type": "lesson",
    "html": "<p>Attackers with a stolen password send repeated approval prompts hoping you tap Approve. If you did not log in, deny every prompt, change your password and report it.</p>"
   },
   {
    "n": 16,
    "title": "Risk-based MFA",
    "type": "lesson",
    "html": "<p>Some services only ask for a second step when something looks unusual, such as a new country or device. It is convenient, but treat every unexpected challenge as a warning sign.</p>"
   },
   {
    "n": 17,
    "title": "Passkeys and phishing resistance",
    "type": "lesson",
    "html": "<p>Passkeys are tied to the real website address, so a fake site cannot use them. Where available, choose passkeys over codes for your most important accounts.</p>"
   },
   {
    "n": 18,
    "title": "MFA for admins and developers",
    "type": "lesson",
    "html": "<p>Privileged accounts, code hosts and cloud consoles are prime targets. Require hardware keys or app-based MFA, avoid SMS, and review who has admin rights regularly.</p>"
   },
   {
    "n": 19,
    "title": "Lost phone playbook",
    "type": "lesson",
    "html": "<p>Use another device to sign in with a recovery code, move MFA to your new phone, and remove the old device from each account. Report a stolen phone to your operator to block the SIM.</p>"
   },
   {
    "n": 20,
    "title": "MFA while travelling",
    "type": "lesson",
    "html": "<p>Roaming can break SMS codes. Before a trip, make sure your authenticator app works offline, carry backup codes securely, and avoid approving prompts on unfamiliar shared computers.</p>"
   },
   {
    "n": 21,
    "title": "Week 3 review quiz",
    "type": "quiz",
    "q": [
     [
      "An approval prompt you did not trigger means",
      [
       "Deny it and change your password",
       "Approve it to stop it",
       "Ignore it"
      ],
      0,
      "Someone likely has your password."
     ],
     [
      "Passkeys resist phishing because",
      [
       "They are bound to the real website",
       "They are longer",
       "They are security questions"
      ],
      0,
      "Fake sites cannot use them."
     ],
     [
      "After losing a phone you should",
      [
       "Sign in with recovery codes and remove the old device",
       "Create new accounts",
       "Wait a week"
      ],
      0,
      "Move MFA and revoke the old device."
     ]
    ]
   },
   {
    "n": 22,
    "title": "Rolling out MFA at work",
    "type": "lesson",
    "html": "<p>Start with email and remote access, explain why it matters, and offer a simple setup guide and support. People accept MFA when it is introduced clearly and helps them.</p>"
   },
   {
    "n": 23,
    "title": "How MFA gets bypassed",
    "type": "lesson",
    "html": "<p>Attackers use phishing kits that relay your code in real time, SIM swaps and prompt fatigue. Phishing-resistant methods such as passkeys and security keys defeat most of these tricks.</p>"
   },
   {
    "n": 24,
    "title": "Family accounts and MFA",
    "type": "lesson",
    "html": "<p>Help relatives enable MFA on email, messaging apps and banking. Choose methods they can manage, and keep recovery codes for shared accounts in a safe place.</p>"
   },
   {
    "n": 25,
    "title": "Auditing your MFA coverage",
    "type": "lesson",
    "html": "<p>List your important accounts and check each security page. Mark which have MFA, what type, and where recovery codes are stored. Close the gaps this week.</p>"
   },
   {
    "n": 26,
    "title": "Legacy apps without MFA",
    "type": "lesson",
    "html": "<p>Some old systems cannot use MFA. Limit who can reach them, use network restrictions, strong unique passwords and monitoring, and plan to replace them.</p>"
   },
   {
    "n": 27,
    "title": "Emerging authentication",
    "type": "lesson",
    "html": "<p>Passkeys, device-bound credentials and continuous authentication are growing. The principle stays the same: more than one independent proof of identity.</p>"
   },
   {
    "n": 28,
    "title": "Week 4 review quiz",
    "type": "quiz",
    "q": [
     [
      "Which MFA bypass relies on tiring you out?",
      [
       "Prompt bombing",
       "Tailgating",
       "Logo spoofing"
      ],
      0,
      "Repeated prompts aim to make you approve."
     ],
     [
      "Phishing-resistant MFA includes",
      [
       "Security keys and passkeys",
       "SMS codes",
       "Email links"
      ],
      0,
      "They check the real site."
     ],
     [
      "A good rollout begins with",
      [
       "Email and remote access",
       "Rarely used apps",
       "Guest Wi-Fi"
      ],
      0,
      "Protect critical entry points first."
     ]
    ]
   },
   {
    "n": 29,
    "title": "Your MFA rollout plan",
    "type": "lesson",
    "html": "<p>Pick your five most important accounts, enable the strongest MFA each supports, store recovery codes safely and set a quarterly reminder to review. Share the plan with your family or team.</p>"
   },
   {
    "n": 30,
    "title": "Final exam",
    "type": "exam",
    "q": [
     [
      "MFA protects you even when…",
      [
       "Your phone is off",
       "Your password is stolen",
       "You use the same password everywhere",
       "You click phishing links and enter codes"
      ],
      1,
      "The attacker still lacks the second factor."
     ],
     [
      "Which method is generally strongest?",
      [
       "SMS code",
       "Security question",
       "Passkey or security key",
       "Email code"
      ],
      2,
      "Hardware keys and passkeys resist phishing."
     ],
     [
      "You get an MFA prompt you never requested. You should…",
      [
       "Approve it",
       "Deny it and change your password",
       "Ignore it",
       "Share it with IT by SMS"
      ],
      1,
      "An unexpected prompt means your password is probably compromised."
     ],
     [
      "Which account deserves MFA first?",
      [
       "Your main email",
       "A forgotten forum",
       "A game demo",
       "An old shopping site"
      ],
      0,
      "Email can reset your other accounts."
     ],
     [
      "Why save your recovery codes?",
      [
       "To regain access if you lose your phone",
       "To share with IT",
       "To skip MFA",
       "To speed up login"
      ],
      0,
      "Without them, a lost phone can lock you out."
     ]
    ]
   }
  ]
 },
 {
  "id": "social",
  "ico": "🎭",
  "t": "Social Engineering",
  "d": "How attackers manipulate people instead of machines.",
  "days": [
   {
    "n": 1,
    "title": "Hacking humans",
    "type": "lesson",
    "html": "<p>Social engineers exploit trust, helpfulness and fear. Common tricks: &lt;b&gt;pretexting&lt;/b&gt; (a fake story, e.g. &quot;I&#x27;m from the telecom helpdesk&quot;), &lt;b&gt;baiting&lt;/b&gt; (a free USB stick left in the car park), &lt;b&gt;tailgating&lt;/b&gt; (following you through a secure door) and &lt;b&gt;impersonation&lt;/b&gt; of managers requesting urgent payments.</p>"
   },
   {
    "n": 2,
    "title": "Why it works",
    "type": "lesson",
    "html": "<p>People want to be helpful, respect authority and avoid trouble. Attackers exploit exactly that: they sound confident, create urgency and make a request seem routine. Technical defences can&#x27;t help if a person hands over the keys.</p>"
   },
   {
    "n": 3,
    "title": "Defences",
    "type": "lesson",
    "html": "<ul><li>Verify identity through a second channel before acting on unusual requests.</li><li>Be wary of pressure, secrecy and urgency.</li><li>Never plug in unknown USB drives.</li><li>Don't hold doors for strangers without badges.</li><li>Follow payment-approval procedures every time, even for the boss.</li></ul>"
   },
   {
    "n": 4,
    "title": "Anatomy of an attack",
    "type": "lesson",
    "html": "<ol><li><b>Research</b>: LinkedIn, social media and company websites reveal names and roles.</li><li><b>Contact</b>: a call, email or visit using that information.</li><li><b>Pressure</b>: urgency, authority or a small favour.</li><li><b>Extraction</b>: a password, a payment or physical access.</li></ol>"
   },
   {
    "n": 5,
    "title": "Protecting yourself and your team",
    "type": "lesson",
    "html": "<ul><li>Share less personal and work detail publicly.</li><li>Agree a call-back procedure for payment or access requests.</li><li>It's perfectly fine to say, \"Let me verify and get back to you.\" Good colleagues respect that.</li><li>Report attempts, even failed ones. They warn others.</li></ul>"
   },
   {
    "n": 6,
    "title": "Mobile-money and call scams",
    "type": "lesson",
    "html": "<div class='warn'>Scammers call pretending to be an operator, claiming you sent money by mistake or must \"verify\" your account. Hang up and call the official line yourself.</div>"
   },
   {
    "n": 7,
    "title": "Week 1 review quiz",
    "type": "quiz",
    "q": [
     [
      "Which is an example of tailgating?",
      [
       "Following someone through a secured door",
       "Guessing a password",
       "Sending a phishing email"
      ],
      0,
      "You enter without your own badge."
     ],
     [
      "A caller rushes you for a password. You",
      [
       "Comply",
       "Slow down and verify",
       "Share half"
      ],
      1,
      "Pressure is a tactic."
     ],
     [
      "Baiting often uses",
      [
       "A free USB stick",
       "A long password",
       "A VPN"
      ],
      0,
      "Curiosity gets people to plug it in."
     ]
    ]
   },
   {
    "n": 8,
    "title": "The psychology of persuasion",
    "type": "lesson",
    "html": "<p>Attackers use authority, urgency, scarcity, reciprocity and social proof. When a message makes you feel rushed, flattered or afraid, pause: strong emotion is the signal that persuasion is at work.</p>"
   },
   {
    "n": 9,
    "title": "Pretexting in depth",
    "type": "lesson",
    "html": "<p>Pretexting is an invented scenario, such as a new IT technician or a supplier chasing payment. The story sounds plausible because it is built from facts the attacker researched. Verify identity before sharing anything.</p>"
   },
   {
    "n": 10,
    "title": "Phone-based attacks",
    "type": "lesson",
    "html": "<p>Callers can fake the number displayed. Never rely on caller ID, never give codes or passwords by phone, and call back using a number you found yourself.</p>"
   },
   {
    "n": 11,
    "title": "Physical security and tailgating",
    "type": "lesson",
    "html": "<p>A smiling stranger carrying boxes follows you through a secure door. Politely ask them to badge in or direct them to reception. Real visitors will understand.</p>"
   },
   {
    "n": 12,
    "title": "Shoulder surfing and bins",
    "type": "lesson",
    "html": "<p>Passwords can be read over your shoulder and documents recovered from bins. Use a privacy screen in public, shred sensitive papers and lock your screen when you step away.</p>"
   },
   {
    "n": 13,
    "title": "Insider threats",
    "type": "lesson",
    "html": "<p>Insiders may be careless, pressured or malicious. Use least privilege, log access to sensitive data, and encourage a culture where people report problems without fear.</p>"
   },
   {
    "n": 14,
    "title": "Week 2 review quiz",
    "type": "quiz",
    "q": [
     [
      "Caller ID can be",
      [
       "Trusted fully",
       "Faked",
       "Always blocked"
      ],
      1,
      "Numbers can be spoofed."
     ],
     [
      "Shoulder surfing is",
      [
       "Watching someone enter secrets",
       "A water sport",
       "A network scan"
      ],
      0,
      "Use privacy screens in public."
     ],
     [
      "A good defence against insider risk is",
      [
       "Least privilege",
       "Admin rights for everyone",
       "No logging"
      ],
      0,
      "Limit access to what is needed."
     ]
    ]
   },
   {
    "n": 15,
    "title": "OSINT: what attackers learn",
    "type": "lesson",
    "html": "<p>Open-source intelligence means collecting public details about you from social media, job sites and company pages. Search for your own name and see what an attacker would see.</p>"
   },
   {
    "n": 16,
    "title": "Locking down social media",
    "type": "lesson",
    "html": "<p>Set profiles to private, limit who can see friends and photos, remove phone numbers and birthdays, and think twice before accepting unknown friend requests.</p>"
   },
   {
    "n": 17,
    "title": "Romance and investment scams",
    "type": "lesson",
    "html": "<p>Scammers build trust over weeks, then ask for money or push a &quot;guaranteed&quot; investment. Never send money to someone you have not met, and be wary of anyone steering you to crypto platforms.</p>"
   },
   {
    "n": 18,
    "title": "Job scams",
    "type": "lesson",
    "html": "<p>Fake recruiters ask for fees, ID copies or bank details before an interview. Real employers do not charge you to apply. Verify the company and the recruiter&#x27;s email domain.</p>"
   },
   {
    "n": 19,
    "title": "Fake charities and emergencies",
    "type": "lesson",
    "html": "<p>After disasters, fake appeals spread. Give through established organisations, check registration, and be suspicious of pressure to pay by gift card or mobile money.</p>"
   },
   {
    "n": 20,
    "title": "Executive impersonation",
    "type": "lesson",
    "html": "<p>An email or call from the boss asks for an urgent favour and secrecy. Always verify through a second channel and follow your payment-approval procedure.</p>"
   },
   {
    "n": 21,
    "title": "Week 3 review quiz",
    "type": "quiz",
    "q": [
     [
      "OSINT means",
      [
       "Collecting public information about a target",
       "A firewall setting",
       "A virus type"
      ],
      0,
      "Attackers research you using public sources."
     ],
     [
      "A job offer asks you to pay a fee. This is",
      [
       "Normal",
       "A likely scam",
       "A tax"
      ],
      1,
      "Real employers do not charge applicants."
     ],
     [
      "A romance contact asks for money. You",
      [
       "Send it",
       "Stop and tell someone you trust",
       "Send half"
      ],
      1,
      "Never send money to someone you have not met."
     ]
    ]
   },
   {
    "n": 22,
    "title": "Verification procedures",
    "type": "lesson",
    "html": "<p>Agree call-back numbers, approval steps for payments and a challenge question for sensitive requests. A procedure removes the awkwardness of doubting someone senior.</p>"
   },
   {
    "n": 23,
    "title": "Saying no politely",
    "type": "lesson",
    "html": "<p>Phrases such as &quot;I will verify and call you back&quot; are professional and firm. Genuine callers accept them, while scammers often push harder, which tells you what you need to know.</p>"
   },
   {
    "n": 24,
    "title": "Reporting incidents",
    "type": "lesson",
    "html": "<p>Report suspicious contacts to your security team or provider quickly, even if you refused. Your report can protect colleagues who are targeted next.</p>"
   },
   {
    "n": 25,
    "title": "Building a security culture",
    "type": "lesson",
    "html": "<p>Share near misses without blame, celebrate good reports and keep guidance short and practical. Culture beats policy because people copy what their peers do.</p>"
   },
   {
    "n": 26,
    "title": "Deepfakes and voice cloning",
    "type": "lesson",
    "html": "<p>Criminals can clone a voice from a few seconds of audio. For urgent money or access requests, use a pre-agreed code word or call back on a known number.</p>"
   },
   {
    "n": 27,
    "title": "Scam recovery steps",
    "type": "lesson",
    "html": "<p>If you were tricked, stop contact, tell your bank or operator, change passwords, collect evidence and report to the authorities. Do not feel ashamed: skilled criminals fool smart people.</p>"
   },
   {
    "n": 28,
    "title": "Week 4 review quiz",
    "type": "quiz",
    "q": [
     [
      "A call-back procedure helps because",
      [
       "It verifies identity independently",
       "It is faster",
       "It saves data"
      ],
      0,
      "It avoids trusting the caller's claim."
     ],
     [
      "Voice cloning scams are best countered by",
      [
       "A pre-agreed code word",
       "A longer call",
       "Ignoring all calls"
      ],
      0,
      "It confirms the real person."
     ],
     [
      "After being scammed you should",
      [
       "Hide it",
       "Tell your bank and report it",
       "Pay more"
      ],
      1,
      "Quick reporting limits losses."
     ]
    ]
   },
   {
    "n": 29,
    "title": "Your defence plan",
    "type": "lesson",
    "html": "<p>Write three rules: verify before acting, never share codes, report every attempt. Review your social media privacy and share the rules with your team or family.</p>"
   },
   {
    "n": 30,
    "title": "Final exam",
    "type": "exam",
    "q": [
     [
      "An unknown caller says they are from IT and need your password. You…",
      [
       "Give it, they sound official",
       "Refuse and report it",
       "Give half",
       "Ask them to email it"
      ],
      1,
      "IT never needs your password."
     ],
     [
      "You find a USB stick in the car park. You should…",
      [
       "Plug it in to find the owner",
       "Hand it to the security team",
       "Take it home",
       "Format it on your laptop"
      ],
      1,
      "Baiting relies on curiosity."
     ],
     [
      "A message from your \"CEO\" asks for an urgent transfer and secrecy. First step?",
      [
       "Pay quickly",
       "Verify through a separate trusted channel",
       "Ask a colleague to pay",
       "Reply with the account details"
      ],
      1,
      "Secrecy plus urgency is a red flag. Verify out of band."
     ],
     [
      "Which is an example of tailgating?",
      [
       "Following someone through a secured door",
       "Guessing a password",
       "Sending a phishing email",
       "Using a VPN"
      ],
      0,
      "Entering without your own badge by following an authorised person."
     ],
     [
      "A caller pressures you to act immediately. The best response is to…",
      [
       "Comply to be helpful",
       "Slow down and verify independently",
       "Share the request on social media",
       "Give a partial answer"
      ],
      1,
      "Pressure is a tactic. Verify first and report it."
     ]
    ]
   }
  ]
 },
 {
  "id": "browse",
  "ico": "🌐",
  "t": "Safe Browsing & Wi‑Fi",
  "d": "Stay safe online, at home and on public networks.",
  "days": [
   {
    "n": 1,
    "title": "Check before you trust",
    "type": "lesson",
    "html": "<p>Look for &lt;b&gt;HTTPS&lt;/b&gt; and read the domain carefully: &lt;i&gt;paypa1.com&lt;/i&gt; is not &lt;i&gt;paypal.com&lt;/i&gt;. A padlock only means the connection is encrypted, not that the site is honest.</p>"
   },
   {
    "n": 2,
    "title": "Reading a web address",
    "type": "lesson",
    "html": "<p>Read the domain just before the first single slash. In &lt;i&gt;login.bank.example.com/secure&lt;/i&gt; the real site is &lt;b&gt;example.com&lt;/b&gt;. Attackers hide behind long subdomains and look-alike spellings, so slow down at the part before the first &quot;/&quot;.</p>"
   },
   {
    "n": 3,
    "title": "Public Wi‑Fi",
    "type": "lesson",
    "html": "<ul><li>Avoid banking or sensitive logins on open Wi‑Fi.</li><li>Use a trusted VPN or your mobile data instead.</li><li>Turn off automatic connection to open networks.</li><li>Confirm the real network name with staff: attackers create look-alike hotspots.</li></ul>"
   },
   {
    "n": 4,
    "title": "Cookies, pop-ups and permissions",
    "type": "lesson",
    "html": "<p>Decline unnecessary cookies and notifications. Be wary of pop-ups claiming your device is infected; they are scams. Review which apps and websites can access your camera, microphone and location, and remove what you no longer use.</p>"
   },
   {
    "n": 5,
    "title": "A safe-browsing checklist",
    "type": "lesson",
    "html": "<ul><li>Keep your browser updated.</li><li>Type known addresses or use bookmarks for banking.</li><li>Log out of shared computers.</li><li>Use a separate browser profile for work.</li><li>Be sceptical of any site asking for unexpected personal data.</li></ul>"
   },
   {
    "n": 6,
    "title": "Downloads and extensions",
    "type": "lesson",
    "html": "<div class='tip'>Install apps only from official stores or vendor sites, and keep browser extensions to a minimum. Free cracked software is a top malware source.</div>"
   },
   {
    "n": 7,
    "title": "Week 1 review quiz",
    "type": "quiz",
    "q": [
     [
      "The padlock in the address bar means",
      [
       "The site is trustworthy",
       "The connection is encrypted",
       "The site is virus-free"
      ],
      1,
      "It does not prove honesty."
     ],
     [
      "The real domain in login.bank.example-secure.com is",
      [
       "example-secure.com",
       "bank",
       "login"
      ],
      0,
      "Read just before the first slash."
     ],
     [
      "A pop-up says you have viruses. You",
      [
       "Close it",
       "Call the number",
       "Enter details"
      ],
      0,
      "It is scareware."
     ]
    ]
   },
   {
    "n": 8,
    "title": "How HTTPS works",
    "type": "lesson",
    "html": "<p>HTTPS encrypts data between your browser and the website so others on the network cannot read it. It protects the journey, not the honesty of the site, so scam sites can use it too.</p>"
   },
   {
    "n": 9,
    "title": "Certificates and warnings",
    "type": "lesson",
    "html": "<p>A browser warning means the site&#x27;s certificate is expired, mismatched or untrusted. Do not click through to log in or pay. Close the page and reach the site another way.</p>"
   },
   {
    "n": 10,
    "title": "Browser privacy settings",
    "type": "lesson",
    "html": "<p>Block third-party cookies, turn off ad personalisation, review site permissions and keep your browser updated. A quick 10-minute review removes a lot of tracking.</p>"
   },
   {
    "n": 11,
    "title": "Extensions and permissions",
    "type": "lesson",
    "html": "<p>Extensions can read what you browse. Install only a few from trusted publishers, check the permissions they request and remove any you no longer use.</p>"
   },
   {
    "n": 12,
    "title": "Safe downloads",
    "type": "lesson",
    "html": "<p>Download software only from the official site or store. Check the address, avoid cracked programs and &quot;download manager&quot; offers, and scan files before opening them.</p>"
   },
   {
    "n": 13,
    "title": "Search result traps",
    "type": "lesson",
    "html": "<p>Scammers buy ads that mimic real brands and rank above them. For banks and government services, use your bookmark or type the address instead of clicking an advert.</p>"
   },
   {
    "n": 14,
    "title": "Week 2 review quiz",
    "type": "quiz",
    "q": [
     [
      "A certificate warning means",
      [
       "Proceed anyway",
       "Stop and find another way to the site",
       "The site is faster"
      ],
      1,
      "The identity check failed."
     ],
     [
      "Cracked software is risky because",
      [
       "It often hides malware",
       "It is too slow",
       "It is encrypted"
      ],
      0,
      "It is a top infection route."
     ],
     [
      "An advert above search results is",
      [
       "Always safe",
       "Possibly a scam copy of the brand",
       "From your bank"
      ],
      1,
      "Use bookmarks instead."
     ]
    ]
   },
   {
    "n": 15,
    "title": "Public Wi-Fi in detail",
    "type": "lesson",
    "html": "<p>On open networks attackers can set up look-alike hotspots or watch unencrypted traffic. Use mobile data for sensitive tasks, turn off auto-join, and forget networks after you leave.</p>"
   },
   {
    "n": 16,
    "title": "VPNs: what they do",
    "type": "lesson",
    "html": "<p>A VPN encrypts traffic between you and the VPN provider and hides your IP address from sites. It does not stop phishing or malware, and you must trust the provider. Pick a reputable one.</p>"
   },
   {
    "n": 17,
    "title": "Home router security",
    "type": "lesson",
    "html": "<p>Update router firmware, change default passwords, use WPA2 or WPA3, disable WPS and set up a guest network for visitors and smart devices.</p>"
   },
   {
    "n": 18,
    "title": "DNS and safer resolvers",
    "type": "lesson",
    "html": "<p>DNS translates names to addresses. Resolvers such as Quad9 or Cloudflare can block known malicious sites. Changing your DNS setting is a simple extra layer.</p>"
   },
   {
    "n": 19,
    "title": "Online shopping safety",
    "type": "lesson",
    "html": "<p>Use well-known shops, check reviews, pay by card or a protected method, and be wary of prices that are too good to be true. Never pay by direct transfer to a stranger.</p>"
   },
   {
    "n": 20,
    "title": "Mobile banking apps",
    "type": "lesson",
    "html": "<p>Install your bank&#x27;s app only from the official store, keep the phone updated, use app lock, and avoid banking apps on a rooted phone or over open Wi-Fi.</p>"
   },
   {
    "n": 21,
    "title": "Week 3 review quiz",
    "type": "quiz",
    "q": [
     [
      "For sensitive tasks on the move, prefer",
      [
       "Mobile data",
       "Open Wi-Fi",
       "Any hotspot"
      ],
      0,
      "Avoid untrusted networks."
     ],
     [
      "A VPN does not protect you from",
      [
       "Phishing",
       "Snooping on public Wi-Fi",
       "IP tracking by sites"
      ],
      0,
      "It does not stop scams."
     ],
     [
      "Router default passwords should be",
      [
       "Kept",
       "Changed",
       "Shared"
      ],
      1,
      "Defaults are published online."
     ]
    ]
   },
   {
    "n": 22,
    "title": "Kids and safe browsing",
    "type": "lesson",
    "html": "<p>Use child profiles, content filters and shared rules. Talk openly about strangers, oversharing and what to do if something upsets them, so they come to you first.</p>"
   },
   {
    "n": 23,
    "title": "Cookies and trackers",
    "type": "lesson",
    "html": "<p>Cookies remember you, and tracking cookies follow you across sites. Accept only what is necessary, clear cookies occasionally and use tracker blocking.</p>"
   },
   {
    "n": 24,
    "title": "Private browsing myths",
    "type": "lesson",
    "html": "<p>Private mode only stops your browser saving history on that device. Your employer, network and websites can still see your activity.</p>"
   },
   {
    "n": 25,
    "title": "Social media privacy",
    "type": "lesson",
    "html": "<p>Review who can see posts, tag you and find you by phone number. Remove old posts you would not want a stranger to read.</p>"
   },
   {
    "n": 26,
    "title": "Cloud storage sharing",
    "type": "lesson",
    "html": "<p>Share files with specific people, not anyone with the link, set expiry dates and review shared links regularly. Never store passwords in a plain document.</p>"
   },
   {
    "n": 27,
    "title": "Digital footprint cleanup",
    "type": "lesson",
    "html": "<p>Search for yourself, delete old accounts, request removal from data brokers and tidy app permissions. A smaller footprint gives attackers less to work with.</p>"
   },
   {
    "n": 28,
    "title": "Week 4 review quiz",
    "type": "quiz",
    "q": [
     [
      "Private browsing hides your activity from",
      [
       "Only that device's history",
       "Your employer's network",
       "Websites"
      ],
      0,
      "Others may still see it."
     ],
     [
      "Shared cloud links should have",
      [
       "Anyone-with-link access forever",
       "Specific people and an expiry",
       "No limits"
      ],
      1,
      "Limit who can open files."
     ],
     [
      "A smaller digital footprint means",
      [
       "Less for attackers to use",
       "More ads",
       "Slower internet"
      ],
      0,
      "Less public data."
     ]
    ]
   },
   {
    "n": 29,
    "title": "Your safe-browsing plan",
    "type": "lesson",
    "html": "<p>Choose three habits: bookmarks for banking, updates turned on, and mobile data for sensitive tasks on the move. Review the plan monthly.</p>"
   },
   {
    "n": 30,
    "title": "Final exam",
    "type": "exam",
    "q": [
     [
      "The padlock in the address bar means…",
      [
       "The site is trustworthy",
       "The connection is encrypted",
       "The site has no malware",
       "The owner is verified"
      ],
      1,
      "Encrypted does not equal safe; scam sites can use HTTPS too."
     ],
     [
      "The safest way to bank while travelling is…",
      [
       "Free café Wi‑Fi",
       "Your mobile data or a trusted VPN",
       "Any open hotspot",
       "A friend's laptop"
      ],
      1,
      "Avoid untrusted networks for sensitive activity."
     ],
     [
      "Which domain looks legitimate for PayPal?",
      [
       "paypa1.com",
       "paypal-secure.net",
       "paypal.com",
       "pay-pal.co"
      ],
      2,
      "Always compare the domain carefully for look-alike characters."
     ],
     [
      "In login.mybank.example-secure.com, the real domain is…",
      [
       "mybank",
       "example-secure.com",
       "login",
       "mybank.example"
      ],
      1,
      "The registered domain sits just before the first slash: example-secure.com."
     ],
     [
      "A pop-up says your phone has 5 viruses. You should…",
      [
       "Tap it to scan",
       "Close it, it's a scam",
       "Enter your details",
       "Call the number shown"
      ],
      1,
      "Scareware tries to get you to install malware or pay."
     ]
    ]
   }
  ]
 },
 {
  "id": "mal",
  "ico": "🦠",
  "t": "Malware, Updates & Backups",
  "d": "Ransomware, viruses and how to keep devices healthy.",
  "days": [
   {
    "n": 1,
    "title": "Types of malware",
    "type": "lesson",
    "html": "<b>Viruses and worms</b> spread; <b>trojans</b> hide inside useful-looking apps; <b>spyware</b> steals data; <b>ransomware</b> locks your files and demands payment."
   },
   {
    "n": 2,
    "title": "How malware gets in",
    "type": "lesson",
    "html": "<ul><li>Malicious email attachments and links</li><li>Cracked software and fake apps</li><li>Infected USB drives</li><li>Unpatched software flaws</li><li>Compromised websites (drive-by downloads)</li></ul>"
   },
   {
    "n": 3,
    "title": "Your protection routine",
    "type": "lesson",
    "html": "<ul><li><b>Update</b> your OS and apps promptly: updates fix known holes attackers exploit.</li><li>Use reputable antivirus and keep it on.</li><li><b>Back up</b> important files using the 3-2-1 rule: 3 copies, 2 media types, 1 offline or off-site.</li><li>Lock your screen and encrypt laptops and phones.</li></ul>"
   },
   {
    "n": 4,
    "title": "Warning signs of infection",
    "type": "lesson",
    "html": "<p>A slow device, unexpected pop-ups, programs you didn&#x27;t install, a battery that drains fast, files that won&#x27;t open or have been renamed, and antivirus that switches itself off are all signs worth taking seriously.</p>"
   },
   {
    "n": 5,
    "title": "Backups that actually work",
    "type": "lesson",
    "html": "<p>A backup you&#x27;ve never tested is a hope, not a plan. Once a month, restore a file to confirm it works. Keep one copy disconnected from your computer so ransomware can&#x27;t encrypt it too, and encrypt backups that hold sensitive data.</p>"
   },
   {
    "n": 6,
    "title": "If infected",
    "type": "lesson",
    "html": "<div class='warn'>Disconnect from the network, don't pay the ransom, and tell your security team straight away. Restore from a clean backup.</div>"
   },
   {
    "n": 7,
    "title": "Week 1 review quiz",
    "type": "quiz",
    "q": [
     [
      "Ransomware",
      [
       "Locks files and demands payment",
       "Speeds up PCs",
       "Only affects phones"
      ],
      0,
      "It encrypts data for extortion."
     ],
     [
      "Updates are important because",
      [
       "They patch known flaws",
       "They are optional",
       "They delete backups"
      ],
      0,
      "Attackers use known flaws."
     ],
     [
      "The 3-2-1 backup rule means",
      [
       "3 copies, 2 media, 1 off-site",
       "3 drives, 2 users, 1 admin",
       "3 days, 2 weeks, 1 month"
      ],
      0,
      "It protects against loss and ransomware."
     ]
    ]
   },
   {
    "n": 8,
    "title": "Types of malware",
    "type": "lesson",
    "html": "<p>Viruses attach to files, worms spread on their own, trojans pose as useful software, spyware watches you and ransomware locks your data. Knowing the types helps you recognise the symptoms.</p>"
   },
   {
    "n": 9,
    "title": "Ransomware lifecycle",
    "type": "lesson",
    "html": "<p>Ransomware arrives by phishing or an unpatched flaw, spreads across the network, steals then encrypts data, and demands payment. Offline backups and fast patching break the chain.</p>"
   },
   {
    "n": 10,
    "title": "Trojans and fake apps",
    "type": "lesson",
    "html": "<p>Fake apps copy popular names and ask for broad permissions. Install only from official stores, check the publisher and reviews, and deny permissions an app does not need.</p>"
   },
   {
    "n": 11,
    "title": "Spyware and stalkerware",
    "type": "lesson",
    "html": "<p>Spyware secretly records messages, location or keystrokes. Warning signs include fast battery drain and unknown apps. Review installed apps, update the OS and seek help if you feel monitored.</p>"
   },
   {
    "n": 12,
    "title": "Fileless and script attacks",
    "type": "lesson",
    "html": "<p>Some malware lives in memory or uses built-in tools like PowerShell, leaving few files to scan. Keep systems patched, block unneeded macros and use security software that watches behaviour.</p>"
   },
   {
    "n": 13,
    "title": "Malvertising and drive-by downloads",
    "type": "lesson",
    "html": "<p>Malicious adverts can infect a device just by loading. Keep the browser updated, use an ad blocker from a trusted publisher, and avoid dubious streaming and download sites.</p>"
   },
   {
    "n": 14,
    "title": "Week 2 review quiz",
    "type": "quiz",
    "q": [
     [
      "Trojans usually",
      [
       "Pose as useful software",
       "Spread alone",
       "Only encrypt files"
      ],
      0,
      "They hide inside apps."
     ],
     [
      "A sign of spyware may be",
      [
       "Fast battery drain and unknown apps",
       "Faster Wi-Fi",
       "A new wallpaper"
      ],
      0,
      "Review installed apps."
     ],
     [
      "Malvertising can infect you",
      [
       "Just by loading an ad",
       "Only if you buy",
       "Never"
      ],
      0,
      "Keep the browser updated."
     ]
    ]
   },
   {
    "n": 15,
    "title": "Patch management basics",
    "type": "lesson",
    "html": "<p>Turn on automatic updates for the OS, browser and apps. Restart when asked, and retire software that no longer receives updates, because old flaws are easy targets.</p>"
   },
   {
    "n": 16,
    "title": "Antivirus and EDR",
    "type": "lesson",
    "html": "<p>Antivirus catches known threats, and endpoint detection and response watches for suspicious behaviour. Keep protection on and updated, and never ignore its warnings.</p>"
   },
   {
    "n": 17,
    "title": "Backups in practice",
    "type": "lesson",
    "html": "<p>Follow 3-2-1: three copies, two media types, one off-site or offline. Automate it, encrypt it, and restore a test file monthly to prove it works.</p>"
   },
   {
    "n": 18,
    "title": "USB and removable media",
    "type": "lesson",
    "html": "<p>Do not plug in unknown drives, and disable auto-run. Scan drives from others and use cloud sharing or encrypted drives for sensitive files.</p>"
   },
   {
    "n": 19,
    "title": "Mobile device security",
    "type": "lesson",
    "html": "<p>Set a screen lock, update the OS, install apps only from official stores, and enable find-my-device. Avoid rooting or jailbreaking because it removes protections.</p>"
   },
   {
    "n": 20,
    "title": "Cleaning an infected device",
    "type": "lesson",
    "html": "<p>Disconnect from the network, run a full scan, remove unknown apps, change passwords from a clean device and restore from backup if needed. When unsure, ask IT or a professional.</p>"
   },
   {
    "n": 21,
    "title": "Week 3 review quiz",
    "type": "quiz",
    "q": [
     [
      "Automatic updates should be",
      [
       "On",
       "Off",
       "Delayed forever"
      ],
      0,
      "They close known holes."
     ],
     [
      "A backup should be tested by",
      [
       "Restoring a file monthly",
       "Never",
       "Deleting it"
      ],
      0,
      "Untested backups may fail."
     ],
     [
      "An unknown USB drive should",
      [
       "Be plugged in to see",
       "Go to IT",
       "Be taken home"
      ],
      1,
      "It may carry malware."
     ]
    ]
   },
   {
    "n": 22,
    "title": "Incident response basics",
    "type": "lesson",
    "html": "<p>Detect, contain, eradicate, recover and learn. Know who to call, isolate affected devices quickly and keep notes of what happened so you can improve next time.</p>"
   },
   {
    "n": 23,
    "title": "Software supply chain risks",
    "type": "lesson",
    "html": "<p>Attackers hide malware in libraries and updates you trust. Pin versions, review dependencies, use scanners and download only from official repositories.</p>"
   },
   {
    "n": 24,
    "title": "Encrypting devices",
    "type": "lesson",
    "html": "<p>Full-disk encryption protects your data if a laptop or phone is lost or stolen. Turn on BitLocker, FileVault or the phone&#x27;s built-in encryption and keep recovery keys safe.</p>"
   },
   {
    "n": 25,
    "title": "Safe software sources",
    "type": "lesson",
    "html": "<p>Use the vendor&#x27;s website or official stores, verify checksums for important downloads and avoid pirated or modified installers that often include malware.</p>"
   },
   {
    "n": 26,
    "title": "Botnets and IoT",
    "type": "lesson",
    "html": "<p>Cheap smart devices with default passwords get recruited into botnets. Change default credentials, update firmware and put smart devices on a separate network.</p>"
   },
   {
    "n": 27,
    "title": "Recovering from ransomware",
    "type": "lesson",
    "html": "<p>Do not pay if you can avoid it, because payment does not guarantee recovery. Isolate machines, report to the authorities, restore from clean backups and fix the entry point.</p>"
   },
   {
    "n": 28,
    "title": "Week 4 review quiz",
    "type": "quiz",
    "q": [
     [
      "First step after infection",
      [
       "Disconnect from the network",
       "Share files",
       "Pay quickly"
      ],
      0,
      "Containment limits the spread."
     ],
     [
      "Full-disk encryption protects data when",
      [
       "A device is lost or stolen",
       "Wi-Fi is slow",
       "You forget a password"
      ],
      0,
      "Data stays unreadable."
     ],
     [
      "Smart devices should be",
      [
       "Kept on default passwords",
       "On a separate network with changed passwords",
       "Connected to everything"
      ],
      1,
      "Limit botnet risk."
     ]
    ]
   },
   {
    "n": 29,
    "title": "Your device security plan",
    "type": "lesson",
    "html": "<p>Set up automatic updates, a tested backup, device encryption and a screen lock. Write the steps down and review them every quarter.</p>"
   },
   {
    "n": 30,
    "title": "Final exam",
    "type": "exam",
    "q": [
     [
      "Ransomware…",
      [
       "Speeds up your PC",
       "Locks files and demands payment",
       "Only affects phones",
       "Is harmless"
      ],
      1,
      "It encrypts your data for extortion."
     ],
     [
      "Why install updates quickly?",
      [
       "For new colours",
       "They patch known security holes",
       "They erase backups",
       "They are optional"
      ],
      1,
      "Attackers exploit unpatched flaws."
     ],
     [
      "The 3-2-1 backup rule means…",
      [
       "3 passwords, 2 devices, 1 cloud",
       "3 copies, 2 media types, 1 off-site",
       "3 drives, 2 users, 1 admin",
       "3 days, 2 weeks, 1 month"
      ],
      1,
      "It guards against loss, failure and ransomware."
     ],
     [
      "Which is a common way malware spreads?",
      [
       "Cracked software and email attachments",
       "Updating your OS",
       "Using a screen lock",
       "Backing up files"
      ],
      0,
      "Pirated software and attachments are top infection routes."
     ],
     [
      "Why keep one backup offline?",
      [
       "Ransomware can't reach it",
       "It's cheaper",
       "It's faster",
       "It looks tidy"
      ],
      0,
      "An offline copy survives an attack on connected devices."
     ]
    ]
   }
  ]
 }
];
