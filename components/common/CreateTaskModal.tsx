"use client"
import { createTask } from '@/actions/task';
import { toast } from '@/hooks/use-toast';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { createTaskSchema, createTaskSchemaType } from '@/schema/createTask';
import { zodResolver } from '@hookform/resolvers/zod';
import { Collection } from '@prisma/client';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';

interface Props {
    open: boolean,
    setOpen: (open: boolean) => void //React.Dispatch<SetStateAction<boolean>>,
    , collection: Collection
}
const CreateTaskModal = ({ open, setOpen, collection }: Props) => {
    const router = useRouter();
    const [popoverOpen, setPopoverOpen] = useState(false);
    const form = useForm<createTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            collectionId: collection.id,
        }
    });

    const onSubmit = async (data: createTaskSchemaType) => {
        try {
            await createTask(data);
            toast({
                title: "Success",
                description: "Task created successfully"
            });
            form.reset();
            setOpen(false);
            router.refresh();
        } catch (err) {
            console.log(err);
            toast({
                title: "Failed",
                description: (err as Error).message,
                variant: "destructive"
            });
            setOpen(false);
        }
    }
    return (

        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='flex gap-2'>Add Task To collection:  <span className={cn("text-transparent bg-clip-text p-[2px] font-bold", CollectionColors[collection.color as CollectionColor])}>{collection.name}</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Add task to your collection . you can add many task as you want
                </DialogDescription>
                <div>
                    <Form {...form}>
                        <form className='flex flex-col space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (<FormItem>
                                    <FormLabel>
                                        Content
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={5}
                                            placeholder='Task Content here'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>)}
                            >

                            </FormField>

                            {/* Expires At */}
                            <FormField
                                control={form.control}
                                name='expiresAt'
                                render={({ field }) => (<FormItem>
                                    <FormLabel>
                                        Expires At
                                    </FormLabel>
                                    <FormDescription>
                                        When should this task expires ?
                                    </FormDescription>
                                    <FormControl>
                                        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={cn("justify-start text-left font-normal w-full", !field.value && "text-muted-foreground")}>
                                                    <CalendarIcon className='w-4 h-4 mr-2'></CalendarIcon>
                                                    {field.value && format(field.value, "PPP")}
                                                    {!field.value && <span>No Expirations</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={(e) => {
                                                        field.onChange(e);
                                                        setPopoverOpen(false)
                                                    }}
                                                    initialFocus
                                                ></Calendar>
                                                <h1>Hello</h1>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>)}
                            >

                            </FormField>
                        </form>
                    </Form>
                </div>
                <Button
                    disabled={form.formState.isSubmitting}
                    className={cn("w-full dark:text-white text-white", CollectionColors[collection.color as CollectionColor])}
                    onClick={form.handleSubmit(onSubmit)}
                >Confirm
                    {
                        form.formState.isSubmitting && <ReloadIcon className='animate-spin h-6 w-6 ml-3'></ReloadIcon>
                    }</Button>
            </DialogContent>
        </Dialog>

    )
}

export default CreateTaskModal;