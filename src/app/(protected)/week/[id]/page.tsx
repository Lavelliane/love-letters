import React from 'react';
import { weeks, loveLetters } from '../../../../../db/schema';
import { db } from '../../../../../db';
import { eq } from 'drizzle-orm';
import { Card, CardBody, CardHeader, Switch } from '@nextui-org/react';
import { ChevronLeft, Heart } from 'lucide-react';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import BackButton from '@/components/BackButton';
import ShowLetters from './ShowLetters';

dayjs.extend(utc)
dayjs.extend(timezone)

const manilaTimezone = 'Asia/Manila'

async function WeekPage({ params }: { params: { id: string } }) {
  const [weekData] = await db
    .select()
    .from(weeks)
    .where(eq(weeks.id, params.id));

  const weekLetters = await db
    .select()
    .from(loveLetters)
    .where(eq(loveLetters.weekId, params.id));

  return (
    <div className="space-y-8">
      <header className="flex space-y-2 w-full">
        <div className="flex self-center justify-start w-[4%]">
          <BackButton />
        </div>
        <div className='justify-center text-center w-[96%]'>
          <h1 className="text-2xl font-medium text-primary">
            Week {weekData?.weekNumber}
          </h1>
          <p className="text-sm text-accent">
            {new Date(weekData?.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </header>
      <ShowLetters weekLetters={weekLetters} initialValue={false} />
    </div>
  );
}

export default WeekPage;