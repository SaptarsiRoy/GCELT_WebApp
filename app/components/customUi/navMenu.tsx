'use client';

// Global imports
import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

// Local imports
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";



export function NavMenu({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    // Details of Nav bar Routings
    const routes = [
        {
            href: `/`,
            label: 'Students',
            active: pathname === `/`
        },
        {
            href: `/${params.storeId}/faculty`,
            label: 'Faculty',
            active: pathname === `/${params.storeId}/faculty`
        },
        {
            href: `/${params.storeId}/routine`,
            label: 'Routine',
            active: pathname === `/${params.storeId}/routine`
        },
        {
            href: `/${params.storeId}/exams`,
            label: 'Exams',
            active: pathname === `/${params.storeId}/exams`
        }
    ];

    return (
        // It is used to merge the className we passed alomg with classname we include here : cn provided by shadcn ui
        <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
                <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
                    {routes.map((route) => (
                        <NavigationMenuItem key={route.href}>
                        <Link
                            key={route.href}
                            href={route.href}
                            legacyBehavior passHref
                            className={cn("text-sm font-medium transition-colors hover:text-primary",
                                route.active ? "text-black dark:text-white":"text-muted-foreground"
                            )}
                        >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {route.label}
                            </NavigationMenuLink>

                        </Link>
                    </NavigationMenuItem>
                    ))}
                </nav>
            </NavigationMenuList>
        </NavigationMenu>
    )
}