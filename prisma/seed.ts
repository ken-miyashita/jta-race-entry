import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const raceData: Prisma.RaceCreateInput[] = [
  {
    name: "2000年度 正月レガッタ",
    mailFrom: "foo@example.com",
    dateOfRaceBegin: new Date("2000-01-01T00:00:00Z"),
    dateOfRaceEnd: new Date("2000-01-03T00:00:00Z"),
    teams: {
      create: [
        {
          sailNumber: "2000",
          country: "JPN",
          boatName: "山田丸",
          boatWeight: 60.0,
          persons: {
            create: [
              {
                lastName: "山田",
                firstName: "太郎",
                lastNameRomaji: "Yamada",
                firstNameRomaji: "Taro",
                role: "skipper",
                jta: true,
                birthDay: new Date("1970-01-01T00:00:00Z"),
                sex: "male",
                address: "東京都港区",
                eMail: "taro@example.com",
                phone: "090-1234-5678",
              },
              {
                lastName: "山田",
                firstName: "花子",
                lastNameRomaji: "Yamada",
                firstNameRomaji: "Hanako",
                role: "crew1",
                jta: false,
                birthDay: new Date("1970-01-01T00:00:00Z"),
                sex: "female",
                address: "東京都港区",
                eMail: "hanako@example.com",
                phone: "090-1234-5678",
              },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const r of raceData) {
    const race = await prisma.race.create({
      data: r,
    });
    console.log(`Created race with id: ${race.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
