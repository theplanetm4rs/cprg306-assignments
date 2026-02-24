"use client";
import { useState, useMemo } from "react";
import Monkey from "./monkey";
import type { Monkey as MonkeyType } from "./monkey";
import monkeys from "./monkeys.json";
import Image from "next/image";

function MonkeyList() {

	// useStates
	const [list, setList] = useState<MonkeyType[]>(monkeys as MonkeyType[]);
	// use sortBy for sorting preference of the user
	const [sortBy, setSortBy] = useState<string>("name");
	// view mode: list or grouped by favFood
	const [viewMode, setViewMode] = useState<'list' | 'group'>("list");
    
    // sort function
	const sortedList = [...list].sort((a, b) => {
		if (sortBy === "name") return a.name.localeCompare(b.name);
		if (sortBy === "favFood") return a.favFood.localeCompare(b.favFood);
		return 0;
	});

	// grouped map keyed by favFood (uses sortedList to preserve ordering)
	const grouped = useMemo(() => {
		const map: Record<string, MonkeyType[]> = {};
		sortedList.forEach((m) => {
			if (!map[m.favFood]) map[m.favFood] = [];
			map[m.favFood].push(m);
		});
		return map;
	}, [sortedList]);

	return (
		<div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-700 max-w-lg mx-auto items-center flex-col">
			<div className="flex-col items-center">
				<h1 className="text-3xl font-bold text-white text-center mb-6"> 🌴 Monkey Canopy 🐵 </h1>
				<p className="text-center mb-6">catalog of the many monkeys that live in the canopy and their favourite foods!</p>
			</div>
			<div className="flex gap-4 justify-center pb-5">
				<button
					onClick={() => setSortBy("name")}
					className="p-3.5 bg-[#414c50] hover:bg-[#262d31] text-white font-bold text-lg rounded-lg transition-colors shadow-md"
				>
					Sort by name
				</button>
				<button
					onClick={() => setSortBy("favFood")}
					className="p-3.5 bg-[#414c50] hover:bg-[#262d31] text-white font-bold text-lg rounded-lg transition-colors shadow-md"
				>
					Sort by fav food
				</button>
				<button
					onClick={() => setViewMode((v) => (v === "group" ? "list" : "group"))}
					className="p-3.5 bg-[#414c50] hover:bg-[#262d31] text-white font-bold text-lg rounded-lg transition-colors shadow-md"
				>
					{viewMode === "group" ? "Show List of Monkeys" : "Group Monkeys"}
				</button>
			</div>
			{viewMode === "list" ? (
				sortedList.map((m: MonkeyType) => (
					<Monkey key={m.id} id={m.id} name={m.name} age={m.age} favFood={m.favFood} photo={m.photo} />
				))
			) : (
				Object.entries(grouped).map(([food, items]) => (
					<div key={food} className="mb-4">
						<h2 className="text-xl font-semibold text-white mt-4 mb-2">{food}</h2>
						{items.map((m) => (
							<Monkey key={m.id} id={m.id} name={m.name} age={m.age} favFood={m.favFood} photo={m.photo} />
						))}
					</div>
				))
			)}
		</div>
	);
}

export default MonkeyList;