"use client";

import { useState } from "react";

// create the main NewItem function
export default function NewItem() {
  // states for quantity, item name, category, and list of items
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Items");
  const [items, setItems] = useState<
    { name: string; category: string; quantity: number }[]
  >([]);

  // increment quantity
  const increment = () => {
    if (quantity < 20) setQuantity(quantity + 1);
  };

  // decrement quantity
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // add item to the stand (combine name + category)
  const addToItems = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert("Oops! Don't forget to add the name of the item 🙉");
      return;
    }

    setItems((prev) => {
      const existing = prev.find(
        (i) => i.name === trimmedName && i.category === category
      );
      if (existing) {
        return prev.map((i) =>
          i.name === trimmedName && i.category === category
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        return [...prev, { name: trimmedName, category, quantity }];
      }
    });

    // reset inputs
    setName("");
    setQuantity(1);
    setCategory("Other"); // reset to default
  };

  // remove a specific item
  const removeItem = (itemName: string, itemCategory: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.name === itemName && i.category === itemCategory))
    );
  };

  // clear entire stand
  const clearItems = () => {
    setItems([]);
  };

  // categories for monkey treats
  const categories = [
    "Fruits 🍌",
    "Leave 🍃",
    "Nuts 🥜",
    "Flowers 🌺",
    "Insects 🪲",
    "Seeds 🌰",
    "Other",
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-700 max-w-md mx-auto">
      <div className="flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Paul's Monkey Business 🐵
        </h2>
      </div>

      {/* Item List */}
      <div className="mb-8 p-5 bg-slate-800 rounded-lg border border-slate-600 shadow-inner">
        <h3 className="text-xl font-semibold text-emerald-400 mb-3 text-center">
            Paul's Yummy Food Stock 🍌
        </h3>
        {items.length === 0 ? (
          <p className="text-center text-slate-300">
            No items currently in Paul's stock
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={`${item.name}-${item.category}`}
                className="flex justify-between items-center text-white px-4 py-2 bg-slate-700 rounded-md"
              >
                <span>
                  {item.name} <span className="text-slate-400">({item.category})</span>{" "}
                  - {item.quantity}
                </span>
                <button
                  onClick={() => removeItem(item.name, item.category)}
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Item name input */}
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
          className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Category selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity selector */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center gap-3 bg-slate-800 px-5 py-4 rounded-lg border border-slate-600 w-full max-w-xs">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity <= 1}
            className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-l transition-colors"
          >
            −
          </button>

          <span className="flex-1 text-center text-3xl font-bold font-mono text-emerald-300">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increment}
            disabled={quantity >= 20}
            className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-r transition-colors"
          >
            +
          </button>
        </div>

        <p className="text-sm text-slate-400">Allowed range: 1–20</p>
        <p className="text-sm text-slate-400">
          (Paul can only hold so many items...after all, he is quite tiny)
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-4">
        <button
          onClick={addToItems}
          className="py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-lg transition-colors shadow-md"
        >
           ✅ Add Item
        </button>

        {items.length > 0 && (
          <button
            onClick={clearItems}
            className="py-3.5 bg-red-700/80 hover:bg-red-600 text-white font-bold text-lg rounded-lg transition-colors shadow-md border border-red-600/50"
          >
            Clear Stand ❌
          </button>
        )}
      </div>
    </div>
  );
}