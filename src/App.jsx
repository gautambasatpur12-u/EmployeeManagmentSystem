import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import { useAuth } from "./context/AuthContext";
import { useEmployee } from "./context/EmployeeContext";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Salary from "./pages/Salary";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
import AccessAudit from "./pages/AccessAudit";
import Notifications from "./pages/Notifications";

const pageComponents = {
  employees: Employees, departments: Departments, attendance: Attendance,
  leaves: Leaves, salary: Salary, performance: Performance, reports: Reports,
  access: AccessAudit, notifications: Notifications
};

export default function App() {
  const { currentUser } = useAuth();
  const { data } = useEmployee();
  const [page,setPage] = useState("dashboard");
  const [toast,setToast] = useState("");
  const unread = data.notifications.filter(n=>n.id===currentUser?.id&&!n.read).length;
  const Page = pageComponents[page] || Dashboard;

  return <ProtectedRoute>
    <div className="shell">
      <Sidebar activePage={page} onNavigate={setPage} unreadCount={unread}/>
      <div className="main-area">
        <Navbar title="Employee Management System"/>
        <main>
          {page==="dashboard"
            ? <Dashboard onNavigate={setPage} onAddEmployee={()=>setPage("employees")}/>
            : <Page />}
        </main>
      </div>
      <Toast message={toast} onDone={()=>setToast("")}/>
    </div>
  </ProtectedRoute>;
}
