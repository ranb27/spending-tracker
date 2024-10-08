"use client";

const LoadingWave = () => {
  return (
    <div className="absolute right-1/2 top-1/2 translate-x-1/2 translate-y-1/2">
      <div className="w-full h-fit min-h-14 flex justify-center items-end">
        <div className="w-3 h-2 mx-1 bg-black rounded-sm animate-loading-wave" />
        <div className="w-3 h-2 mx-1 bg-black rounded-sm animate-loading-wave [animation-delay:0.1s]" />
        <div className="w-3 h-2 mx-1 bg-black rounded-sm animate-loading-wave [animation-delay:0.2s]" />
      </div>
    </div>
  );
};

export default LoadingWave;
