import { useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { canSee } from "../utils/permissions";
import { createCsv, downloadCsv, getDepartmentName } from "../services/employeeService";

export default function Reports() {
  const {currentUser}=useAuth();const {data}=useEmployee();const [type,setType]=useState("Employees");
  let headers=[],rows=[];
  if(type==="Employees"){headers=["ID","Name","Department","Designation","Status"];rows=data.employees.filter(e=>canSee(currentUser,e)).map(e=>[e.id,e.name,getDepartmentName(data.departments,e.department),e.designation,e.status]);}
  else if(type==="Leaves"){headers=["Employee","Type","From","To","Days","Status"];rows=data.leaves.filter(l=>canSee(currentUser,data.employees.find(e=>e.id===l.employeeId))).map(l=>[data.employees.find(e=>e.id===l.employeeId)?.name,l.type,l.from,l.to,l.days,l.status]);}
  else if(type==="Performance"){headers=["Employee","Date","Rating","Goals","Feedback"];rows=data.performance.filter(p=>canSee(currentUser,data.employees.find(e=>e.id===p.employeeId))).map(p=>[data.employees.find(e=>e.id===p.employeeId)?.name,p.date,p.rating,p.goals,p.feedback]);}
  else {headers=["Employee","Date","Check-in","Check-out","Status"];rows=data.attendance.filter(a=>canSee(currentUser,data.employees.find(e=>e.id===a.employeeId))).map(a=>[data.employees.find(e=>e.id===a.employeeId)?.name,a.date,a.checkIn,a.checkOut,a.status]);}
  return <><Header title="Reports" subtitle="View and export company reports."/><section className="panel"><div className="toolbar"><label>Report Type<select value={type} onChange={e=>setType(e.target.value)}>{["Employees","Attendance","Leaves","Performance"].map(x=><option key={x}>{x}</option>)}</select></label><button className="primary" onClick={()=>downloadCsv(`${type.toLowerCase()}-report.csv`,createCsv(headers,rows))}>Export CSV</button></div><DataTable headers={headers} rows={rows}/></section></>;
}
