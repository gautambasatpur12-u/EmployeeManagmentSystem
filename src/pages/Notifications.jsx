import { useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";

export default function Notifications() {
  const { currentUser } = useAuth();
  const { data, update } = useEmployee();
  const records = data.notifications.filter(n => n.id === currentUser.id);

  useEffect(() => {
    if (records.some(n => !n.read)) {
      update(d => ({
        ...d,
        notifications: d.notifications.map(n =>
          n.id === currentUser.id ? { ...n, read: true } : n
        )
      }));
    }
  }, [currentUser.id, records, update]);

  return (
    <>
      <Header title="Notifications" subtitle="Your latest notifications." />
      <section className="panel">
        {records.length ? records.map((n, i) => (
          <div className="notice" key={i}>
            <div>{n.message}</div>
            <small>{n.date}</small>
          </div>
        )) : <p className="muted">No notifications yet.</p>}
      </section>
    </>
  );
}
