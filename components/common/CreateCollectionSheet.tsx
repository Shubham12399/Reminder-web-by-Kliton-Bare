
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from 'react-hook-form';
import { createCollectionSchema, createCollectionSchemaType } from '@/schema/createCollection';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { MenubarSeparator } from '../ui/menubar';
import { createCollection } from '@/actions/collection';
import { toast } from '@/hooks/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void
}
const CreateCollectionSheet = ({ open, onOpenChange }: Props) => {
    const router = useRouter();
    const form = useForm<createCollectionSchemaType>({
        defaultValues: {},
        resolver: zodResolver(createCollectionSchema)
    });
    const onSubmit = async (data: createCollectionSchemaType) => {
        try {
            await createCollection(data);
            // close the sheet
            openChangeWrapper(false);
            router.refresh();
            toast({
                title: "Collection Create Successfully!",
                description: "Your Collection has been created.",
            })
        } catch {
            toast({
                title: "Failed to create Collection",
                description: "Something went wrong, Please try again later.",
                variant: "destructive"
            })
        }
    }
    const openChangeWrapper = (open: boolean) => {
        form.reset();
        onOpenChange(open);
    }
    return (
        <Sheet open={open} onOpenChange={openChangeWrapper} >
            <SheetContent>
                <SheetHeader className='flex flex-col items-center gap-2'>
                    <SheetTitle>Create Collection</SheetTitle>
                    <SheetDescription>
                        Collections are way to group your task.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Personal' {...field}></Input>
                                </FormControl>
                                <FormDescription>Collection Name</FormDescription>
                                <FormMessage />
                            </FormItem>}
                        />
                        <br />
                        <FormField
                            control={form.control}
                            name='color'
                            render={({ field }) => <FormItem>
                                <FormLabel>Select Color</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(color) => field.onChange(color)}>
                                        <SelectTrigger className={cn("w-full h-8 dark:text-white", CollectionColors[field.value as CollectionColor], CollectionColors[field.value as CollectionColor] && "text-white")}>
                                            <SelectValue placeholder="Color" ></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className='w-full'>
                                            {
                                                Object.keys(CollectionColors).map(color => <SelectItem key={color} value={color} className={cn(`w-full h-8 rounded-md my-1 text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white`, CollectionColors[color as CollectionColor])}>{color}</SelectItem>)
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>Select a color for your collection</FormDescription>
                            </FormItem>}
                        />
                    </form>
                </Form>
                <MenubarSeparator className="my-4"></MenubarSeparator>
                <Button className={cn('w-full', form.watch("color") && CollectionColors[form.getValues("color") as CollectionColor])} onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting}>Confirm
                    {form.formState.isSubmitting && <ReloadIcon className='ml-2 animate-spin h-4 w-4'></ReloadIcon>}
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSheet;