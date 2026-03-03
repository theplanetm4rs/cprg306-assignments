"use client";

import { useState } from "react";
import Link from "next/link";
import monkeysData from "./monkeys.json";
import MonkeyList from "./monkey-list";
import NewMonkey from "./new-monkey";
import MonkeyInfo from "./monkey-info";

export default function MonkeyCanopyPage() {
  const [monkeys, setMonkeys] = useState(monkeysData);
  const [selectedMonkeyId, setSelectedMonkeyId] = useState<string | null>(null);

  const handleAddMonkey = (newMonkeyData: {
    name: string;
    age: number;
    favFood: string;
    species: string;
  }) => {
    const newMonkey = {
      id: crypto.randomUUID(),
      ...newMonkeyData,
    };
    setMonkeys((prev) => [...prev, newMonkey]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 text-center mb-10">
          Monkey Canopy 🐵🌴
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-3/5">
            <MonkeyList
              monkeys={monkeys}
              onMonkeySelect={(monkey) => setSelectedMonkeyId(monkey.id)}
            />
          </div>

          <div className="lg:w-2/5 space-y-8">
            <NewMonkey onAddMonkey={handleAddMonkey} />
            <MonkeyInfo selectedMonkeyId={selectedMonkeyId} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full font-medium transition-colors"
          >
            ← Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}