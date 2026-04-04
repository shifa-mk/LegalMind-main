import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/audit/logs");
      
      if (data.success) {
        setLogs(data.logs || []);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error("Failed to load logs", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 printable-section">
      {/* This style block ensures that when window.print() is called, 
          only the element with 'printable-section' is visible.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-section, .printable-section * {
            visibility: visible;
          }
          .printable-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Audit Logs
        </h2>
        {/* Hide this button during the actual print */}
        <button 
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 no-print"
          disabled={logs.length === 0}
        >
          Print Logs
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-4">Loading logs...</p>
      ) : logs.length === 0 ? (
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
