const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.userNotifications.deleteMany({});
  await prisma.userSettings.deleteMany({});
  await prisma.timeEntry.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.subtask.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});
  // Add other deleteMany calls for other models if necessary

  // Seed Users
  let users = [];
  for (let i = 1; i <= 3; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        name: `User ${i}`,
        password: hashedPassword,
        emailVerified: i === 1 ? new Date() : null,
      },
    });
    users.push(user);

    // Seed UserSettings
    await prisma.userSettings.create({
      data: {
        userId: user.id,
        preferences: JSON.stringify({ theme: 'dark', notifications: true }),
      },
    });

    // Seed UserNotifications
    await prisma.userNotifications.create({
      data: {
        userId: user.id,
        title: `Welcome User ${i}`,
        message: `This is a welcome notification for User ${i}.`,
        read: false,
      },
    });
  }

  // Seed Projects, Tasks, etc. for the first user
  for (let i = 1; i <= 3; i++) {
    const project = await prisma.project.create({
      data: {
        name: `Project ${i}`,
        ownerId: users[0].id,
      },
    });

    // Create Tasks for Each Project
    for (let j = 1; j <= 5; j++) {
      const task = await prisma.task.create({
        data: {
          title: `Task ${j} of Project ${i}`,
          description: `Description for Task ${j}`,
          projectId: project.id,
          dueDate: new Date(),
          priority: 'MEDIUM',
          managedByAI: j % 2 === 0,
          estimatedDuration: j * 60,
          status: {
            create: { name: j % 2 === 0 ? 'IN_PROGRESS' : 'OPEN' },
          },
          assignees: {
            connect: [{ id: users[j % users.length].id }],
          },
          subtasks: {
            create: [
              {
                title: `Subtask 1 of Task ${j}`,
                description: 'Subtask Description 1',
              },
            ],
          },
        },
      });

      // Create Comments and TimeEntries for Each Task
      if (j <= 3) {
        await prisma.comment.create({
          data: {
            content: `Comment ${j} on Task ${j}`,
            taskId: task.id,
            authorId: users[0].id,
          },
        });

        await prisma.timeEntry.create({
          data: {
            taskId: task.id,
            startTime: new Date(),
            endTime: new Date(),
            userId: users[0].id,
          },
        });
      }
    }
  }

  console.log('Seed data created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
