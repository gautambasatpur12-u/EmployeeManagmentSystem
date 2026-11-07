import { useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { canSee, isHR } from "../utils/permissions";
import { today } from "../utils/helpers";

export default function Performance() {
  const {currentUser}=useAuth();const {data,update,notify,addAudit}=useEmployee();const [open,setOpen]=useState(false);
  const records=data.performance.filter(p=>canSee(currentUser,data.employees.find(e=>e.id===p.employeeId)));
  const possible=data.employees.filter(e=>e.status==="Active"&&e.id!==currentUser.id&&(isHR(currentUser)||(currentUser.role==="manager"&&e.manager===currentUser.id)));
  const save=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));update(d=>({...d,performance:[...d.performance,{...f,rating:Number(f.rating),reviewerId:currentUser.id}]}));notify(f.employeeId,"A performance review has been added to your record.");addAudit(currentUser,`Added performance review for ${f.employeeId}`);setOpen(false);};
  return <><Header title="Performance Reviews" subtitle="Employee performance and feedback."/><section className="panel">{(isHR(currentUser)||currentUser.role==="manager")&&<button className="primary" onClick={()=>setOpen(true)}>Add Review</button>}<DataTable headers={["Employee","Date","Rating","Goals","Feedback"]} rows={records.map(p=>[data.employees.find(e=>e.id===p.employeeId)?.name||"-",p.date,`${p.rating}/5`,p.goals,p.feedback])}/></section>
  {open&&<Modal title="Add Performance Review" onClose={()=>setOpen(false)} onSubmit={save}><label>Employee<select name="employeeId">{possible.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></label><label>Rating<select name="rating">{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}/5</option>)}</select></label><label>Review Date<input name="date" type="date" defaultValue={today()} required/></label><label>Goals<textarea name="goals" required/></label><label>Feedback<textarea name="feedback" required/></label></Modal>}</>;
}
