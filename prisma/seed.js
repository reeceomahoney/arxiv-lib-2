import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.paper.deleteMany({});
  await prisma.folder.deleteMany({});

  const adminUser = await prisma.user.findFirst();

  if (!adminUser) {
    throw new Error("Admin user not found");
  }

  // Create "All Papers" folder if it doesn't exist
  let allPapersFolder = await prisma.folder.findFirst({
    where: { name: "All Papers", userId: adminUser.id },
  });

  if (!allPapersFolder) {
    allPapersFolder = await prisma.folder.create({
      data: {
        name: "All Papers",
        userId: adminUser.id,
      },
    });
  }

  // Create test folders associated with the admin user
  const folders = [];
  const papers = [];

  // Generate 5 folders as subfolders of "All Papers"
  for (let i = 0; i < 5; i++) {
    const folder = await prisma.folder.create({
      data: {
        name: `Test Folder ${i + 1}`,
        userId: adminUser.id,
        parentId: allPapersFolder.id,
      },
    });
    folders.push(folder);

    // Randomly decide to create a subfolder
    if (Math.random() > 0.5) {
      const subfolder = await prisma.folder.create({
        data: {
          name: `Subfolder of Test Folder ${i + 1}`,
          userId: adminUser.id,
          parentId: folder.id,
        },
      });
      folders.push(subfolder);

      // Generate 3 papers for the subfolder
      for (let j = 0; j < 3; j++) {
        const paper = await prisma.paper.create({
          data: {
            title: `Test Paper ${i + 1}-${j + 1} (Subfolder)`,
            authors: ["Author 1", "Author 2"],
            date: new Date(),
            folderId: subfolder.id,
          },
        });
        papers.push(paper);
      }
    }

    // Generate 3 papers for each main folder
    for (let j = 0; j < 3; j++) {
      const paper = await prisma.paper.create({
        data: {
          title: `Test Paper ${i + 1}-${j + 1}`,
          authors: ["Author 1", "Author 2"],
          date: new Date(),
          folderId: folder.id,
        },
      });
      papers.push(paper);
    }
  }

  console.log("Seeded database with test data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
