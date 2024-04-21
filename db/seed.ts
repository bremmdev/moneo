import { db, Reminder } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  const mockReminders = [
    {
      orchestrationId: "1",
      name: "Reminder 1",
      description: "Description 1",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1000 * 60 * 10),
      expirationTime: 10,
      reminderTime: 15,
    },
    {
      orchestrationId: "2",
      name: "Reminder 2",
      description: "Description 2",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1000 * 60 * 10),
      expirationTime: 10,
      reminderTime: 1,
    },
  ];

  await db.insert(Reminder).values(mockReminders);
}