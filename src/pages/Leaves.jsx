import { useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { canReview, canSee } from "../utils/permissions";
import { today } from "../utils/helpers";

export default function Leaves() {
  const {currentUser}=useAuth(); const {data,update,notify,addAudit}=useEmployee();
  const [open,setOpen]=useState(false); const [error,setError]=useState("");
  const records=data.leaves.filter(l=>canSee(currentUser,data.employees.find(e=>e.id===l.employeeId))||canReview(currentUser,l,data.employees));
  const submit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));if(f.to<f.from)return setError("End date cannot be before start date.");const days=Math.round((new Date(f.to)-new Date(f.from))/86400000)+1;if(f.type==="Annual"&&days>currentUser.leaveBalance)return setError("You do not have enough annual leave days.");const id=`L${Date.now()}`;update(d=>({...d,leaves:[...d.leaves,{...f,id,employeeId:currentUser.id,days,status:"Pending"}]}));data.employees.filter(x=>["admin","hr"].includes(x.role)||(currentUser.manager&&x.id===currentUser.manager)).forEach(x=>notify(x.id,`${currentUser.name} submitted a leave request.`));addAudit(currentUser,`Applied for leave ${id}`);setOpen(false);};
  const decide=(leave,approved)=>{let reason="";if(!approved){reason=prompt("Enter reason for rejection:")||"";if(!reason.trim())return;}const target=data.employees.find(e=>e.id===leave.employeeId);if(approved&&leave.type==="Annual"&&leave.days>target.leaveBalance)return alert("Employee does not have enough leave balance.");update(d=>({...d,leaves:d.leaves.map(l=>l.id===leave.id?{...l,status:approved?"Approved":"Rejected",reasonForRejection:reason,reviewedBy:currentUser.id,reviewDate:today()}:l),employees:d.employees.map(e=>e.id===leave.employeeId&&approved&&leave.type==="Annual"?{...e,leaveBalance:e.leaveBalance-leave.days}:e)}));notify(leave.employeeId,`Your ${leave.type} leave request was ${approved?"approved":"rejected"}.`);addAudit(currentUser,`${approved?"Approved":"Rejected"} leave request ${leave.id}`);};
  return <>
    <Header title="Leave Management" subtitle="Apply for leave and review requests." />
    <section className="panel"><p>Available annual leave: {currentUser.leaveBalance ?? 0} days</p><button className="primary" onClick={()=>{setError("");setOpen(true);}}>Apply for Leave</button></section>
    <section className="panel"><DataTable headers={["Employee","Type","From","To","Days","Reason","Status","Actions"]} rows={records.map(l=>[data.employees.find(e=>e.id===l.employeeId)?.name||"-",l.type,l.from,l.to,l.days,l.reason,l.status,canReview(currentUser,l,data.employees)?<><button className="primary small" onClick={()=>decide(l,true)}>Approve</button><button className="danger small" onClick={()=>decide(l,false)}>Reject</button></>:"-"])} /></section>
    {open&&<Modal title="Apply for Leave" onClose={()=>setOpen(false)} onSubmit={submit} error={error}>
      <label>Leave Type<select name="type"><option>Annual</option><option>Sick</option><option>Casual</option></select></label>
      <div className="form-grid"><label>Start Date<input type="date" name="from" defaultValue={today()} required /></label><label>End Date<input type="date" name="to" defaultValue={today()} required /></label></div>
      <label>Reason<textarea name="reason" required /></label>
    </Modal>}
  </>;
}
