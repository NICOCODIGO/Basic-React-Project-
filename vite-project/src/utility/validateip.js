// Strict IPv4 (0–255 per octet)
const IPv4 =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;

// IPv6 (covers full/shortened forms incl. ::)
const IPv6 =
  /^(?:([A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|([A-Fa-f0-9]{1,4}:){1,7}:|([A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}|([A-Fa-f0-9]{1,4}:){1,5}(:[A-Fa-f0-9]{1,4}){1,2}|([A-Fa-f0-9]{1,4}:){1,4}(:[A-Fa-f0-9]{1,4}){1,3}|([A-Fa-f0-9]{1,4}:){1,3}(:[A-Fa-f0-9]{1,4}){1,4}|([A-Fa-f0-9]{1,4}:){1,2}(:[A-Fa-f0-9]{1,4}){1,5}|[A-Fa-f0-9]{1,4}:((:[A-Fa-f0-9]{1,4}){1,6})|:((:[A-Fa-f0-9]{1,4}){1,7}|:))$/;

export function isValidIp(value) { // returns true if value is a valid IPv4 or IPv6 address, and then this can be called in app.jsx
  const v = value.trim();
  if (!v) return false;             // empty is not a valid IP (we’ll handle “use my IP” separately)
  return IPv4.test(v) || IPv6.test(v);
}