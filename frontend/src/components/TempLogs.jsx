import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function AuditLogs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {

      const { data } = await api.get("/api/audit/logs");

      console.log("Audit logs response:", data);

      // IMPORTANT FIX
      if (data.success) {
        setLogs(data.logs || []);
      } else {
        setLogs([]);
      }

    } catch (error) {

      console.error("Failed to load logs", error);
      setLogs([]);

    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Audit Logs
        </h2>
        <button 
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700"
        >
          Print Logs
        </button>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500">
          No investigation activity yet.
        </p>
      ) : (
        <ul className="space-y-3">

          {logs.map((log) => (
            <li
              key={log._id}
              className="border p-3 rounded-lg bg-gray-50"
            >

              <p className="font-medium">
                {log.action}
              </p>

              <p className="text-sm text-gray-600">
                {log.details}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(log.createdAt).toLocaleString()}
              </p>

            </li>
          ))}

        </ul>
      )}

    </div>
  );
}