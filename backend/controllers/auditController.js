import AuditLog from "../models/auditLogModel.js";

export const getAuditLogs = async (req, res) => {
  try {

    const logs = await AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      logs
    });

  } catch (error) {

    console.error("Audit Logs Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load audit logs"
    });

  }
};