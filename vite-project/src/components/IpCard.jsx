export default function IpCard({ info }) {
  if (!info) return null;

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
