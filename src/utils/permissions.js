export const isHR = user => ["admin", "hr"].includes(user?.role);

export function canSee(user, employee) {
  if (!user || !employee) return false;
  return isHR(user) || employee.id === user.id ||
    (user.role === "manager" && employee.manager === user.id);
}

export function canReview(user, leave, employees) {
  if (!user || !leave || leave.status !== "Pending") return false;
  const target = employees.find(e => e.id === leave.employeeId);
  return isHR(user) || (user.role === "manager" && target?.manager === user.id);
}
