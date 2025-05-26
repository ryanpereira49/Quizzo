import { useEffect, useState } from "react";

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 7000; // 7 seconds
    const interval = 100;  // update every 100ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="h-4 glassmorph rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-sm text-white mt-2">{Math.round(progress)}%</p>
    </div>
  );
}
