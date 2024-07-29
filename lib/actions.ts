"use server";

import prisma from "./prisma";
import type { CreateFolderData } from "./definitions";

export async function createFolder(data: CreateFolderData) {
  prisma.folder.create({ data });
}
