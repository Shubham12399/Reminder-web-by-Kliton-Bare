"use client"
import { Tabs, TabsList } from '@radix-ui/react-tabs';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    console.log(theme)
    // useEffect only run on client, so we can safely show the UI in this trick we are avoiding hydration error
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted])

    if (!mounted) return null;
    return (
        <Tabs className={cn('flex gap-x-2 py-1 rounded-full text-sm bg-gray-100 px-1', theme === "dark" && "bg-slate-900")}>
            <TabsList onClick={() => setTheme("light")} className={cn('text-gray-900 text-sm rounded-full px-1 py-1 cursor-pointer', theme === "light" && "bg-white  text-gray-900", theme === "dark" && "text-white")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 512 512"><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48m0 320v48m147.08-355.08-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48m-320 0H48m355.08 147.08-33.94-33.94M142.86 142.86l-33.94-33.94" /><circle cx="256" cy="256" r="80" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" /></svg>
            </TabsList>
            <TabsList onClick={() => setTheme("dark")} className={cn(' text-gray-900 text-sm rounded-full px-1 py-1 cursor-pointer', theme === "dark" && "bg-slate-700 text-gray-900", theme === "dark" && "text-white")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="0" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" stroke="none" d="M2.9.5a.4.4 0 0 0-.8 0v.6h-.6a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 1 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zm3 3a.4.4 0 1 0-.8 0v.6h-.6a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 1 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zm-4 3a.4.4 0 1 0-.8 0v.6H.5a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 0 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zM8.544.982l-.298-.04c-.213-.024-.34.224-.217.4q.211.305.389.632A6.602 6.602 0 0 1 2.96 11.69c-.215.012-.334.264-.184.417q.103.105.21.206l.072.066.26.226.188.148.121.09.187.131.176.115q.18.115.37.217l.264.135.26.12.303.122.244.086a6.6 6.6 0 0 0 1.103.26l.317.04.267.02q.19.011.384.011a6.6 6.6 0 0 0 6.56-7.339l-.038-.277a6.6 6.6 0 0 0-.384-1.415l-.113-.268-.077-.166-.074-.148a6.6 6.6 0 0 0-.546-.883l-.153-.2-.199-.24-.163-.18-.12-.124-.16-.158-.223-.2-.32-.26-.245-.177-.292-.19-.321-.186-.328-.165-.113-.052-.24-.101-.276-.104-.252-.082-.325-.09-.265-.06zm1.86 4.318a7.6 7.6 0 0 0-.572-2.894 5.601 5.601 0 1 1-4.748 10.146 7.6 7.6 0 0 0 3.66-2.51.749.749 0 0 0 1.355-.442.75.75 0 0 0-.584-.732q.093-.174.178-.355A1.25 1.25 0 1 0 10.35 6.2q.052-.442.052-.9" clip-rule="evenodd" /></svg>
            </TabsList>
            
        </Tabs>
    )
}

export default ThemeSwitcher;