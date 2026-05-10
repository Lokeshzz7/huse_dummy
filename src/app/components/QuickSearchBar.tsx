import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

interface QuickSearchBarProps {
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}

export function QuickSearchBar({ 
  placeholder = "Search students, jobs, startups...",
  className = "",
  showSuggestions = false
}: QuickSearchBarProps) {
  const navigate = useNavigate();
  const { setSearchQuery, popularSearches } = useSearch();
  const [localQuery, setLocalQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      navigate('/search');
    } else {
      navigate('/search');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalQuery(suggestion);
    setSearchQuery(suggestion);
    navigate('/search');
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && isFocused && !localQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl shadow-xl z-50">
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
            <TrendingUp size={12} />
            <span>Popular Searches</span>
          </div>
          <div className="space-y-1">
            {popularSearches.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
