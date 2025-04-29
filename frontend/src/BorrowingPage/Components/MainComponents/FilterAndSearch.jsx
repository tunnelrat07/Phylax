export default function FilterAndSearch() {
  return (
    <>
      <div
        className={`flex flex-col md:flex-row justify-between items-center mb-6 transition-all duration-500 delay-100 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative w-full md:w-64 mb-4 md:mb-0 group">
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300"
          />
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center hover:bg-gray-700 hover:border-blue-800 transition-all duration-300 group">
            <Filter
              size={16}
              className="mr-2 group-hover:rotate-12 transition-transform duration-300"
            />
            Filters
          </button>
          <button className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center hover:bg-gray-700 hover:border-blue-800 transition-all duration-300 group">
            <BarChart2
              size={16}
              className="mr-2 group-hover:scale-110 transition-transform duration-300"
            />
            Sort by: Interest Rate
            <ChevronDown
              size={16}
              className="ml-2 group-hover:translate-y-0.5 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </>
  );
}
