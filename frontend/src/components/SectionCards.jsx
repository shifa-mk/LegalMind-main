export default function SectionCard({ sectionNumber, sectionName, punishment }) {
  return (
    <div className="border shadow-md p-4 rounded mb-3 bg-white">
      <h4 className="font-bold text-lg">Section {sectionNumber} – {sectionName}</h4>
      <p className="text-gray-700">Punishment: {punishment}</p>
      <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
        View Details
      </button>
    </div>
  );
}
