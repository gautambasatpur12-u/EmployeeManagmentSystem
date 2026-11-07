import { useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { isHR } from "../utils/permissions";

export default function Departments() {
  const { currentUser } = useAuth();
  const { data, update, addAudit } = useEmployee();
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const save = e => {
    e.preventDefault(); const name = new FormData(e.target).get("name").trim();
    if (data.departments.some(d => d.name.toLowerCase() === name.toLowerCase() && d.id !== editing?.id)) return setError("Department already exists.");
    update(d => ({...d, departments: editing.id ? d.departments.map(x=>x.id===editing.id?{...x,name}:x) : [...d.departments,{id:`D${Date.now()}`,name}]}));
    addAudit(currentUser, `Saved department ${name}`); setEditing(null);
  };
  const remove = id => {
    if (data.employees.some(e=>e.department===id)) return alert("Move employees to another department first.");
    update(d=>({...d,departments:d.departments.filter(x=>x.id!==id)}));
  };
  return <>
    <Header title="Departments" subtitle="Manage company departments." />
    <section className="panel">
      {isHR(currentUser) && <button className="primary" onClick={()=>{setError("");setEditing({id:"",name:""});}}>Add Department</button>}
      <DataTable headers={["Department ID","Department Name","Actions"]} rows={data.departments.map(d=>[d.id,d.name,isHR(currentUser)?<><button className="secondary small" onClick={()=>{setError("");setEditing(d);}}>Rename</button><button className="danger small" onClick={()=>remove(d.id)}>Delete</button></>:"-"])} />
    </section>
    {editing && <Modal title={editing.id?"Rename Department":"Add Department"} onClose={()=>setEditing(null)} onSubmit={save} error={error}><label>Department Name<input name="name" defaultValue={editing.name} required /></label></Modal>}
  </>;
}
