"use client";

import { useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function ShoppingListPage() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    const itemWithId = {
      ...newItem,
      id: crypto.randomUUID(),
    };
    setItems((prev) => [...prev, itemWithId]);
  };

  const handleItemSelect = (item: { name: string }) => {
    // Clean the name for the API (remove quantity, emoji, etc.)
    let cleanName = item.name
      .split(",")[0]
      .replace(/[🍌🥛🥚🍗🍝🧻🍄🥪]/g, "")
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|�[�-�]|�[�-�]|[\u2011-\u26FF])/g, "")
      .trim();

    setSelectedItemName(cleanName);
  };

  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gradient-to-b from-slate-950 to-slate-900 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-10 text-center">
        🛒 Shopping List + Meal Ideas 🍲
      </h1>

      {/* Add New Item */}
      <div className="w-full max-w-2xl mb-10">
        <NewItem onAddItem={handleAddItem} />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl items-start justify-center">
        {/* Shopping List */}
        <div className="w-full lg:w-1/2 max-w-lg">
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Meal Ideas */}
        <div className="w-full lg:w-1/2 max-w-lg">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>

      <div className="mt-12 mb-8">
        <Link
          href="/"
          className="flex h-12 w-60 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 text-white font-semibold transition-colors hover:bg-emerald-600 shadow-lg"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}