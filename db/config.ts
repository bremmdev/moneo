import { defineDb, defineTable, column } from "astro:db";

const Reminder = defineTable({
  columns: {
    orchestrationId: column.text(),
    name: column.text(),
    description: column.text(),
    completed: column.boolean({ default: false }),
    startDate: column.date(),
    endDate: column.date(),
    expirationTime: column.number(),
    reminderTime: column.number(),
  },
});

export default defineDb({
  tables: { Reminder },
});


