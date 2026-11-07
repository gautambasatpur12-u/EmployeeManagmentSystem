import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";
import { canSee, isHR } from "../utils/permissions";
import { today, getTime } from "../utils/helpers";

export default function Attendance() {
  const {currentUser}=useAuth(); const {data,update,addAudit}=useEmployee();
  const records=data.attendance.filter(a=>canSee(currentUser,data.employees.find(e=>e.id===a.employeeId)));
  const todayRecord=data.attendance.find(a=>a.employeeId===currentUser.id&&a.date===today());
  const checkIn=()=>{if(todayRecord)return;const time=getTime();update(d=>({...d,attendance:[...d.attendance,{employeeId:currentUser.id,date:today(),checkIn:time,checkOut:"",status:time>"09:30"?"Late":"Present"}]}));addAudit(currentUser,"Checked in");};
  const checkOut=()=>{update(d=>({...d,attendance:d.attendance.map(a=>a===todayRecord?{...a,checkOut:getTime()}:a)}));addAudit(currentUser,"Checked out");};
  return <>
    <Header title="Attendance" subtitle="Track daily attendance." />
    <section className="panel"><h2>Today's Attendance</h2>{!todayRecord?<button className="primary" onClick={checkIn}>Check In</button>:<><p>Check-in: {todayRecord.checkIn}</p><p>Check-out: {todayRecord.checkOut||"Not checked out"}</p>{!todayRecord.checkOut&&<button className="primary" onClick={checkOut}>Check Out</button>}</>}</section>
    <section className="panel"><h2>Attendance Records</h2><DataTable headers={["Employee","Date","Check-in","Check-out","Status"]} rows={records.map(a=>[data.employees.find(e=>e.id===a.employeeId)?.name||"-",a.date,a.checkIn||"-",a.checkOut||"-",a.status])} /></section>
  </>;
}
