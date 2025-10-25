// this component displays the IP information card if the IP 
// is valid and fetched successfully from the user input 

export default function IpCard({ info }) {
  if (!info) return null; // No info to display if info is null meaning no data fetched yet (e.g., loading state)

  return (
    <div className="card">
      <h3>IP Details</h3>
      <p><strong>IP:</strong> {info.ip}</p>
      <p><strong>Country:</strong> {info.location?.country}</p>
      <p><strong>City:</strong> {info.location?.city}</p>
      <p><strong>ISP:</strong> {info.isp?.org}</p>
      <p><strong>VPN:</strong> {info.risk?.is_vpn ? "Yes" : "No"}</p>
    </div>
  );
}


