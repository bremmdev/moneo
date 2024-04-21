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
      description:
        "This is quite a long description to showcase the capabilities of the reminder system. It can be as long as you want it to be.",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1000 * 60 * 10),
      expirationTime: 10,
      reminderTime: 1,
    },
    {
      orchestrationId: "3",
      name: "Reminder 3",
      description: "Regular reminder with a short description.",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1000 * 60 * 15),
      expirationTime: 15,
      reminderTime: 5,
    },
    {
      orchestrationId: "4",
      name: "Reminder 4",
      description: "Expired reminder with a short description.",
      startDate: new Date(Date.now() - 1000 * 60 * 30),
      endDate: new Date(Date.now() - 1000 - 60 * 15),
      expirationTime: 15,
      reminderTime: 5,
    },
  ];

  await db.insert(Reminder).values(mockReminders);
}
