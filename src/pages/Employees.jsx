import { useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { roles } from "../data/defaultData";
import { canSee, isHR } from "../utils/permissions";
import { getDepartmentName } from "../services/employeeService";
import { today } from "../utils/helpers";

export default function Employees() {
  const { currentUser } = useAuth();
  const { data, update, addAudit } = useEmployee();
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const list = data.employees.filter(e => canSee(currentUser, e));
  const blank = { name:"", phone:"", email:"", department:data.departments[0]?.id || "", designation:"", joiningDate:today(), salary:"", role:"employee", username:"", password:"" };

  const save = e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (data.employees.some(x => x.email.toLowerCase() === f.email.toLowerCase() && x.id !== editing?.id)) return setError("This email is already in use.");
    if (data.employees.some(x => x.username === f.username && x.id !== editing?.id)) return setError("This username is already in use.");
    update(d => ({ ...d, employees: editing?.id
      ? d.employees.map(x => x.id === editing.id ? { ...x, ...f, salary:Number(f.salary) } : x)
      : [...d.employees, { ...f, id:`E${Date.now()}`, salary:Number(f.salary), status:"Active", leaveBalance:18, manager:"" }]
    }));
    addAudit(currentUser, editing?.id ? `Updated employee ${editing.id}` : "Added employee");
    setEditing(null);
  };

  const toggle = id => {
    if (id === currentUser.id) return;
    update(d => ({ ...d, employees:d.employees.map(e => e.id === id ? {...e, status:e.status === "Active" ? "Inactive" : "Active"} : e) }));
  };

  return <>
    <Header title={currentUser.role === "employee" ? "My Profile" : "Employee Management"} subtitle="View and manage employee information." />
    <section className="panel">
      {isHR(currentUser) && <button className="primary" onClick={() => {setError(""); setEditing(blank);}}>Add Employee</button>}
      <DataTable headers={["ID","Name","Department","Designation","Email","Status","Actions"]}
        rows={list.map(e => [e.id,e.name,getDepartmentName(data.departments,e.department),e.designation,e.email,<span className={`status ${e.status === "Active" ? "green" : "red"}`}>{e.status}</span>,
          isHR(currentUser) ? <><button className="secondary small" onClick={() => {setError("");setEditing(e);}}>Edit</button><button className="secondary small" onClick={() => toggle(e.id)}>{e.status === "Active" ? "Deactivate" : "Activate"}</button></> : "-"])} />
    </section>
    {editing && <Modal title={editing.id ? "Update Employee" : "Add Employee"} onClose={() => setEditing(null)} onSubmit={save} error={error}>
      <div className="form-grid">
        {Object.entries({name:"Full Name",phone:"Phone",email:"Email",designation:"Designation",joiningDate:"Joining Date",salary:"Salary",username:"Username",password:"Password"}).map(([key,label]) =>
          <label key={key}>{label}<input name={key} type={key==="email"?"email":key==="salary"?"number":key==="joiningDate"?"date":"text"} defaultValue={editing[key] || ""} required /></label>)}
        <label>Department<select name="department" defaultValue={editing.department}>{data.departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
        <label>Role<select name="role" defaultValue={editing.role}>{Object.entries(roles).map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label>
      </div>
    </Modal>}
  </>;
}
