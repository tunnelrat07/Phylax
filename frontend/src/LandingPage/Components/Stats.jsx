export default function Stats() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              $240M+
            </div>
            <div className="text-gray-300">Total Value Locked</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              15K+
            </div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              $32M+
            </div>
            <div className="text-gray-300">Insurance Coverage</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              8.2%
            </div>
            <div className="text-gray-300">Avg. APY for Lenders</div>
          </div>
        </div>
      </div>
    </>
  );
}
