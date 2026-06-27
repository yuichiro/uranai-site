"use client";

interface AdBannerProps {
  slot?: string;
  className?: string;
  format?: "horizontal" | "rectangle" | "vertical";
}

export default function AdBanner({ className = "", format = "horizontal" }: AdBannerProps) {
  const sizes = {
    horizontal: "h-24 w-full",
    rectangle: "h-64 w-full max-w-sm",
    vertical: "h-96 w-40",
  };

  return (
    <div className={`flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg text-gray-400 text-xs ${sizes[format]} ${className}`}>
      <span>広告スペース (Google AdSense)</span>
    </div>
  );
}
