import { FileX2 } from "lucide-react";

interface NodataProps {
  title: string;
}

export default function Nodata({ title }: NodataProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-5 text-center text-gray-500 ">
      <div
        className="relative w-full px-6 py-10 rounded-2xl border shadow space-y-4
        border-gray-200 bg-white
        "
      >
        <div className="flex items-center justify-center">
          <FileX2 className="h-10 w-10 text-rose-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 ">No {title} Found</h2>
        <p className="text-sm text-gray-600 ">
          Looks like there are no {title.toLowerCase()} yet. Try adding a new one or check back
          later!
        </p>
      </div>
    </div>
  );
}

export function NodataCustom({ title }: NodataProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-5 text-center text-gray-400 ">
      <div
        className="relative w-full px-6 py-10 rounded-2xl border shadow-lg space-y-4
     bg-gray-100 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center">
          <FileX2 className="h-10 w-10 text-rose-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 ">No {title} Found</h2>
        <p className="text-sm text-gray-700">
          Looks like there are no {title.toLowerCase()} yet. Try adding a new one or check back
          later!
        </p>
      </div>
    </div>
  );
}
