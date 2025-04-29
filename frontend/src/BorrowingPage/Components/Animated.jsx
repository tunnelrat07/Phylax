export default function Animated() {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-64 h-64 rounded-full bg-blue-900/20 blur-3xl -top-20 -left-20 animate-blob"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-800/10 blur-3xl top-1/3 right-1/4 animate-blob animation-delay-2000"></div>
        <div className="absolute w-80 h-80 rounded-full bg-blue-700/10 blur-3xl bottom-10 right-10 animate-blob animation-delay-4000"></div>
      </div>
    </>
  );
}
