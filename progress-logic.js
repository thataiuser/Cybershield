// Pure helpers for the 30-day course pacing (easy to unit-test).
const DAY = 864e5;
function unlockedDay(start, today, unlockAll, total) {
  if (unlockAll) return total;
  if (!start) return 1;
  return Math.max(1, Math.floor((Date.parse(today) - Date.parse(start)) / DAY) + 1);
}
// status: done | open (can be done now) | wait (unlocks later) | locked (finish earlier days first)
function dayStatuses(days, done, unlocked) {
  const set = new Set(done), next = days.find(d => !set.has(d.n));
  return days.map(d => {
    const base = { n: d.n, title: d.title, type: d.type };
    if (set.has(d.n)) return { ...base, status: "done" };
    if (next && d.n === next.n) return d.n <= unlocked ? { ...base, status: "open" } : { ...base, status: "wait", unlocksIn: d.n - unlocked };
    return { ...base, status: "locked" };
  });
}
module.exports = { unlockedDay, dayStatuses };
