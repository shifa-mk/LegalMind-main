import { useState } from "react";
import { jsPDF } from "jspdf";
import { useLocation } from "react-router-dom";
import api from "../utils/axios";

export default function GenerateFIR() {
  

  const location = useLocation();

  const aiSections = location.state?.sections || [];
  const complaintText = location.state?.complaint || "";

  const [form, setForm] = useState({
    policeStation: "",
    district: "",
    name: "",
    fatherName: "",
    address: "",
    phone: "",
    place: "",
    dateTime: "",
    offence: "",
    accused: "",
    witnesses: "",
    complaint: complaintText
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = async() => {
             try {
    // 1. Get the token (Assuming it's in localStorage or Redux)
    const token = localStorage.getItem("token"); 

    // 2. Pass it in the headers
    const response = await api.post("/api/ai/generate-fir", form, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error generating FIR:", error);
  }
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text(
      "Proforma for Reporting the First Information Report (FIR)",
      105,
      y,
      { align: "center" }
    );

    y += 8;

    doc.setFontSize(11);
    doc.text(
      "(Under Section 154 of the Criminal Procedure Code)",
      105,
      y,
      { align: "center" }
    );

    y += 15;

    doc.setFontSize(12);

    doc.text(`Police Station: ${form.policeStation}`, 10, y);
    doc.text(`District: ${form.district}`, 130, y);

    y += 10;

    doc.text("1. Personal Details of the Complainant:", 10, y);
    y += 8;

    doc.text(`Name: ${form.name}`, 15, y);
    y += 8;

    doc.text(`Father/Husband Name: ${form.fatherName}`, 15, y);
    y += 8;

    doc.text(`Address: ${form.address}`, 15, y);
    y += 8;

    doc.text(`Phone: ${form.phone}`, 15, y);

    y += 12;

    doc.text("2. Place of Occurrence:", 10, y);
    y += 8;

    doc.text(`${form.place}`, 15, y);

    y += 12;

    doc.text("3. Date and Hour of Occurrence:", 10, y);
    y += 8;

    doc.text(`${form.dateTime}`, 15, y);

    y += 12;

    doc.text("4. Offence:", 10, y);
    y += 8;

    doc.text(`Nature of Offence: ${form.offence}`, 15, y);

    y += 12;

    doc.text("5. Description of the Accused:", 10, y);
    y += 8;

    doc.text(`${form.accused}`, 15, y);

    y += 12;

    doc.text("6. Details of Witnesses:", 10, y);
    y += 8;

    doc.text(`${form.witnesses}`, 15, y);

    y += 12;

    doc.text("7. Complaint:", 10, y);
    y += 8;

    const complaintLines = doc.splitTextToSize(form.complaint, 180);
    doc.text(complaintLines, 15, y);

    y += complaintLines.length * 7 + 15;

    // AI Legal Analysis Section

    doc.setFontSize(13);
    doc.text("AI Legal Analysis", 10, y);
    y += 10;

    doc.setFontSize(11);

    // Suggested Sections
    doc.text("Suggested Sections:", 10, y);
    y += 8;

    aiSections.forEach((sec) => {
      doc.text(
        `• Section ${sec.sectionNumber} ${sec.lawType} – ${sec.sectionName}`,
        15,
        y
      );
      y += 7;
    });

    y += 5;

    // Confidence Scores
    doc.text("Confidence Score:", 10, y);
    y += 8;

    aiSections.forEach((sec) => {
      doc.text(
        `• Section ${sec.sectionNumber} → ${(sec.score * 100).toFixed(2)}%`,
        15,
        y
      );
      y += 7;
    });

    y += 5;

    // Investigation Steps
    doc.text("Suggested Investigation Steps:", 10, y);
    y += 8;

    aiSections.forEach((sec) => {
      if (sec.investigationSteps) {
        sec.investigationSteps.forEach((step) => {
          doc.text(`• ${step}`, 15, y);
          y += 7;
        });
      }
    });

    y += 10;

    doc.text("Signature / Thumb Impression of Complainant", 10, y);
    doc.save("FIR_Report.pdf");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Generate FIR</h1>

      <div className="grid grid-cols-2 gap-4">

        <input
          name="policeStation"
          placeholder="Police Station"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="district"
          placeholder="District"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Complainant Name"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="fatherName"
          placeholder="Father/Husband Name"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-2 col-span-2"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="place"
          placeholder="Place of Occurrence"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="dateTime"
          placeholder="Date & Time of Occurrence"
          className="border p-2 col-span-2"
          onChange={handleChange}
        />

        <input
          name="offence"
          placeholder="Nature of Offence"
          className="border p-2 col-span-2"
          onChange={handleChange}
        />

        <input
          name="accused"
          placeholder="Accused Details"
          className="border p-2 col-span-2"
          onChange={handleChange}
        />

        <input
          name="witnesses"
          placeholder="Witness Details"
          className="border p-2 col-span-2"
          onChange={handleChange}
        />

        <textarea
          name="complaint"
          value={form.complaint}
          placeholder="Write Complaint Details"
          rows="4"
          className="border p-2 col-span-2"
          onChange={handleChange}
        />

      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Download FIR PDF
      </button>

    </div>
  );
}