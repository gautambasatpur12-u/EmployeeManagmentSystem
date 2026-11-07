import { useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { roles } from "../data/defaultData";

export default function AccessAudit() {
  const {currentUser}=useAuth();const {data,update,addAudit}=useEmployee();const [target,setTarget]=useState(null);
  const save=e=>{e.preventDefault();const role=new FormData(e.target).get("role");update(d=>({...d,employees:d.employees.map(x=>x.id===target.id?{...x,role}:x)}));addAudit(currentUser,`Changed role for ${target.id} to ${role}`);setTarget(null);};
  return <><Header title="Access & Audit" subtitle="Manage user roles and review system activity."/><section className="panel"><h2>User Roles</h2><DataTable headers={["Employee","Username","Role","Action"]} rows={data.employees.map(e=>[e.name,e.username,roles[e.role],e.id===currentUser.id?"-":<button className="secondary small" onClick={()=>setTarget(e)}>Change Role</button>])}/></section><section className="panel"><h2>Audit History</h2><DataTable headers={["User","Activity","Date"]} rows={data.audit.map(a=>[a.user,a.message,a.date])}/></section>
  {target&&<Modal title="Change Role" onClose={()=>setTarget(null)} onSubmit={save}><label>Role<select name="role" defaultValue={target.role}>{Object.entries(roles).map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label></Modal>}</>;
}
