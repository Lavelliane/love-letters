import { 
    pgTable, 
    varchar, 
    timestamp, 
    text,
    integer
  } from 'drizzle-orm/pg-core';
  import { sql } from 'drizzle-orm';
  
  export const weeks = pgTable('weeks', {
    id: varchar('id', { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    weekNumber: integer('week_number').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
  });

  export const loveLetters = pgTable('love_letters', {
    id: varchar('id', { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    openDate: timestamp('open_date', { withTimezone: true }).notNull(),
    weekId: varchar('week_id', { length: 255 })
      .notNull()
      .references(() => weeks.id)
  });
