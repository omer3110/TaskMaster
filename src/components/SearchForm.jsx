import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("title") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchParams({ title: searchTerm });
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchParams]);

  return (
    <Input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
    />
  );
};

export default SearchForm;
