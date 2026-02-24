"use client";

import { useState, useMemo } from "react";
import Monkey from "./monkey";

export default function MonkeyList({ monkeys }: { monkeys: { id: string; name: string; age: number; favFood: string; species: string }[] }) {
    // use sortBy for sorting preference of the user
    const [sortBy, setSortBy] = useState("name");
    // view mode: list or grouped
    const [viewMode, setViewMode] = useState<'list' | 'group'>("list");

    // sort monkeys by name or species based on sortBy state
    let sortedMonkeys = [...monkeys];
        if (sortBy === "name") {
            sortedMonkeys.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "species") {
            sortedMonkeys.sort((a, b) => a.species.localeCompare(b.species));
        }
    
    // grouped map keyed by sortBy value (either name or species)
    const grouped = useMemo(() => {
        const map: Record<string, typeof monkeys> = {};
        sortedMonkeys.forEach((m) => {
            const groupKey = sortBy === "name" ? m.name : m.species;
            if (!map[groupKey]) map[groupKey] = [];
            map[groupKey].push(m);
        });
        return map;
    }, [sortedMonkeys, sortBy]);
    return (
        <div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-700 max-w-lg mx-auto items-center flex-col">
			<div className="flex-col items-center">
				<h1 className="text-3xl font-bold text-white text-center mb-6"> 🌴 Monkey Canopy 🐵 </h1>
				<p className="text-center mb-6">catalog of the many monkeys that live in the canopy!</p>
			</div>
            <div className="flex gap-4 justify-center pb-5">
                <button
                    onClick={() => setSortBy("name")}
                    className="p-3.5 bg-[#414c50] hover:bg-[#262d31] text-white font-bold text-lg rounded-lg transition-colors shadow-md"
                >
                    Sort by Name
                </button>
                <button
                    onClick={() => setSortBy("species")}
                    className="p-3.5 bg-[#414c50] hover:bg-[#262d31] text-white font-bold text-lg rounded-lg transition-colors shadow-md"
                >
                    Sort by Species
                </button>
				<button
					onClick={() => setViewMode((v) => (v === "group" ? "list" : "group"))}
					className="p-3.5 bg-[#414c50] hover:bg-[#262d31] text-white font-bold text-lg rounded-lg transition-colors shadow-md"
				>
					{viewMode === "group" ? "Show List of Monkeys" : "Group Monkeys"}
				</button>
            </div>

            <ul className="space-y-3">
                {viewMode === "list" ? (
                    sortedMonkeys.map((monkey) => (
                        <Monkey
                            key={monkey.id}
                            id={monkey.id}
                            name={monkey.name}
                            age={monkey.age}
                            favFood={monkey.favFood}
                            species={monkey.species}
                        />
                    ))
                ) : (
                    Object.entries(grouped).map(([groupKey, groupedMonkeys]) => (
                        <div key={groupKey} className="mb-6">
                            <h2 className="text-xl font-bold text-yellow-400 mb-3 border-b border-slate-600 pb-2">
                                {sortBy === "name" ? "🐵 " : "🐒 "}{groupKey}
                            </h2>
                            <ul className="space-y-2 ml-4">
                                {groupedMonkeys.map((monkey) => (
                                    <Monkey
                                        key={monkey.id}
                                        id={monkey.id}
                                        name={monkey.name}
                                        age={monkey.age}
                                        favFood={monkey.favFood}
                                        species={monkey.species}
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
