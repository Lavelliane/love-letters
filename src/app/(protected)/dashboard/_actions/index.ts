'use server'

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../../../../../db";
import { weeks, loveLetters } from "../../../../../db/schema";
import { desc } from "drizzle-orm";

interface AddLetterInput {
  title: string;
  content: string;
  authorId: string;
  author: string;
  openDate: Date;
  weekId: string;
}

export async function addLoveLetter(data: AddLetterInput) {
  try {
    const letter = await db.insert(loveLetters).values(data).returning();
    revalidatePath('/dashboard');
    return { success: true, letter: letter[0] };
  } catch (error) {
    return { success: false, error: 'Failed to add letter' };
  }
}

export async function createWeek() {
  const latestWeek = await db.select()
    .from(weeks)
    .orderBy(desc(weeks.weekNumber))
    .limit(1);

  const newWeekNumber = latestWeek.length > 0 ? latestWeek[0].weekNumber + 1 : 1;

  const week = await db.insert(weeks)
    .values({ weekNumber: newWeekNumber })
    .returning();

  return week[0];
}