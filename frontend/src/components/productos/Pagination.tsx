import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [goToPage, setGoToPage] = useState("");

  if (totalPages <= 1) return null;

  // Lógica para saltar a página específica
  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(goToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setGoToPage(""); // Limpiamos el input después de saltar
    }
  };

  // Lógica de números visibles (la misma de antes)
  const getPages = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12 mb-12">
      {/* 🔢 BOTONES DE NAVEGACIÓN */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:border-[#002B61] hover:text-[#002B61] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 hover:shadow-md group"
        >
          <svg
            className="w-5 h-5 text-[#002B61] group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          {getPages().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(Number(page))}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-lg font-bold transition-all duration-300 text-sm md:text-base cursor-pointer hover:scale-110 active:scale-95 ${
                    currentPage === page
                      ? "bg-[#002B61] text-white shadow-xl scale-105"
                      : "text-[#002B61] hover:bg-white hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37]/30 hover:shadow-md"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:border-[#002B61] hover:text-[#002B61] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 hover:shadow-md group"
        >
          <svg
            className="w-5 h-5 text-[#002B61] group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* 🚀 SALTO DIRECTO (INPUT) */}
      <form
        onSubmit={handleJump}
        className="flex items-center gap-3 pl-6 border-l border-gray-200"
      >
        <span className="text-sm text-gray-500 whitespace-nowrap">
          Ir a la página
        </span>
        <div className="relative">
          <input
            type="text"
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value.replace(/\D/g, ""))} // Solo números
            className="w-16 h-10 px-2 text-center border border-gray-200 rounded-lg text-[#002B61] font-bold focus:outline-none focus:ring-2 focus:ring-[#002B61]/20 focus:border-[#002B61]"
            placeholder="1..."
          />
        </div>
        <button
          type="submit"
          className="h-10 px-6 bg-[#002B61] text-white rounded-lg text-sm font-bold hover:bg-[#D4AF37] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          Ir
        </button>
      </form>
    </div>
  );
};
