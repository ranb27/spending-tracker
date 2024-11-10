"use client";

const LoadingWave = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-base-100 rounded-lg p-4">
      <div className="w-full h-fit min-h-14 flex justify-center items-end">
        <div className="w-3 h-2 mx-1 bg-info rounded-sm animate-loading-wave" />
        <div className="w-3 h-2 mx-1 bg-info rounded-sm animate-loading-wave [animation-delay:0.1s]" />
        <div className="w-3 h-2 mx-1 bg-info rounded-sm animate-loading-wave [animation-delay:0.2s]" />
      </div>
    </div>
  );
};

export default LoadingWave;
