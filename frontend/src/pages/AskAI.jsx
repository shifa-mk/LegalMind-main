<div className="mt-8 space-y-10">
  {results.map((sec) => {
    // 1. Get the category name for this section (e.g., "HOMICIDE" or "THEFT")
    const categoryKey = sectionToCrimeMap[String(sec.sectionNumber)];
    
    // 2. Get the city data from your stats state
    const cityData = allCrimeStats?.[cityOnly];
    
    // 3. Find the matching key in the city data (case-insensitive)
    const matchedKey = cityData 
      ? Object.keys(cityData).find(k => k.toUpperCase() === categoryKey?.toUpperCase()) 
      : null;
    
    const stats = matchedKey ? cityData[matchedKey] : null;

    return (
      <div key={sec._id} className="p-8 bg-white border border-slate-200 rounded-2xl shadow-lg">
        {/* Header with Title and Law Type */}
        <div className="flex justify-between items-start mb-4 border-b pb-4">
          <div>
            <h2 className="text-2xl font-black text-blue-900 uppercase">
              {sec.lawType || "IPC"} — Section {sec.sectionNumber}
            </h2>
            <p className="text-lg font-bold text-slate-700 mt-1">{sec.sectionName}</p>
          </div>
          {sec.score && (
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
              {(sec.score * 100).toFixed(0)}% Match
            </span>
          )}
        </div>

        {/* Full Details Display */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</h4>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{sec.description}</p>
          </div>

          <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
            <h4 className="text-xs font-bold text-orange-700 uppercase mb-1">Punishment</h4>
            <p className="text-orange-900 font-medium">{sec.punishment || "Refer to legal code for specific sentencing."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border">
              <h4 className="font-bold text-slate-800 mb-2 text-sm">📋 Investigation Protocol</h4>
              <ul className="text-sm text-slate-600 space-y-1 list-disc ml-4">
                {sec.investigationSteps?.length > 0 
                  ? sec.investigationSteps.map((step, i) => <li key={i}>{step}</li>)
                  : <li>Standard procedure as per police manual.</li>}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border">
              <h4 className="font-bold text-slate-800 mb-2 text-sm">📂 Required Evidence</h4>
              <ul className="text-sm text-slate-600 space-y-1 list-disc ml-4">
                {sec.requiredDocuments?.length > 0 
                  ? sec.requiredDocuments.map((doc, i) => <li key={i}>{doc}</li>)
                  : <li>Witness statements, physical evidence, and site reports.</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Analytics Section - SOLVED, UNSOLVED, TOTAL */}
        <div className="mt-6 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          {stats ? (
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Cases</p>
                <p className="text-xl font-extrabold text-slate-800">{stats.total}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase">Solved</p>
                <p className="text-xl font-extrabold text-emerald-600">{stats.solved}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase">Unsolved</p>
                <p className="text-xl font-extrabold text-red-600">
                  {/* Logic: Total - Solved = Unsolved */}
                  {Number(stats.total) - Number(stats.solved)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs italic text-slate-400">Regional statistics unavailable for this category in {cityOnly}</p>
          )}

          {sec.referenceLink && (
            <a 
              href={sec.referenceLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 text-xs font-bold underline hover:text-blue-800"
            >
              OFFICIAL REFERENCE LINK
            </a>
          )}
        </div>
      </div>
    );
  })}
</div>
