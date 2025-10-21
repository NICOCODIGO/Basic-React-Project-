const BASE_URL = "https://api.ipquery.io";

export async function getMyIp() {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error("Failed to get IP");
  return res.text();
}

export async function getIpInfo(ip) {
  const res = await fetch(`${BASE_URL}/${ip}`);
  if (!res.ok) throw new Error("Failed to get IP info");
  return res.json();
}

