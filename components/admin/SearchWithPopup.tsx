import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Icon } from "@iconify/react";

interface SearchItem {
  id: number;
  name: string;
  type: string;
  avatar?: string;
}

interface SearchWithPopupProps {
  data?: SearchItem[];
  onSelect?: (item: SearchItem) => void;
  placeholder?: string;
}

export default function SearchWithPopup({
  data,
  onSelect,
  placeholder = "Search...",
}: SearchWithPopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample data for search results
  const defaultSearchData: SearchItem[] = [
    { id: 1, name: "Mayowa A", type: "user", avatar: "🟢" },
    { id: 2, name: "Mensah John", type: "user", avatar: "🔵" },
    { id: 3, name: "Miriam Kusti", type: "user", avatar: "🟤" },
  ];

  const searchData = data || defaultSearchData;

  // Filter results based on search query
  const filteredResults = searchData.filter((item: SearchItem) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleSelect = (item: SearchItem) => {
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery("");
  };

  return (
    <>
      {/* Search Input Trigger */}
      <div
        className="flex items-center gap-2 bg-white rounded-full max-w-63.5 w-full h-11 px-3 py-2 border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <Icon icon="lucide:search" width="20" height="20" style={{ color: "#36393F" }} />
        <span className="text-sm font-medium text-gray-400 flex-1">
          {placeholder}
        </span>
      </div>

      {/* Modal Overlay with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#21212140] bg-opacity-80 backdrop-blur-xs z-[101] flex items-center justify-center pt-24"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-2xl w-full max-w-xl mx-4 overflow-hidden animate-in fade-in zoom-in duration-200"
          >
            {/* Search Input in Modal */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <Icon icon="lucide:search" width="20" height="20" style={{ color: "#36393F" }} />
              <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                }}
                className="text-sm font-medium text-gray-800 bg-transparent outline-none flex-1"
                style={{ letterSpacing: "-0.14px" }}
              />
              {searchQuery && (
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto p-3">
              {/* Jump to section */}
              {searchQuery && (
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
                    Jump to
                  </div>
                  <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left transition-colors">
                    <Icon icon="lucide:search" width="20" height="20" style={{ color: "#36393F" }} />
                    <span className="text-sm font-medium text-gray-700">
                      "{searchQuery}"
                    </span>
                  </button>
                </div>
              )}

              {/* Results section */}
              {filteredResults.length > 0 ? (
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
                    Results
                  </div>
                  {filteredResults.map((item: SearchItem) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-lg text-left transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-semibold">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No results found for "{searchQuery}"
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Start typing to search...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}