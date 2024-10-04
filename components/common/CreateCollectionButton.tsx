"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import CreateCollectionSheet from './CreateCollectionSheet';

const CreateCollectionButton = () => {
    const [open, setIsOpen] = useState<boolean>(false);
    const handleOpenChange = (open: boolean) => setIsOpen(open);
    return (
        <>
            <div className=" bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-xl p-[2px] mt-4">
                <Button variant={"outline"} className="w-full border-orange-500  font-semibold dark:bg-neutral-900 rounded-xl" onClick={() => setIsOpen(true)}>Create a Collection</Button>
            </div>
            <CreateCollectionSheet
                open={open}
                onOpenChange={handleOpenChange}
            ></CreateCollectionSheet>
        </>
    )
}

export default CreateCollectionButton;