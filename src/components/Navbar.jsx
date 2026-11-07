export default function Navbar({ title }) {
  return <div className="mobile-navbar">{title || "Employee Management"}</div>;
}
