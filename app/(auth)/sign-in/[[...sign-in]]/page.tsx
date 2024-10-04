import { SignIn } from "@clerk/nextjs";

export default async function page() {
    return (
        <div className="flex justify-center items-center h-[100dvh]">
            <SignIn></SignIn>
        </div>
    )
}