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
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        email: "john.doe@example.com",
        password: "hashedpassword123", // In real app, this should be hashed
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        userName: "janesmith",
        email: "jane.smith@example.com",
        password: "hashedpassword456",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Mike",
        lastName: "Johnson",
        userName: "mikej",
        email: "mike.johnson@example.com",
        password: "hashedpassword789",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Sarah",
        lastName: "Wilson",
        userName: "sarahw",
        email: "sarah.wilson@example.com",
        password: "hashedpassword101",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Alex",
        lastName: "Brown",
        userName: "alexb",
        email: "alex.brown@example.com",
        password: "hashedpassword202",
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
        locApprox: "Helsinki City Center",
        locAccurate: "Aleksanterinkatu 15, 00100 Helsinki",
        taskTime: new Date("2024-10-15T14:00:00Z"),
        userId: users[0].id,
        volunteerAmount: 1,
        status: PostStatus.OPEN,
        reward: 10,
      },
    }),
    prisma.post.create({
      data: {
        name: "Dog walking assistance",
        description:
          "My dog needs a walk but I'm stuck at work. Looking for someone who loves dogs to help out!",
        locApprox: "Punavuori, Helsinki",
        locAccurate: "Bulevardi 25, 00120 Helsinki",
        taskTime: new Date("2024-10-16T16:30:00Z"),
        userId: users[1].id,
        volunteerAmount: 1,
        status: PostStatus.OPEN,
        reward: 20,
      },
    }),
    prisma.post.create({
      data: {
        name: "Move furniture to new apartment",
        description:
          "Need 2-3 people to help move some furniture to my new place. Will provide pizza and drinks!",
        locApprox: "Kallio, Helsinki",
        locAccurate: "Hämeentie 50, 00550 Helsinki",
        taskTime: new Date("2024-10-17T10:00:00Z"),
        userId: users[2].id,
        volunteerAmount: 3,
        status: PostStatus.ACCEPTED,
      },
    }),
    prisma.post.create({
      data: {
        name: "Tech support for elderly",
        description:
          "Help setting up a new smartphone and teaching basic functions. Must be patient and kind.",
        locApprox: "Töölö, Helsinki",
        locAccurate: "Mannerheimintie 30, 00100 Helsinki",
        taskTime: new Date("2024-10-18T13:00:00Z"),
        userId: users[3].id,
        volunteerAmount: 1,
        status: PostStatus.OPEN,
      },
    }),
    prisma.post.create({
      data: {
        name: "Garden cleanup help",
        description:
          "Need help cleaning up my backyard before winter. Raking leaves, basic yard work.",
        locApprox: "Espoo Center",
        locAccurate: "Keskustori 5, 02100 Espoo",
        taskTime: new Date("2024-10-19T11:00:00Z"),
        userId: users[4].id,
        volunteerAmount: 2,
        status: PostStatus.COMPLETED,
        reward: 30,
      },
    }),
    prisma.post.create({
      data: {
        name: "Tutoring in mathematics",
        description:
          "High school student needs help with algebra and geometry. 2-hour session.",
        locApprox: "Vantaa",
        locAccurate: "Martinlaaksontie 10, 01300 Vantaa",
        taskTime: new Date("2024-10-20T15:00:00Z"),
        userId: users[0].id,
        volunteerAmount: 1,
        status: PostStatus.OPEN,
      },
    }),
    prisma.post.create({
      data: {
        name: "Baby sitting for 3 hours",
        description:
          "Need a responsible person to watch my 5-year-old while I attend a meeting. Child is well-behaved.",
        locApprox: "Kamppi, Helsinki",
        locAccurate: "Urho Kekkosen katu 8, 00100 Helsinki",
        taskTime: new Date("2024-10-21T18:00:00Z"),
        userId: users[1].id,
        volunteerAmount: 1,
        status: PostStatus.OPEN,
      },
    }),
    prisma.post.create({
      data: {
        name: "Translation help Finnish to English",
        description:
          "Need help translating some official documents. Must be fluent in both languages.",
        locApprox: "Helsinki University area",
        locAccurate: "Yliopistonkatu 3, 00100 Helsinki",
        taskTime: new Date("2024-10-22T12:00:00Z"),
        userId: users[2].id,
        volunteerAmount: 1,
        status: PostStatus.ACCEPTED,
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
    // John and Jane volunteer for Alex's garden cleanup (completed task)
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
    // Sarah volunteers for the translation task (accepted)
    prisma.volunteer.create({
      data: {
        userId: users[3].id,
        postId: posts[7].id,
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
