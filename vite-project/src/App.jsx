// remember that app.jsx is the main component that gets rendered, 
// all files will meet here
//and this is what will be shown on the screen 

import { useEffect, useState } from "react"; //calling useEffect and useState from react, useState is store/updates data, useEffect is side effects, fetches IP as soon as the user opens the app
import { getMyIp, getIpInfo } from "./services/ipquery"; //calling the services folder
import IpCard from "./components/IpCard"; //calling IpCard component to display the IP information
import { isValidIp } from "./utility/validateip"; 
import "./styles/App.css"; 

export default function App() {
  const [myIp, setMyIp] = useState(""); // stores the user's IP address
  const [query, setQuery] = useState(""); // stores the user's input
  const [info, setInfo] = useState(null); // stores the IP information
  const [loading, setLoading] = useState(false); // stores the loading state (check if its true or false)
  const [err, setErr] = useState(""); // stores the error message (input validation or fetch errors)

  useEffect(() => { //fetch user's IP when the app opens and loads
    getMyIp().then(setMyIp).catch(() => setMyIp("—")); //if fetching IP fails, set to "—"
  }, []); //

  function handleChange(e) {
    const v = e.target.value;
    setQuery(v); //stores it and checks if its blank or valid 
    // Live-validate: clear error when input becomes valid or empty
    if (v.trim() === "" || isValidIp(v)) setErr("");
  }

  async function handleSearch(e) {
    e.preventDefault(); // Prevent the browser from reloading the page on form submit
    const target = query.trim() || myIp;   // allow blank to use your own IP

    // If the user typed something (not blank) but it's not a valid IP -> show error
    if (query.trim() && !isValidIp(query)) { //
      setErr("Invalid input. Enter a valid IPv4 or IPv6 address.");
      setInfo(null);
      return;
    }

    setErr("");
    setLoading(true);
    setInfo(null);

    try {
      const data = await getIpInfo(target); //fetch IP info from the details provided by the API 
      setInfo(data);
    } catch (e) {
      setErr("Could not fetch IP info. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return ( //the UI that will be shown on the screen
    <div className="app">
      <h1>IP Lookup App</h1>
      <p>Your IP: {myIp || "Loading..."}</p> {/* "if myIP exists, show it; otherwise, show 'Loading...'" */}

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