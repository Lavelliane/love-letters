import React from 'react';
import { weeks, loveLetters } from '../../../../../db/schema';
import { db } from '../../../../../db';
import { eq } from 'drizzle-orm';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { ChevronLeft, Heart } from 'lucide-react';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import BackButton from '@/components/BackButton';

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

  const manilaCurrentDate = dayjs().tz(manilaTimezone).startOf('day')

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weekLetters.map((letter) => {
          const letterDate = dayjs(letter.openDate).tz(manilaTimezone).startOf('day')
          if (manilaCurrentDate.isBefore(letterDate)) {
            return (
              <div className="flex flex-col items-center justify-center" key={letter.id}>
                <p className="text-lg font-medium text-primary">
                  Letter will open on {dayjs(letterDate).format('MMM D, YYYY')}
                </p>
                <p className="text-sm text-accent">
                  love, {letter.author}
                </p>
              </div>
            )
          } else {
            return (
              <Card
                key={letter.id}
                className="border border-secondary bg-transparent hover:border-primary transition-all duration-300"
                shadow="none"
                radius="sm"
              >
                <CardHeader className="flex gap-3 px-6 pt-6 pb-2">
                  <div className="flex flex-col">
                    <p className="text-lg font-medium text-primary">{letter.title}</p>
                    <div className="flex items-center gap-2">
                      <Heart className="w-3 h-3 text-primary fill-primary" />
                      <p className="text-sm text-accent">{letter.author}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-6 py-4">
                  <div className="space-y-4">
                    <p className="text-primary whitespace-pre-wrap leading-relaxed">
                      {letter.content}
                    </p>
                    <div className="flex justify-between items-center pt-4 text-xs text-primary">
                      <span>
                        Written on{' '}
                        {new Date(letter.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>
                        Opens on{' '}
                        {letterDate.format('MMM D, YYYY')}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
          }
        })}
      </div>
    </div>
  );
}

export default WeekPage;