export default function Loading() {
    return (
      <div className="min-h-screen bg-[#141414] p-8 pt-24 animate-pulse">
        {/* 1. Skeleton Hero Banner */}
        <div className="w-full h-[60vh] md:h-[80vh] bg-gray-800 rounded-xl mb-10 relative overflow-hidden">
          <div className="absolute bottom-10 left-10 space-y-4">
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
            <div className="h-12 w-96 bg-gray-700 rounded"></div>
            <div className="h-4 w-64 bg-gray-700 rounded"></div>
            <div className="flex gap-4 pt-4">
               <div className="h-10 w-32 bg-gray-600 rounded"></div>
               <div className="h-10 w-32 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
  
        {/* 2. Skeleton Baris Film (3 Baris) */}
        {[1, 2, 3].map((row) => (
          <div key={row} className="mb-8">
            <div className="h-6 w-48 bg-gray-800 rounded mb-4"></div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div key={card} className="shrink-0 w-[160px] h-[240px] bg-gray-800 rounded-md"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }