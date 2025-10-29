export default function ItemCardSkeleton() {
  return (
    <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-3 border border-gray-300 animate-pulse h-28">
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-2 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div>
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
