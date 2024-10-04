"use client"
import { setTaskToDone } from '@/actions/task';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface Props {
    task: Task
}

function getExpirationColor(expiresAt: Date): string {
    const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;
    console.log(days);
    if (days < 0) return "text-gray-500 dark:text-gray-300 "
    if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
    if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
    return "text-green-500 dark:text-green-400";
}
const TaskCard = ({ task }: Props) => {
    const [isLoading, startTransition] = useTransition();
    const router = useRouter();
    return (
        <div className='my-1 flex items-center'>
            <Checkbox
                className='w-4 h-4 rounded-2xl cursor-pointer'
                checked={task.done}
                id={task.id.toString()}
                disabled={task.done || isLoading}
                onCheckedChange={() => {
                    startTransition(async function () {
                        await setTaskToDone(task.id);
                        router.refresh();
                    })
                }}
            ></Checkbox>
            <Label className={cn('flex gap-x-2 items-center py-2 pl-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white', task.done && "line-through")} htmlFor={task.id.toString()}>
                <div className='flex items-start pl-3 flex-grow flex-col gap-2'>
                    <h3 className='text-gray-700 dark:text-gray-50 cursor-pointer'>{task.content}</h3>
                    {
                        task.expiresAt && <p className={cn("text-xs text-neutral-500 dark:text-neutral-400", getExpirationColor(task.expiresAt))}
                        >{format(task.expiresAt, "dd/MM/yy")}</p>
                    }

                </div>
            </Label>
        </div>
    )
}

export default TaskCard;