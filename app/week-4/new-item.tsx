"use client";

import { useState } from "react";

// create the main NewItem function
export default function NewItem() {
    // variables for quantity and item count
    const [quantity, setQuantity] = useState(1);
    const [itemCount, setItemCount] = useState(0);

    // arrow function for incrementing items
    const increment = () => {
        // if the the current quantity is less than 20, then increase it by 1
        if (quantity < 20) setQuantity(quantity + 1)
    };

    // arrow function for decrementing items
    const decrement = () => {
        // if the current quantity is greater than 1, then decrease it by 1
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // arrow funtion for adding the increased or decreased quantity to the total count
    const addToAmount = () => {
        // update the item count using previous value of the item count to the quantity value
        setItemCount((prev) => prev + quantity);
        // reset the quantity input back to 1
        setQuantity(1);
    };

    // arrow function for clearing the current amount of items
    const clearAmount = () => {
        setItemCount(0);
    };

    
    // displaying the functionality of new-item component
    return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-700 max-w-md mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
            Paul's Monkey Business 
        </h2>

        {/* Cart summary */}
        <div className="mb-8 p-5 bg-slate-800 rounded-lg border border-slate-600 shadow-inner text-center">
            <h3 className="text-xl font-semibold text-emerald-400 mb-3">
            Paul's Banana Stand
            </h3>
            <div>
            <span className="text-5xl font-bold text-white block">
                {itemCount}
            </span>
            <span className="text-lg text-slate-300 mt-1 block">
                Banana{itemCount !== 1 ? "s" : ""} 🍌
            </span>
            </div>
        </div>

        {/* Quantity selector */}
        <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-3 bg-slate-800 px-5 py-4 rounded-lg border border-slate-600 w-full max-w-xs">
            <button
                type="button"
                onClick={decrement}
                disabled={quantity <= 1}
                className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-l transition-colors"
            >
                −
            </button>

            <span className="flex-1 text-center text-3xl font-bold font-mono text-emerald-300">
                {quantity}
            </span>

            <button
                type="button"
                onClick={increment}
                disabled={quantity >= 20}
                className="w-14 h-12 text-3xl font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-r transition-colors"
            >
                +
            </button>
            </div>

            <p className="text-sm text-slate-400">
            Allowed range: 1–20
            </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4">
            <button
            onClick={addToAmount}
            className="py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-lg transition-colors shadow-md"
            >
            Add to Banana Stand
            </button>

            {itemCount > 0 && (
            <button
                onClick={clearAmount}
                className="py-3.5 bg-red-700/80 hover:bg-red-600 text-white font-bold text-lg rounded-lg transition-colors shadow-md border border-red-600/50"
            >
                Clear
            </button>
            )}
        </div>
    </div>
    );
}