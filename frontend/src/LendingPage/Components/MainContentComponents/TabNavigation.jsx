export default function Tabnav({ activeTab, setActiveTab }) {
  return (
    <>
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`pb-4 px-4 font-medium ${
            activeTab === "available"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available Markets
        </button>
        <button
          className={`pb-4 px-4 font-medium ${
            activeTab === "my"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("my")}
        >
          My Lending Positions
        </button>
      </div>
    </>
  );
}
