interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isPreviousDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        className={`px-4 py-2 text-sm font-body font-light transition-colors border ${
          isPreviousDisabled
            ? "text-foreground/30 border-border-light/30 cursor-not-allowed"
            : "text-foreground/70 hover:text-primary border-border-light hover:border-primary"
        }`}
      >
        Previous
      </button>
      {pageNumbers.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 text-sm font-body transition-colors border ${
              isActive
                ? "font-medium text-primary border-primary"
                : "font-light text-foreground/70 hover:text-primary border-border-light hover:border-primary"
            }`}
          >
            {page}
      </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`px-4 py-2 text-sm font-body font-light transition-colors border ${
          isNextDisabled
            ? "text-foreground/30 border-border-light/30 cursor-not-allowed"
            : "text-foreground/70 hover:text-primary border-border-light hover:border-primary"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
