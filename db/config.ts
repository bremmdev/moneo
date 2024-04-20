import { defineDb, defineTable, column } from "astro:db";

const Reminder = defineTable({
  columns: {
    name: column.text(),
    description: column.text(),
    startTime: column.number(),
    endTime: column.number(),
    expirationTime: column.number(),
    reminderTime: column.number(),
    orchestrationId: column.text(),
  },
});

export default defineDb({
  tables: { Reminder },
});


