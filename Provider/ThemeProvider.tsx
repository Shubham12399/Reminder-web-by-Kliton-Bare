"use client"

import { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <NextThemeProvider attribute='class' enableSystem>{children}</NextThemeProvider>
    )
}

export default ThemeProvider;