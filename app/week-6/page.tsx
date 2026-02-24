"use client";
import Link from "next/link";
import MonkeyList from "./monkey-list";
import { useState } from "react";
import monkeysData from "./monkeys.json";
import NewMonkey from "./new-monkey"; 

export default function Page() {
  const [monkeys, setMonkeys] = useState(monkeysData);

  const handleAddMonkey = (newMonkey: { name: string; age: number; favFood: string; species: string }) => {
    const monkeyWithId = {
      id: crypto.randomUUID(),
      ...newMonkey,
    };
    setMonkeys(prevMonkeys => [...prevMonkeys, monkeyWithId]);
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="flex flex-row gap-10 items-start">
        <MonkeyList monkeys={monkeys} />
        <NewMonkey onAddMonkey={handleAddMonkey} />
      </div>
      <div className="mt-8">
        <Link 
        className="flex h-12 w-50 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        href="/">Go Back Home</Link>
      </div>
    </main>
  );
}