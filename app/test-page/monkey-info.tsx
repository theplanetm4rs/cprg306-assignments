"use client";

import { useState, useEffect } from "react";

type MonkeyDetail = {
  name: string;
  age: number;
  favFood: string;
  species: string;
} | null;

type MonkeyInfoProps = {
  selectedMonkeyId: string | null;
};

export default function MonkeyInfo({ selectedMonkeyId }: MonkeyInfoProps) {
  const [monkey, setMonkey] = useState<MonkeyDetail>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedMonkeyId) {
      setMonkey(null);
      setError(null);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);

    fetch(`/api/monkey/${selectedMonkeyId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Monkey not found" : "Failed to load monkey");
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setMonkey(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedMonkeyId]);

  if (!selectedMonkeyId) {
    return (
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl min-h-[280px] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Monkey Selected</h2>
        <p className="text-slate-400">
          Click on a monkey in the canopy to see
          <br />
          their favorite food and species 🐵
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl min-h-[280px] flex items-center justify-center">
        <p className="text-emerald-400 text-lg animate-pulse">Loading monkey details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl min-h-[280px] flex items-center justify-center text-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  if (!monkey) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
        {monkey.name} 🐒
      </h2>

      <div className="space-y-5">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-600">
          <p className="font-semibold text-emerald-300 mb-1">Favourite Food</p>
          <p className="text-white text-xl">{monkey.favFood}</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg border border-slate-600">
          <p className="font-semibold text-emerald-300 mb-1">Species</p>
          <p className="text-white text-xl">{monkey.species}</p>
        </div>

        <div className="text-center text-slate-500 text-sm pt-4 border-t border-slate-700">
          Age: {monkey.age} years
        </div>
      </div>
    </div>
  );
}