export function getRiskBadge(risk) {
  switch (risk) {
    case "Low":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-200">
          Low Risk
        </span>
      );
    case "Medium":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-200">
          Medium Risk
        </span>
      );
    case "High":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900 text-red-200">
          High Risk
        </span>
      );
    default:
      return null;
  }
}
