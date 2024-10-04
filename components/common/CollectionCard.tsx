"use client"
import { deleteCollection } from '@/actions/collection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/hooks/use-toast';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import PlusIcon from '@/public/svgIcons/PlusIcon';
import { Collection, Task } from '@prisma/client';
import { CaretDownIcon, CaretUpIcon, TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { MenubarSeparator } from '../ui/menubar';
import { Progress } from '../ui/progress';
import CreateTaskModal from './CreateTaskModal';
import TaskCard from './TaskCard';
interface Props {
    collection: Collection & {
        tasks: Task[]
    }
}
const CollectionCard = ({ collection }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const tasks = collection.tasks;
    const [open, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const handleCollectionDelete = async () => {
        try {
            await deleteCollection(collection.id);
            router.refresh();
            toast({
                title: "Success",
                description: "Deleted Collection",
            });
        } catch (err) {
            console.log(err);
            toast({
                title: "Error",
                description: "Can't delete Collection",
                variant: "destructive"
            });
        }

    }

    const taskDone = useMemo(() => {
        return collection.tasks.filter(task => task.done).length;
    }, [collection.tasks])
    const totalTasks = collection.tasks.length;
    const openChangeModal = (open: boolean) => setShowCreateModal(open);
    const progress = totalTasks === 0 ? 0 : (taskDone / totalTasks) * 100;
    return (
        <>
            <CreateTaskModal
                open={showCreateModal}
                setOpen={openChangeModal}
                collection={collection}
            />
            <Collapsible open={open} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className={cn('w-full rounded-tl-lg rounded-tr-lg')} asChild>
                    <Button variant={"ghost"} className={cn("w-full rounded-bl-none rounded-br-none h-12 justify-between px-4 ", CollectionColors[collection.color as CollectionColor], !open && "rounded-lg")}>
                        <span className='font-bold text-white capitalize md:text-lg'>
                            {collection.name}
                        </span>
                        {!open && <span className='text-white float-right ml-5'>
                            <CaretDownIcon className='w-6 h-6'></CaretDownIcon>
                        </span>}
                        {open && <span className='text-white float-right ml-5'>
                            <CaretUpIcon className='w-6 h-6'></CaretUpIcon>
                        </span>}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='flex flex-col gap-3 dark:bg-neutral-900 shadow-lg rounded-bl-xl rounded-br-xl'>
                    <Progress className={cn('rounded-none', CollectionColors[collection.color as CollectionColor])} value={progress} ></Progress>
                    {(tasks.length === 0) && <Button
                        variant={"ghost"}
                        className='flex gap-1 p-8 py-12 rounded-none'
                        onClick={() => setShowCreateModal(true)}
                    >There are no task yet: <span className={cn("text-transparent bg-clip-text", CollectionColors[collection.color as CollectionColor])}>Create One</span></Button>}
                    {(tasks.length > 0) && <>
                        <div className='px-4'>
                            {
                                tasks?.map((task) => <TaskCard key={task.id} task={task} ></TaskCard>)
                            }
                        </div></>}
                    <footer className='w-full pb-1'>
                        <MenubarSeparator></MenubarSeparator>
                        <div className='flex justify-between items-center pr-2'>
                            <span className='text-xs text-neutral-500 dark:text-gray-500 px-4 py-3'>Created At {collection.createdAt.toDateString()}</span>
                            {
                                isLoading && <p className='text-sm text-gray-900 dark:text-gray-500 mr-1'>Deleting....</p>
                            }
                            {
                                !isLoading && <div className='flex gap-x-2 items-center'>
                                    <Button variant={"outline"} size={"icon"} onClick={() => setShowCreateModal(true)}><PlusIcon></PlusIcon></Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild >
                                            <Button variant={"ghost"} size={"icon"}><TrashIcon ></TrashIcon>
                                            </Button>

                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
                                            <AlertDialogDescription>This will not undone. This task will permanentely deleted your collection and all the task inside it.   </AlertDialogDescription>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => startTransition(handleCollectionDelete)}>Proceed</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            }
                        </div>
                    </footer>
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}

export default CollectionCard;