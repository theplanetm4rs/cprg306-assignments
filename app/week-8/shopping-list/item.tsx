"use client";

import React from "react";

export interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

interface Props extends ItemType {
  onSelect?: (item: ItemType) => void;
}

export default function Item({ id, name, quantity, category, onSelect }: Props) {
  const handleClick = () => {
    if (onSelect) onSelect({ id, name, quantity, category });
  };

  return (
    <li
      onClick={handleClick}
      className="flex gap-5 text-white bg-slate-700 rounded-md max-w-auto px-4 py-2 m-3 justify-between cursor-pointer hover:bg-slate-600 transition-colors"
    >
      <div className="flex-col justify-between items-center">
        <h3 className="font-semibold">
          {name} × {quantity}
        </h3>
        <p className="text-sm text-slate-300">category: {category}</p>
      </div>
    </li>
  );
}