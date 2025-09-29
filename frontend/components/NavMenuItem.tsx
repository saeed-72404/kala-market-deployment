"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Category } from "@/types/category";

const navMenuTriggerVariants = cva(
    "px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none text-right"
);


export default function NavMenuItem({
    title,
    categories,
}: {
    title: string;
    categories?: Category[];
}) {
    const hasSubmenu = categories && categories.length > 0;

    return (
        <NavigationMenu.Item>
            {hasSubmenu ? (
                <NavigationMenu.Trigger
                    className={cn(navMenuTriggerVariants(), "cursor-pointer")}
                >
                    {title}
                </NavigationMenu.Trigger>
            ) : (
                <NavigationMenu.Link asChild>
                    <Link href="#" className={cn(navMenuTriggerVariants())}>
                        {title}
                    </Link>
                </NavigationMenu.Link>
            )}

            {hasSubmenu && (
                <NavigationMenu.Content className="p-4">
                    <ul className="grid grid-cols-3 gap-4 min-w-[400px] text-right">
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    href={`/category/${cat.id}`}
                                    className="block text-sm font-medium text-gray-800 hover:text-blue-600"
                                >
                                    {cat.name}
                                </Link>

                                {/* زیر دسته‌ها */}
                                {(cat.subcategories?.length ?? 0) > 0 && (
                                    <ul className="mt-2 space-y-1 pl-4 border-l border-gray-200">
                                        {cat.subcategories?.map((sub) => (
                                            <li key={sub.id}>
                                                <Link
                                                    href={`/category/${sub.id}`}
                                                    className="block text-sm text-gray-600 hover:text-blue-500"
                                                >
                                                    {sub.name}
                                                </Link>

                                                {/* زیر زیر دسته‌ها */}
                                                {(cat.subcategories ?? []).length > 0 && (
                                                    <ul className="mt-1 space-y-1 pl-4 border-l border-gray-300">
                                                        {(cat.subcategories ?? []).map((subSub) => (
                                                            <li key={subSub.id}>
                                                                <Link
                                                                    href={`/category/${subSub.id}`}
                                                                    className="block text-sm text-gray-500 hover:text-blue-400"
                                                                >
                                                                    {subSub.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </NavigationMenu.Content>
            )}

        </NavigationMenu.Item>
    );
}
