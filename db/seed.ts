import { db, Reminder } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  const mockReminders = [
    {
      name: "Reminder 1",
      description: "Description 1",
      startTime: Date.now(),
      endTime: Date.now() + 1000 * 60 * 60 * 24,
      expirationTime: Date.now() + 1000 * 60 * 60 * 24,
      reminderTime: 15,
      orchestrationId: "1",
    },
    {
      name: "Reminder 2",
      description: "Description 2",
      startTime: Date.now(),
      endTime: Date.now() + 1000 * 60 * 60 * 24,
      expirationTime: Date.now() + 1000 * 60 * 60 * 24,
      reminderTime: 1,
      orchestrationId: "2",
    },
  ];

  await db.insert(Reminder).values(mockReminders);
}
