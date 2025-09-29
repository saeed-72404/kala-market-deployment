"use client";

import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NavMenuItem from "./NavMenuItem";
import { Category } from "@/types/category";

export default function MegaMenu({ categories }: { categories: Category[] }) {
    return (
        <NavigationMenu.Root dir="rtl" className="relative z-50">
            <NavigationMenu.List className="flex gap-6">
                {categories.map((cat) => (
                    <NavMenuItem
                        key={cat.id}
                        title={cat.name}
                        categories={cat.subcategories?.length ? cat.subcategories : []}
                    />
                ))}
            </NavigationMenu.List>

            {/* این بخش باعث میشه Radix مدیریت نمایش رو انجام بده */}
            <NavigationMenu.Viewport
                className="absolute right-0 top-full w-full m-2 bg-white shadow-lg border border-gray-200 rounded-lg"
            />
        </NavigationMenu.Root>
    );
}
