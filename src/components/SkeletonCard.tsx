export default function SkeletonCard() {
  return (
    <div className="card-base flex flex-col h-full overflow-hidden">
      <div className="skeleton w-full h-48" />
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-9 w-full rounded-xl mt-2" />
      </div>
    </div>
  );
}
