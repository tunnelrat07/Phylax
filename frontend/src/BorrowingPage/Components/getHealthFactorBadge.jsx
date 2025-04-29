export const getHealthFactorBadge = (factor) => {
  const factorNum = parseFloat(factor);
  if (factorNum >= 2) {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-200 flex items-center">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
        Safe
      </span>
    );
  } else if (factorNum >= 1.5) {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-200 flex items-center">
        <span className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-pulse"></span>
        Good
      </span>
    );
  } else if (factorNum >= 1.2) {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-200 flex items-center">
        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></span>
        Moderate
      </span>
    );
  } else {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-red-900 text-red-200 flex items-center">
        <span className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-pulse"></span>
        At Risk
      </span>
    );
  }
};
