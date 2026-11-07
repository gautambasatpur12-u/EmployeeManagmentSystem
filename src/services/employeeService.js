export function getEmployee(employees, id) {
  return employees.find(e => e.id === id) || {};
}

export function getDepartmentName(departments, id) {
  return departments.find(d => d.id === id)?.name || "-";
}

export function createCsv(headers, rows) {
  return [headers, ...rows].map(row =>
    row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")
  ).join("\n");
}

export function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
