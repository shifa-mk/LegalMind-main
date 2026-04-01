import { useEffect, useState } from "react";
import api from "../utils/axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";

export default function PoliceDashboard() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  api.get("/api/sections")
    .then((res) => {
      console.log("Fetched sections:", res.data);
      setSections(res.data);
    })
    .catch((err) => console.error("Error fetching sections:", err))
    .finally(() => setLoading(false));
}, []);


  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Police Dashboard</h1>
          <p className="text-blue-700 mt-2 max-w-lg">
            Access legal sections, their details, documents, and procedures required during police investigations.
          </p>
        </div>
        <img
          src="/image.png" // Place this image in `public/`
          alt="Police Dashboard"
          className="w-40 h-auto mt-4 md:mt-0"
        />
      </div>

      <Separator />

      {/* How to Use the App */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">📘 How to Use the App</h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          <li>Browse through legal sections listed below.</li>
          <li>Click on any section to view detailed investigation steps, documents, and references.</li>
          <li>Use the Ask AI page to clarify legal doubts.</li>
          <li>Filter sections according to types,number,names ,etc.</li>
        </ul>
      </section>

      {/* Sections List */}
      <section>
          {/* ⚖️ Law Types Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Law Types Included</h3>
          <div className="flex flex-wrap gap-3">
            {[...new Set(sections.map((s) => s.lawType).filter(Boolean))].map(
              (type, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-lg bg-blue-100 text-blue-800 font-medium shadow-sm hover:bg-blue-200 cursor-pointer transition"
                >
                  {type}
                </div>
              )
            )}
          </div>
        </div> 
        
        <h2 className="text-2xl font-semibold mb-5 py-5 text-center rounded-lg bg-slate-600 text-white">Legal Sections</h2>
        
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sections.slice(0,6).map((section) => (
              <Card key={section._id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{section.sectionNumber}: {section.sectionName}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground truncate">
                    {section.description.slice(0, 100)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    <b>Punishment:</b> {section.punishment}
                  </p>
                  <a
                    href={`/sections/${section._id}`}
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    View Details →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
