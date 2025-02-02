import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const raceData: Prisma.RaceCreateInput[] = [
  {
    name: "2000年度 正月レガッタ",
    mailFrom: "foo@example.com",
    mailBcc: "",
    startDate: "2000-01-01",
    endDate: "2000-01-03",
    miscInJson: "",
    teams: {
      create: [
        {
          sailNumber: "2000",
          country: "JPN",
          boatName: "山田丸",
          boatWeight: 60.0,
          fleet: "葉山フリート",
          place: "葉山",
          message: "特になし",
          miscInJson: "",
          persons: {
            create: [
              {
                lastName: "山田",
                firstName: "太郎",
                lastNameRomaji: "Yamada",
                firstNameRomaji: "Taro",
                role: "skipper",
                jsafId: "1-222-333",
                jta: true,
                birthDay: "1970-01-01",
                sex: "male",
                address: "東京都港区",
                eMail: "taro@example.com",
                phone: "090-1234-5678",
                fax: "",
                miscInJson: "",
              },
              {
                lastName: "山田",
                firstName: "花子",
                lastNameRomaji: "Yamada",
                firstNameRomaji: "Hanako",
                role: "crew1",
                jsafId: "",
                jta: false,
                birthDay: "1970-01-01",
                sex: "female",
                address: "東京都港区",
                eMail: "hanako@example.com",
                phone: "090-1234-5678",
                fax: "",
                miscInJson: "",
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
