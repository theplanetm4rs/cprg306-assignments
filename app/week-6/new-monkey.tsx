"use client";

import { useState } from "react";

// create function to add a new monkey to the canopy
export default function NewMonkey({ onAddMonkey }: { onAddMonkey: (newMonkey: { name: string; age: number; favFood: string; species: string }) => void }) {
    // use states for monkey attributes: name, age, favFood, and species
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [favFood, setFavFood] = useState("");
    const [species, setSpecies] = useState("");
    // use state for name of the monkey to determine if the button should be disabled
    const [buttonTouched, setButtonTouched] = useState(false);
    
    // increment and decrement functions for age
    const incrementAge = () => {
        if (age < 100) setAge(age + 1);
    };
    const decrementAge = () => {
        if (age > 0) setAge(age - 1);
    };

    // handle input change for name, favFood, and species
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const monkey = {
            name: name.trim(),
            age,
            favFood: favFood.trim(),
            species,
        };
        // Pass the new monkey up to the parent
        onAddMonkey(monkey);

        // Reset form fields
        setName("");
        setAge(0);
        setFavFood("");
        setSpecies("");
        setButtonTouched(false);
    };

    // determine if the button should be disabled (name must be at least 2 characters, age must be greater than 0, and species must be selected)
    const isButtonDisabled = name.trim().length < 2 || age === 0 || species === "";

    // add monkey to the canopy (combine name + species)
    const addToCanopy = () => {
        const trimmedName = name.trim();
        console.log("Adding monkey to canopy:", trimmedName, species);
    };

    // categories for favorite food
    const speciesOptions = [
        "Capuchin", 
        "Macaque", 
        "Squirrel Monkey", 
        "Golden Snub-Nosed", 
        "Spider Monkey", 
        "Cebidae", 
        "Other"
    ];

    return (
        <div className="bg-slate-900 rounded-xl border-slate-700 max-w-md mx-auto p-6 shadow-xl">
            <div className="flex-col items-center">
                {/* Title: Add New Monkey */}
                <h1 className="text-3xl text-center font-semibold text-white mb-4">
                    Add New Monkey 🐵
                </h1>
            </div>
            {/* Form for adding a new monkey */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/*Name*/}
                <div>
                    <label className="block text-white mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setButtonTouched(true)}
                        placeholder="Enter the monkey's name"
                        className={`w-full px-4 py-3 bg-slate-800 text-white rounded-lg border focus:outline-none focus:border-emerald-500 ${buttonTouched && name.trim().length < 2 ? 'border-red-500' : 'border-slate-600'}`}
                    />
                </div>
                {/*Age with increment and decrement buttons*/}
                <div>
                    <label className="block text-white mb-1">Age</label>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={decrementAge}
                            className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-l transition-colors"
                        >
                            -
                        </button>

                        <span className="flex-1 text-center text-3xl font-bold font-mono text-emerald-300">
                            {age}
                        </span>

                        <button
                            type="button"
                            onClick={incrementAge}
                            className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-r transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>
                {/*Favourite Food*/}
                <div>
                    <label className="block text-white mb-1">Favourite Food</label>
                    <input
                        type="text"
                        value={favFood}
                        onChange={(e) => setFavFood(e.target.value)}
                        onBlur={() => setButtonTouched(true)}
                        placeholder="Enter monkey's favourite food"
                        className={`w-full px-4 py-3 bg-slate-800 text-white rounded-lg border focus:outline-none focus:border-emerald-500 ${buttonTouched && favFood.trim().length < 2 ? 'border-red-500' : 'border-slate-600'}`}
                    />
                </div>
                {/* Species Selector */}
                <div>
                    <label className="block text-white mb-1">Species</label>
                    <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500"
                    >
                        <option value="">Select Species</option>
                        {speciesOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add to Canopy Button */}
                <div className="flex flex-col gap-4"> 
                    <button
                        onClick={addToCanopy}
                        disabled={isButtonDisabled}
                        type="submit" 
                        className= "p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-lg transition-colors shadow-md">
                        ✅ Add Monkey to Canopy 🐵🌴
                    </button>
                </div>
            </form>
        </div>
    );
}