import { motion } from 'framer-motion';

export const ConferenceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col animate-pulse">
      <div className="h-[240px] relative overflow-hidden rounded-t-lg bg-gray-200" />

      <div className="p-6 flex-1 flex flex-col">
        {/* Category and Price */}
        <div className="flex justify-between mb-3">
          <div className="w-24 h-6 bg-gray-200 rounded-full" />
          <div className="w-20 h-6 bg-gray-200 rounded-full" />
        </div>

        {/* Title */}
        <div className="h-7 bg-gray-200 rounded mb-3" />
        <div className="h-7 w-3/4 bg-gray-200 rounded mb-6" />

        {/* Date and Location */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="w-32 h-5 bg-gray-200 rounded" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="w-40 h-5 bg-gray-200 rounded" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>

        {/* Available Spots */}
        <div className="mt-auto">
          <div className="w-40 h-5 bg-gray-200 rounded mb-4" />
          <div className="w-full h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
