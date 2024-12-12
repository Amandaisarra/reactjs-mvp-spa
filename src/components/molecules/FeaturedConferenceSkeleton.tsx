export const FeaturedConferenceSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="h-48 w-full md:h-full md:w-48 bg-gray-200" />
        </div>
        <div className="p-8 w-full">
          {/* Category */}
          <div className="w-24 h-5 bg-gray-200 rounded mb-4" />

          {/* Title */}
          <div className="h-8 bg-gray-200 rounded mb-4" />
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-6" />

          {/* Description */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="w-24 h-5 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="w-32 h-5 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Button */}
          <div className="w-40 h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
