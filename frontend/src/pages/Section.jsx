import { useEffect, useState } from "react";
import api from "../utils/axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Link } from "react-router-dom";

export default function Section() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [lawType, setLawType] = useState("all");

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/sections")
      .then((res) => {
        console.log("Fetched sections:", res.data);
        // Remove duplicates by _id safely
        const uniqueSections = res.data.filter(
          (section, index, self) =>
            index === self.findIndex((s) => s._id === section._id)
        );
        setSections(uniqueSections);
      })
      .catch((err) => console.error("Error fetching sections:", err))
      .finally(() => setLoading(false));
  }, []);

  // Get unique law types dynamically
  const lawTypes = [
    "all",
    ...new Set(sections.map((s) => s.lawType).filter(Boolean)),
  ];

  // 🔍 Search + Filter logic with "Safe Access"
  const filteredSections = sections.filter((section) => {
    // Helper to handle different DB naming (sectionName vs title, etc.)
    const name = (section.sectionName || section.title || "").toLowerCase();
    const number = (section.sectionNumber || section.section || "").toString().toLowerCase();
    const punishment = (section.punishment || "").toLowerCase();
    const desc = (section.description || "").toLowerCase();
    
    const query = searchTerm.toLowerCase();

    // Law type filter
    if (lawType !== "all" && section.lawType !== lawType) return false;

    // Search filter
    if (filterBy === "name") return name.includes(query);
    if (filterBy === "number") return number.includes(query);
    if (filterBy === "punishment") return punishment.includes(query);

    // Default: search across all fields
    return name.includes(query) || number.includes(query) || punishment.includes(query) || desc.includes(query);
  });

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-3 mb-6 mt-6">
        <input
          type="text"
          placeholder="Search sections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3 text-black"
        />

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4 text-black"
        >
          <option value="all">All Fields</option>
          <option value="name">Section Name/Title</option>
          <option value="number">Section Number</option>
          <option value="punishment">Punishment</option>
        </select>

        <select
          value={lawType}
          onChange={(e) => setLawType(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4 text-black"
        >
          {lawTypes.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "All Law Types" : type}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.length > 0 ? (
            filteredSections.map((section, index) => (
              <Card
                key={section._id || index}
                className="p-4 rounded-xl border shadow-md hover:shadow-lg transition-all bg-white"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-900">
                    Section {section.sectionNumber || section.section}: {section.sectionName || section.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-3">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 mt-2">
                  <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-gray-500">
                    <span>Type: {section.lawType || "N/A"}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                    <b>Punishment:</b> {section.punishment || "Refer to details"}
                  </p>
                  <Link
                    to={`/sections/${section._id}`}
                    className="text-blue-600 font-semibold hover:underline text-sm inline-block mt-3"
                  >
                    View Details →
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
               <p className="text-gray-500 text-xl font-medium">No sections matching your search.</p>
               <button onClick={() => {setSearchTerm(""); setLawType("all")}} className="text-blue-600 underline mt-2">Clear filters</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
