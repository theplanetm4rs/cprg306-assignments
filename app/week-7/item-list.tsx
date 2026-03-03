"use client";

import { useState, useMemo } from "react";
import Item, { ItemType } from "./item";

interface Props {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
}

export default function ItemList({ items, onItemSelect }: Props) {
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [viewMode, setViewMode] = useState<"list" | "group">("list");

  let sortedItems = [...items];
  if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  const grouped = useMemo(() => {
    const map: Record<string, ItemType[]> = {};
    sortedItems.forEach((item) => {
      const key = sortBy === "name" ? item.name : item.category;
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [sortedItems, sortBy]);

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-700 max-w-lg mx-auto flex flex-col">
      <div className="flex-col items-center">
        <h1 className="text-3xl font-bold text-white text-center mb-3">
          🛒 Shopping List
        </h1>
        <p className="text-center mb-6 text-slate-300">
          Items we need to buy this week
        </p>
      </div>

      <div className="flex gap-4 justify-center pb-5 flex-wrap">
        <button
          onClick={() => setSortBy("name")}
          className={`p-3.5 text-white font-bold rounded-lg transition-colors shadow-md ${
            sortBy === "name" ? "bg-emerald-700" : "bg-[#414c50] hover:bg-[#262d31]"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`p-3.5 text-white font-bold rounded-lg transition-colors shadow-md ${
            sortBy === "category" ? "bg-emerald-700" : "bg-[#414c50] hover:bg-[#262d31]"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setViewMode((v) => (v === "group" ? "list" : "group"))}
          className="p-3.5 bg-[#414c50] hover:bg-[#262d31] text-white font-bold rounded-lg transition-colors shadow-md"
        >
          {viewMode === "group" ? "Show Flat List" : "Group by Category"}
        </button>
      </div>

      <ul className="space-y-1">
        {viewMode === "list" ? (
          sortedItems.map((item) => (
            <Item
              key={item.id}
              {...item}
              onSelect={onItemSelect}
            />
          ))
        ) : (
          Object.entries(grouped).map(([key, groupItems]) => (
            <div key={key} className="mb-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-2 border-b border-slate-600 pb-1">
                {sortBy === "name" ? "📦 " : "📋 "}{key}
              </h2>
              <ul className="space-y-1 ml-3">
                {groupItems.map((item) => (
                  <Item
                    key={item.id}
                    {...item}
                    onSelect={onItemSelect}
                  />
                ))}
              </ul>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}