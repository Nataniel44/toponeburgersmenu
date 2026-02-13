"use client";

import Image from "next/image";
import { Burger } from "@/app/data";
import { Plus } from "lucide-react";

interface BurgerCardProps {
    burger: Burger;
    onSelect: (burger: Burger) => void;
}

export default function BurgerCard({ burger, onSelect }: BurgerCardProps) {
    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer active:scale-95 active:duration-100"
            onClick={() => onSelect(burger)}
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={burger.image}
                    alt={burger.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                        {burger.name}
                    </h3>
                    <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                        <Plus size={16} strokeWidth={2.5} />
                    </span>
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 flex-grow mb-4">
                    {burger.shortDescription}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        ${burger.price.toLocaleString('es-AR')}
                    </span>

                </div>
            </div>
        </div>
    );
}
