import { useEffect, useState } from "react";
import { getMyIp, getIpInfo } from "./services/ipquery";
import IpCard from "./components/IpCard";
import "./styles/App.css";

export default function App() {
  const [myIp, setMyIp] = useState("");
  const [query, setQuery] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyIp().then(setMyIp).catch(console.error);
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const ip = query.trim() || myIp;
      const data = await getIpInfo(ip);
      setInfo(data);
    } catch (err) {
      console.error(err);
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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an IP (e.g., 1.1.1.1)"
        />
        <button disabled={loading}>{loading ? "Checking..." : "Search"}</button>
      </form>

      <IpCard info={info} />
    </div>
  );
}
