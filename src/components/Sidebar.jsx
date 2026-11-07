import { navigation, roles } from "../data/defaultData";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ activePage, onNavigate, unreadCount }) {
  const { currentUser, logout } = useAuth();
  const nav = navigation[currentUser?.role] || navigation.employee;

  return (
    <aside className="sidebar">
      <div className="brand">Employee Management</div>
      <div className="profile">
        <b>{currentUser?.name}</b>
        <span>{roles[currentUser?.role]}</span>
      </div>
      <nav>
        {nav.map(([key, label]) => (
          <button key={key} className={activePage === key ? "active" : ""}
            onClick={() => onNavigate(key)}>
            {label}{key === "notifications" && unreadCount ? ` (${unreadCount})` : ""}
          </button>
        ))}
      </nav>
      <button className="logout" onClick={logout}>Logout</button>
    </aside>
  );
}
