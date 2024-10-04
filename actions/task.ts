"use server";

import prisma from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs/server";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw Error("User not found");
  }

  return await prisma.task.create({
    data: {
      userId: user.id,
      content: data.content,
      expiresAt: data.expiresAt,
      Collection: {
        connect: {
          id: data.collectionId,
        },
      },
    },
  });
}

export async function setTaskToDone(taskId: number) {
  const user = await currentUser();

  if (!user) {
    throw Error("User not found");
  }

  return await prisma.task.update({
    where: {
      id: taskId,
      userId: user.id,
    },
    data: {
      done: true,
    },
  });
}
