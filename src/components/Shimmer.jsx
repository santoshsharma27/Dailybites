const Shimmer = () => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="flex w-full animate-pulse flex-col overflow-hidden rounded-xl bg-white shadow-sm"
        >
          {/* Image Placeholder */}
          <div className="aspect-[4/3] w-full bg-gray-300" />

          {/* Content Placeholder */}
          <div className="flex flex-1 flex-col px-4 py-3">
            {/* Title */}
            <div className="h-5 w-3/4 rounded-md bg-gray-300" />

            {/* Rating + Time */}
            <div className="mt-3 flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-300" />
              <div className="h-4 w-10 rounded-md bg-gray-300" />
              <div className="h-4 w-16 rounded-md bg-gray-300" />
            </div>

            {/* Cuisine */}
            <div className="mt-3 h-4 w-full rounded-md bg-gray-300" />
            <div className="mt-2 h-4 w-2/3 rounded-md bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
