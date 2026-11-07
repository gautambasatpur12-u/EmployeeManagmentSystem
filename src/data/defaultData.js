export const defaultData = {
  departments: [
    { id: "D1", name: "Engineering" },
    { id: "D2", name: "Human Resources" },
    { id: "D3", name: "Sales" }
  ],
  employees: [
    { id:"E001", name:"Aarav Menon", phone:"555-0101", email:"aarav@company.com", department:"D2", designation:"HR Administrator", joiningDate:"2019-04-01", salary:52000, role:"admin", username:"admin", password:"admin123", manager:"", status:"Active", leaveBalance:18 },
    { id:"E002", name:"Meera Rao", phone:"555-0102", email:"meera@company.com", department:"D2", designation:"HR Executive", joiningDate:"2020-02-10", salary:48000, role:"hr", username:"hr", password:"hr123", manager:"", status:"Active", leaveBalance:18 },
    { id:"E003", name:"Kiran Shah", phone:"555-0103", email:"kiran@company.com", department:"D1", designation:"Engineering Manager", joiningDate:"2018-08-20", salary:64000, role:"manager", username:"manager", password:"manager123", manager:"", status:"Active", leaveBalance:18 },
    { id:"E004", name:"Diya Nair", phone:"555-0104", email:"diya@company.com", department:"D1", designation:"Software Engineer", joiningDate:"2022-01-17", salary:42000, role:"employee", username:"employee", password:"emp123", manager:"E003", status:"Active", leaveBalance:18 },
    { id:"E005", name:"Rohan Iyer", phone:"555-0105", email:"rohan@company.com", department:"D1", designation:"QA Analyst", joiningDate:"2023-05-08", salary:36000, role:"employee", username:"rohan", password:"rohan123", manager:"E003", status:"Active", leaveBalance:18 }
  ],
  attendance: [],
  leaves: [],
  performance: [],
  notifications: [],
  audit: [],
  salaries: []
};

export const roles = {
  admin: "Administrator",
  hr: "HR Staff",
  manager: "Manager",
  employee: "Employee"
};

export const navigation = {
  admin: [["dashboard","Dashboard"],["employees","Employees"],["departments","Departments"],["attendance","Attendance"],["leaves","Leave"],["salary","Salary"],["performance","Performance"],["reports","Reports"],["access","Access & Audit"],["notifications","Notifications"]],
  hr: [["dashboard","Dashboard"],["employees","Employees"],["departments","Departments"],["attendance","Attendance"],["leaves","Leave"],["salary","Salary"],["performance","Performance"],["reports","Reports"],["notifications","Notifications"]],
  manager: [["dashboard","Dashboard"],["employees","My Team"],["attendance","Attendance"],["leaves","Leave"],["performance","Performance"],["reports","Reports"],["notifications","Notifications"]],
  employee: [["dashboard","Dashboard"],["employees","My Profile"],["attendance","Attendance"],["leaves","Leave"],["salary","Salary"],["performance","Performance"],["notifications","Notifications"]]
};
