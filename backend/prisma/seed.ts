import { PrismaClient, PostStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.volunteer.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  console.log("👥 Creating users...");
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: "johndoe",
        email: "john.doe@example.com",
        password: "hashedpassword123", // In real app, this should be hashed
        firstName: "John",
        lastName: "Doe",
      },
    }),
    prisma.user.create({
      data: {
        username: "janesmith",
        email: "jane.smith@example.com",
        password: "hashedpassword456",
        firstName: "Jane",
        lastName: "Smith",
      },
    }),
    prisma.user.create({
      data: {
        username: "mikej",
        email: "mike.johnson@example.com",
        password: "hashedpassword789",
        firstName: "Mike",
        lastName: "Johnson",
      },
    }),
    prisma.user.create({
      data: {
        username: "sarahw",
        email: "sarah.wilson@example.com",
        password: "hashedpassword101",
        firstName: "Sarah",
        lastName: "Wilson",
      },
    }),
    prisma.user.create({
      data: {
        username: "alexb",
        email: "alex.brown@example.com",
        password: "hashedpassword202",
        firstName: "Alex",
        lastName: "Brown",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create sample posts
  console.log("📝 Creating posts...");
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        name: "Help with grocery shopping",
        description:
          "Need someone to help me carry groceries from the store to my apartment. I have mobility issues and would really appreciate the help.",
        address: "Aleksanterinkatu 15, 00100 Helsinki",
        latitude: 60.169029,
        longitude: 24.94478,
        taskTime: new Date("2024-10-15T14:00:00Z"),
        userId: users[0].id,
        volunteersNeeded: 1,
        volunteersAlready: 0,
        status: PostStatus.OPEN,
        reward: 10,
      },
    }),
    prisma.post.create({
      data: {
        name: "Dog walking assistance",
        description:
          "My dog needs a walk but I'm stuck at work. Looking for someone who loves dogs to help out!",
        address: "Bulevardi 25, 00120 Helsinki",
        latitude: 60.161835,
        longitude: 24.929994,
        taskTime: new Date("2024-10-16T16:30:00Z"),
        userId: users[1].id,
        volunteersNeeded: 1,
        volunteersAlready: 0,
        status: PostStatus.OPEN,
        reward: 20,
      },
    }),
    prisma.post.create({
      data: {
        name: "Move furniture to new apartment",
        description:
          "Need 2-3 people to help move some furniture to my new place. Will provide pizza and drinks!",
        address: "Hämeentie 50, 00550 Helsinki",
        latitude: 60.198924,
        longitude: 24.962745,
        taskTime: new Date("2024-10-17T10:00:00Z"),
        userId: users[2].id,
        volunteersNeeded: 3,
        volunteersAlready: 0,
        status: PostStatus.ACCEPTED,
      },
    }),
    prisma.post.create({
      data: {
        name: "Tech support for elderly",
        description:
          "Help setting up a new smartphone and teaching basic functions. Must be patient and kind.",
        address: "Mannerheimintie 30, 00100 Helsinki",
        latitude: 60.172619,
        longitude: 24.93298,
        taskTime: new Date("2024-10-18T13:00:00Z"),
        userId: users[3].id,
        volunteersNeeded: 1,
        volunteersAlready: 0,
        status: PostStatus.OPEN,
        reward: 25,
      },
    }),
    prisma.post.create({
      data: {
        name: "Garden cleanup help",
        description:
          "Need help cleaning up my backyard before winter. Raking leaves, basic yard work.",
        address: "Keskustori 5, 02100 Espoo",
        latitude: 60.205489,
        longitude: 24.655899,
        taskTime: new Date("2024-10-19T11:00:00Z"),
        userId: users[4].id,
        volunteersNeeded: 2,
        volunteersAlready: 0,
        status: PostStatus.COMPLETED,
        reward: 30,
      },
    }),
  ]);

  console.log(`✅ Created ${posts.length} posts`);

  // Create volunteer relationships
  console.log("🙋 Creating volunteer relationships...");
  const volunteers = await Promise.all([
    // John volunteers for Jane's dog walking
    prisma.volunteer.create({
      data: {
        userId: users[0].id,
        postId: posts[1].id,
        accepted: false,
      },
    }),
    // Sarah volunteers for Jane's dog walking (accepted)
    prisma.volunteer.create({
      data: {
        userId: users[3].id,
        postId: posts[1].id,
        accepted: true,
      },
    }),
    // Jane and Alex volunteer for Mike's furniture moving (accepted)
    prisma.volunteer.create({
      data: {
        userId: users[1].id,
        postId: posts[2].id,
        accepted: true,
      },
    }),
    prisma.volunteer.create({
      data: {
        userId: users[4].id,
        postId: posts[2].id,
        accepted: true,
      },
    }),
    // Mike volunteers for Sarah's tech support
    prisma.volunteer.create({
      data: {
        userId: users[2].id,
        postId: posts[3].id,
        accepted: false,
      },
    }),
    // John and Jane volunteer for garden cleanup (completed task)
    prisma.volunteer.create({
      data: {
        userId: users[0].id,
        postId: posts[4].id,
        accepted: true,
      },
    }),
    prisma.volunteer.create({
      data: {
        userId: users[1].id,
        postId: posts[4].id,
        accepted: true,
      },
    }),
  ]);

  console.log(`✅ Created ${volunteers.length} volunteer relationships`);

  // Print summary
  console.log("\n📊 Seed Summary:");
  console.log(`👥 Users: ${users.length}`);
  console.log(`📝 Posts: ${posts.length}`);
  console.log(`🙋 Volunteers: ${volunteers.length}`);

  const openPosts = posts.filter((p) => p.status === PostStatus.OPEN).length;
  const acceptedPosts = posts.filter(
    (p) => p.status === PostStatus.ACCEPTED
  ).length;
  const completedPosts = posts.filter(
    (p) => p.status === PostStatus.COMPLETED
  ).length;

  console.log(
    `📊 Post Status: ${openPosts} OPEN, ${acceptedPosts} ACCEPTED, ${completedPosts} COMPLETED`
  );
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
