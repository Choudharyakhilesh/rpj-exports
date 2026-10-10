import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogCustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const maxPages = 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
        {/* Prev Button */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 bg-transparent hover:bg-primary/25 disabled:text-primary "
          variant="ghost"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        {getPageNumbers().map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`h-8 w-8 p-0 m-1 cursor-pointer ${
              currentPage === pageNumber
                ? "bg-primary text-white"
                : "bg-transparent hover:bg-primary/25 text-white"
            }`}
            variant={currentPage === pageNumber ? "default" : "ghost"}
          >
            {pageNumber}
          </Button>
        ))}

        {/* Ellipsis */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="text-gray-500  px-1">...</span>
        )}

        {/* Next Button */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 bg-transparent hover:bg-primary/25 disabled:text-primary "
          variant="ghost"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-200 ">
        {/* Prev Button */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 bg-transparent hover:bg-gray-300  disabled:text-gray-400 "
          variant="ghost"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Next Button */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 bg-transparent hover:bg-gray-300  disabled:text-gray-400 "
          variant="ghost"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
