import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { canReview, canSee, isHR } from "../utils/permissions";

export default function Dashboard({ onNavigate, onAddEmployee }) {
  const { currentUser } = useAuth();
  const { data } = useEmployee();
  const visible = data.employees.filter(e => canSee(currentUser, e));
  const active = visible.filter(e => e.status === "Active").length;
  const pending = data.leaves.filter(l => canReview(currentUser, l, data.employees)).length;

  return <>
    <Header title="Dashboard" subtitle={`Welcome back, ${currentUser.name}`} />
    <div className="stats">
      <StatCard value={visible.length} label="Employees" />
      <StatCard value={active} label="Active Employees" />
      <StatCard value={data.departments.length} label="Departments" />
      <StatCard value={pending} label="Pending Leave Requests" />
    </div>
    <section className="panel">
      <h2>Quick Actions</h2>
      <button className="primary" onClick={() => onNavigate("attendance")}>Attendance</button>
      <button className="secondary" onClick={() => onNavigate("leaves")}>Leave Requests</button>
      {isHR(currentUser) && <button className="secondary" onClick={onAddEmployee}>Add Employee</button>}
    </section>
  </>;
}
