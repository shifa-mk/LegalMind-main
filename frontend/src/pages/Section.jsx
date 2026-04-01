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

export default function Section() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all"); // name | number | punishment | all
  const [lawType, setLawType] = useState("all"); // IPC, IT Act, POCSO Act, etc.

  useEffect(() => {
    api
      .get("/api/sections")
      .then((res) => {
        console.log("Fetched sections:", res.data);

        // ✅ Remove duplicates by _id
        const uniqueSections = res.data.filter(
          (section, index, self) =>
            index === self.findIndex((s) => s._id === section._id)
        );

        setSections(uniqueSections);
      })
      .catch((err) => console.error("Error fetching sections:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Get unique law types dynamically from API data
  const lawTypes = [
    "all",
    ...new Set(sections.map((s) => s.lawType).filter(Boolean)),
  ];

  // 🔍 Search + Filter logic
  const filteredSections = sections.filter((section) => {
    const query = searchTerm.toLowerCase();

    // Law type filter
    if (lawType !== "all" && section.lawType !== lawType) {
      return false;
    }

    // Search filter
    if (filterBy === "name") {
      return section.sectionName.toLowerCase().includes(query);
    }
    if (filterBy === "number") {
      return section.sectionNumber.toString().toLowerCase().includes(query);
    }
    if (filterBy === "punishment") {
      return section.punishment?.toLowerCase().includes(query);
    }

    // Default: search across all fields
    return (
      section.sectionName.toLowerCase().includes(query) ||
      section.sectionNumber.toString().toLowerCase().includes(query) ||
      section.punishment?.toLowerCase().includes(query) ||
      section.description?.toLowerCase().includes(query)
    );
  });

  return (
    <section>
      {/* 🔎 Search + Filter Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 mt-6">
        <input
          type="text"
          placeholder="Search sections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="all">All Fields</option>
          <option value="name">Section Name</option>
          <option value="number">Section Number</option>
          <option value="punishment">Punishment</option>
        </select>

        {/* ⚖️ Law Type Dropdown */}
        <select
          value={lawType}
          onChange={(e) => setLawType(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
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
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <Card
                key={section._id}
                className="p-4 rounded-xl border shadow-md hover:shadow-lg transition-all duration-200"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900">
                    {section.sectionNumber}: {section.sectionName}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {section.description?.slice(0, 120)}...
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Law Type:</b> {section.lawType}
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>Punishment:</b> {section.punishment}
                  </p>
                  <a
                    href={`/sections/${section._id}`}
                    className="text-blue-600 hover:underline text-sm inline-block mt-2"
                  >
                    View Details →
                  </a>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No sections found.</p>
          )}
        </div>
      )}
    </section>
  );
}
