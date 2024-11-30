// db/seed.ts
import { db } from './index';
import { loveLetters, weeks } from './schema';

const generateFutureDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

const sampleWeeks = [
  {
    weekNumber: 1
  },
  {
    weekNumber: 2
  },
  {
    weekNumber: 3
  },
  {
    weekNumber: 4
  },
  {
    weekNumber: 5
  }
];

const sampleLetters = [
  {
    title: "Our First Month Together",
    content: "Remember when we first met? That coffee shop downtown, you were wearing that blue dress...",
    authorId: "user1",
    author: "John",
    openDate: generateFutureDate(7),
    weekId: "" // Will be populated after weeks are created
  },
  {
    title: "Movie Night Memories", 
    content: "I still laugh thinking about how we watched that horrible horror movie and you kept hiding behind the pillow...",
    authorId: "user2",
    author: "Sarah",
    openDate: generateFutureDate(14),
    weekId: ""
  },
  {
    title: "Our Future Dreams",
    content: "I've been thinking about all the places we want to travel together. Remember our conversation about visiting Japan?",
    authorId: "user1", 
    author: "John",
    openDate: generateFutureDate(21),
    weekId: ""
  },
  {
    title: "The Little Things",
    content: "It's the way you scrunch your nose when you laugh, how you always steal my fries even though you say you're not hungry...",
    authorId: "user2",
    author: "Sarah", 
    openDate: generateFutureDate(28),
    weekId: ""
  },
  {
    title: "Our Song",
    content: "Heard our song on the radio today. Immediately brought me back to our first dance together...",
    authorId: "user1",
    author: "John",
    openDate: generateFutureDate(35),
    weekId: ""
  }
];

async function seed() {
  try {
    // Clean up existing data
    await db.delete(loveLetters);
    await db.delete(weeks);
    
    // Insert weeks first
    const createdWeeks: any = [];
    for (const week of sampleWeeks) {
      const [createdWeek] = await db.insert(weeks).values(week).returning();
      createdWeeks.push(createdWeek);
    }

    // Update letters with week IDs
    sampleLetters.forEach((letter, index) => {
      letter.weekId = createdWeeks[index].id;
    });
    
    // Insert sample letters
    for (const letter of sampleLetters) {
      await db.insert(loveLetters).values(letter);
    }
    
    console.log('✨ Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();