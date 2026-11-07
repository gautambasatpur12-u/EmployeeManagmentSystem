export const today = () => new Date().toISOString().slice(0, 10);

export function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}

export function getTime() {
  return new Date().toTimeString().slice(0, 5);
}

export function makeId(prefix) {
  return `${prefix}${Date.now()}`;
}
