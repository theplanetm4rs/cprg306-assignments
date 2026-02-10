"use client";
import React from "react";
import Image from "next/image";

// define Monkey object and its attributes
export interface Monkey {
    id: string;
    name: string;
    age: number;
    favFood: string;
    photo: string;
}

export default function Monkey(props: Monkey) {
    const { name, age, favFood, photo } = props;
    return (
        <div className="flex gap-5 text-white bg-slate-700 rounded-md max-w-auto px-4 py-2 m-3">
            <div className="flex-col justify-between items-center">
                <h3 className="font-semibold">{name}</h3>
                <p className="font-semibold">Age — {age}</p>
                <p className="font-semibold">Favourite Food — {favFood}</p>
            </div>
            <div> 
                <Image 
                    className="rounded-md"
                    src={photo}
                    alt="monkey photo"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
}