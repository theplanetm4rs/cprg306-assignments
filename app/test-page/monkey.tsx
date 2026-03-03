"use client";
import React from "react";

export interface Monkey {
  id: string;
  name: string;
  age: number;
  favFood: string;
  species: string;
}

type MonkeyProps = Monkey & {
  onSelect?: (monkey: Monkey) => void;
};

export default function Monkey({
  id,
  name,
  age,
  favFood,
  species,
  onSelect,
}: MonkeyProps) {
  const monkey = { id, name, age, favFood, species };

  return (
    <div
      className={`flex gap-5 text-white bg-slate-700 rounded-md px-4 py-3 m-2 justify-between cursor-pointer hover:bg-slate-600 transition-colors ${
        onSelect ? "border-l-4 border-emerald-500/70" : ""
      }`}
      onClick={() => onSelect && onSelect(monkey)}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm">Age — {age}</p>
        <p className="text-sm">Favourite Food — {favFood}</p>
        <p className="text-sm">Species — {species}</p>
      </div>
    </div>
  );
}