// Branching stories. Each choice: t=text, next=node id, pts=score (0-10), fb=feedback. Nodes with end:true finish the story.
module.exports = [
{id:"s1",ico:"📞",title:"The urgent bank call",start:"a",nodes:{
 a:{text:"Your phone rings. 'This is your bank's fraud team. Someone is draining your account right now! To stop it, I need the OTP we just sent you.' Your phone does show an SMS with a code.",choices:[
  {t:"Read out the code to save your money",next:"bad",pts:0,fb:"That OTP approves THEIR transaction. Real banks never ask for it."},
  {t:"Ask them to prove who they are, then decide",next:"b",pts:5,fb:"Better, but scammers have answers ready. Don't rely on what the caller says."},
  {t:"Hang up and call the number on your bank card",next:"good",pts:10,fb:"Perfect. You verify through a channel you control."}]},
 b:{text:"The caller reads out your name and the last 4 digits of your card, and gets angry: 'Every second you waste, you lose more money!'",choices:[
  {t:"Give in: they know too much to be fake",next:"bad",pts:0,fb:"Personal details are easy to buy or guess. Pressure is the real warning sign."},
  {t:"Hang up and call your bank yourself",next:"good",pts:10,fb:"Exactly right. Urgency and anger are tactics, not proof."}]},
 bad:{end:true,text:"💸 The scammer approved a transfer with your code. Lesson: never share an OTP, no matter how convincing the caller sounds."},
 good:{end:true,text:"🛡️ The bank confirms there was no fraud alert. You stopped a vishing attempt. Report the number to your bank."}}},
{id:"s2",ico:"🔌",title:"The USB in the car park",start:"a",nodes:{
 a:{text:"Walking into the office you spot a USB stick on the ground labelled 'Salary 2026'. Curiosity is strong.",choices:[
  {t:"Plug it into your work laptop to see what's on it",next:"bad",pts:0,fb:"This is classic baiting. A malicious USB can install malware instantly."},
  {t:"Plug it into your personal computer instead",next:"bad",pts:0,fb:"Still risky: malware doesn't care whose computer it is."},
  {t:"Hand it to the IT/security team without plugging it in",next:"b",pts:10,fb:"The safe move."}]},
 b:{text:"IT thanks you. Later a colleague jokes, 'Just give it to me, I'll check it.' Another says, 'Reception will find the owner.'",choices:[
  {t:"Tell them IT is already handling it, and why",next:"good",pts:10,fb:"You protected your colleagues too."},
  {t:"Hand it over anyway to avoid awkwardness",next:"good2",pts:3,fb:"Sharing a risky device spreads the risk. Speak up politely next time."}]},
 bad:{end:true,text:"🦠 The stick launched ransomware. Files are locked and the whole team is affected. Never plug in unknown devices."},
 good:{end:true,text:"🏆 IT analysed the stick in an isolated machine and found a keylogger. You helped prevent an attack."},
 good2:{end:true,text:"😬 Nothing happened this time, but an unchecked stick circulated in the office. Next time, explain the risk."}}}
];
