"use client";

import { useState, useMemo } from "react";
import Monkey from "./monkey";

type MonkeyListProps = {
  monkeys: {
    id: string;
    name: string;
    age: number;
    favFood: string;
    species: string;
  }[];
  onMonkeySelect: (monkey: {
    id: string;
    name: string;
    age: number;
    favFood: string;
    species: string;
  }) => void;
};

export default function MonkeyList({ monkeys, onMonkeySelect }: MonkeyListProps) {
  const [sortBy, setSortBy] = useState<"name" | "species">("name");
  const [viewMode, setViewMode] = useState<"list" | "group">("list");

  let sortedMonkeys = [...monkeys];
  if (sortBy === "name") {
    sortedMonkeys.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedMonkeys.sort((a, b) => a.species.localeCompare(b.species));
  }

  const grouped = useMemo(() => {
    const map: Record<string, typeof monkeys> = {};
    sortedMonkeys.forEach((m) => {
      const key = sortBy === "name" ? m.name : m.species;
      if (!map[key]) map[key] = [];
      map[key].push(m);
    });
    return map;
  }, [sortedMonkeys, sortBy]);

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-700 max-w-lg w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">🌴 List of Monkeys 🐵</h1>
        <p className="text-slate-400 mt-2">catalog of the many monkeys that live in the canopy!</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => setSortBy("name")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
            sortBy === "name" ? "bg-emerald-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-white"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("species")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
            sortBy === "species" ? "bg-emerald-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-white"
          }`}
        >
          Sort by Species
        </button>
        <button
          onClick={() => setViewMode(viewMode === "group" ? "list" : "group")}
          className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
        >
          {viewMode === "group" ? "Show List" : "Group Monkeys"}
        </button>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-2">
          {sortedMonkeys.map((monkey) => (
            <Monkey key={monkey.id} {...monkey} onSelect={onMonkeySelect} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([key, group]) => (
            <div key={key}>
              <h2 className="text-xl font-bold text-yellow-400 mb-3 border-b border-slate-700 pb-2">
                {sortBy === "name" ? "🐵 " : "🐒 "}{key}
              </h2>
              <div className="space-y-2 ml-3">
                {group.map((monkey) => (
                  <Monkey key={monkey.id} {...monkey} onSelect={onMonkeySelect} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}