export default function Loading() {
  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-slate-50 z-100 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-gray-50  border-solid border-4 border-purple-400 border-r-gray-200 animate-spin"></div>
    </div>
  );
}
