import Navbar from "@/components/common/Navbar";
import ThemeProvider from '@/Provider/ThemeProvider';
import {
    ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <ThemeProvider>
                        <Navbar></Navbar>
                        <div
                            className="
                              flex
                              flex-col
                              max-w-[1240px] 
                              mx-auto
                              justify-normal
                            "
                        >
                            {children}
                            <Toaster></Toaster>
                        </div>
                    </ThemeProvider>

                </body>
            </html>
        </ClerkProvider>
    )
}