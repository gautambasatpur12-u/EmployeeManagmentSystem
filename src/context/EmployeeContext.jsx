import { createContext, useContext, useEffect, useState } from "react";
import { loadData, saveData } from "../services/storageService";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const update = updater => {
    setData(previous => {
      const next = typeof updater === "function" ? updater(previous) : updater;
      return next;
    });
  };

  const addAudit = (user, message) => update(d => ({
    ...d, audit: [{ user: user?.name || "System", message, date: new Date().toLocaleString() }, ...d.audit]
  }));

  const notify = (id, message) => update(d => ({
    ...d, notifications: [{ id, message, date: new Date().toLocaleString(), read: false }, ...d.notifications]
  }));

  return (
    <EmployeeContext.Provider value={{ data, setData, update, addAudit, notify }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployee = () => useContext(EmployeeContext);
