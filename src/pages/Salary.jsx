import { useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { canSee, isHR } from "../utils/permissions";
import { today } from "../utils/helpers";

export default function Salary() {
  const {currentUser}=useAuth();const {data,update,addAudit}=useEmployee();const [target,setTarget]=useState(null);
  const records=data.employees.filter(e=>canSee(currentUser,e));
  const save=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));const record={employeeId:target.id,base:Number(f.base),allowances:Number(f.allowances),deductions:Number(f.deductions),effectiveDate:f.effectiveDate};update(d=>({...d,salaries:d.salaries.some(x=>x.employeeId===target.id)?d.salaries.map(x=>x.employeeId===target.id?record:x):[...d.salaries,record]}));addAudit(currentUser,`Updated salary for ${target.id}`);setTarget(null);};
  return <><Header title="Salary Management" subtitle="View salary information."/><section className="panel"><DataTable headers={["Employee","Base Salary","Allowances","Deductions","Net Salary","Action"]} rows={records.map(e=>{const s=data.salaries.find(x=>x.employeeId===e.id)||{base:e.salary,allowances:0,deductions:0};return [e.name,s.base,s.allowances,s.deductions,s.base+s.allowances-s.deductions,isHR(currentUser)?<button className="secondary small" onClick={()=>setTarget({...e,salaryRecord:s})}>Edit Salary</button>:"-"];})}/></section>
  {target&&<Modal title={`Salary for ${target.name}`} onClose={()=>setTarget(null)} onSubmit={save}><div className="form-grid"><label>Base Salary<input name="base" type="number" defaultValue={target.salaryRecord.base} required/></label><label>Allowances<input name="allowances" type="number" defaultValue={target.salaryRecord.allowances} required/></label><label>Deductions<input name="deductions" type="number" defaultValue={target.salaryRecord.deductions} required/></label><label>Effective Date<input name="effectiveDate" type="date" defaultValue={target.salaryRecord.effectiveDate||today()} required/></label></div></Modal>}
  </>;
}
