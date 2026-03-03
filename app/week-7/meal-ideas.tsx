"use client";

import { useState, useEffect } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  ingredient: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.meals || [];
  } catch {
    return [];
  }
}

export default function MealIdeas({ ingredient }: Props) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMealIdeas = async () => {
    if (!ingredient.trim()) {
      setMeals([]);
      return;
    }
    setLoading(true);
    const ideas = await fetchMealIdeas(ingredient);
    setMeals(ideas);
    setLoading(false);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  const displayIngredient = ingredient.trim() || "—";

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-700 max-w-lg mx-auto flex flex-col">
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        🍽️ Meal Ideas
      </h1>

      {ingredient.trim() ? (
        <>
          <p className="text-center mb-5 text-slate-300">
            Ideas with <strong className="text-emerald-300">{displayIngredient}</strong>
          </p>

          {loading ? (
            <p className="text-center text-slate-400">Loading meals...</p>
          ) : meals.length === 0 ? (
            <p className="text-center text-slate-400">No meal ideas found.</p>
          ) : (
            <ul className="space-y-4">
              {meals.slice(0, 8).map((meal) => (
                <li
                  key={meal.idMeal}
                  className="flex gap-4 items-center bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="font-medium text-white">{meal.strMeal}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="text-center text-slate-400">
          Select an item from the list to see meal ideas
        </p>
      )}
    </div>
  );
}