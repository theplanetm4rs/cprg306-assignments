"use client";

import { useState } from "react";

interface NewItemProps {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [buttonTouched, setButtonTouched] = useState(false);

  const increment = () => setQuantity((q) => Math.min(99, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName.length < 2 || category === "") return;

    onAddItem({
      name: trimmedName,
      quantity,
      category,
    });

    // reset
    setName("");
    setQuantity(1);
    setCategory("");
    setButtonTouched(false);
  };

  const isDisabled = name.trim().length < 2 || category === "";

  const categories = [
    "produce",
    "dairy",
    "bakery",
    "meat",
    "frozen foods",
    "canned goods",
    "dry goods",
    "beverages",
    "snacks",
    "household",
    "other",
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-md mx-auto p-6 shadow-xl">
      <h1 className="text-3xl text-center font-semibold text-white mb-5">
        Add New Item 🛒
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-white mb-1">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setButtonTouched(true)}
            placeholder="e.g. avocados"
            className={`w-full px-4 py-3 bg-slate-800 text-white rounded-lg border focus:outline-none focus:border-emerald-500 ${
              buttonTouched && name.trim().length < 2
                ? "border-red-500"
                : "border-slate-600"
            }`}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-white mb-1">Quantity</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity <= 1}
              className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-l transition-colors"
            >
              -
            </button>
            <span className="flex-1 text-center text-3xl font-bold font-mono text-emerald-300">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increment}
              className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 rounded-r transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-white mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`p-3.5 w-full font-bold text-lg rounded-lg transition-colors shadow-md ${
            isDisabled
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
        >
          ✅ Add to Shopping List
        </button>
      </form>
    </div>
  );
}