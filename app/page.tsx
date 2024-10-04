import CollectionCard from "@/components/common/CollectionCard";
import CreateCollectionButton from "@/components/common/CreateCollectionButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma";
import SadFace from "@/public/svgIcons/SadFace";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
    const user = await currentUser();
    if (!user) {
        return (
            <div className="max-w-[600px] left-1/2 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-y-4">
                <h1 className="text-xl font-semibold leading-tight">User not found or not Logged In </h1>
                <p className="text-sm text-gray-600 leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur voluptas, voluptates aliquam atque ipsum ea quae dolor odit similique. Vero.</p>
                <Link href={"/sign-in"}>Login</Link>
            </div>
        )
    }
    return (
        <section className="px-8 max-w-[1250px] mx-auto py-8 w-full">
            <Suspense fallback={<WelcomeMsgFallback />}>
                <WelcomeMessage></WelcomeMessage>
            </Suspense>
            <CollectionList></CollectionList>
        </section>
    );
}

async function WelcomeMessage() {
    const user = await currentUser();
    return (
        <div>
            <h1 className="text-3xl font-bold">Good Morning, <span className="capitalize">{user?.firstName} {user?.lastName}</span></h1>
        </div>
    )
}

function WelcomeMsgFallback() {
    return (
        <div>
            <div className="bg-gray-200 rounded-xl max-w-[670px] h-[80px]"></div>
        </div>
    )
}

async function CollectionList() {
    const user = await currentUser();
    const collections = await prisma.collection.findMany({
        include: {
            tasks: true,
        },
        where: {
            userId: user?.id
        }
    });
    // console.log("Collections :: ", collections);
    if (collections.length === 0) {
        return (
            <div className="flex flex-col gap-5 max-w-[640px] mx-auto my-8 sm:my-12 md:my-16">
                <CreateCollectionButton></CreateCollectionButton>
                <Alert>
                    <SadFace />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        No Collection has been created yet , Create collection to continue.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }
    return (
        <>
            <CreateCollectionButton></CreateCollectionButton>
            <div className="max-w-[1240px] mx-auto my-4 flex flex-col gap-5">
                {
                    collections.map(collection => <CollectionCard key={collection.id} collection={collection} />)
                }
            </div>
        </>
    )
}
