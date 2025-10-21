import { useEffect, useState } from "react";
import { getMyIp, getIpInfo } from "./services/ipquery";
import IpCard from "./components/IpCard";
import { isValidIp } from "./utility/validateip";
import "./styles/App.css";

export default function App() {
  const [myIp, setMyIp] = useState("");
  const [query, setQuery] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    getMyIp().then(setMyIp).catch(() => setMyIp("—"));
  }, []);

  function handleChange(e) {
    const v = e.target.value;
    setQuery(v);
    // Live-validate: clear error when input becomes valid or empty
    if (v.trim() === "" || isValidIp(v)) setErr("");
  }

  async function handleSearch(e) {
    e.preventDefault();
    const target = query.trim() || myIp;       // allow blank to use your own IP

    // If the user typed something (not blank) but it's not a valid IP -> show error
    if (query.trim() && !isValidIp(query)) {
      setErr("Invalid input. Enter a valid IPv4 or IPv6 address.");
      setInfo(null);
      return;
    }

    setErr("");
    setLoading(true);
    setInfo(null);
    try {
      const data = await getIpInfo(target);
      setInfo(data);
    } catch (e) {
      setErr("Could not fetch IP info. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>IP Lookup App</h1>
      <p>Your IP: {myIp || "Loading..."}</p>

      <form onSubmit={handleSearch} className="form">
        <input
          value={query}
          onChange={handleChange}
          placeholder="Enter IPv4/IPv6 (or leave blank to use yours)"
        />
        <button disabled={loading}>
          {loading ? "Checking..." : "Search"}
        </button>
      </form>

      {err && <div className="badge bad" style={{ marginTop: 8 }}>{err}</div>}

      <IpCard info={info} />
    </div>
  );
}