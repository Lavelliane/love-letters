'use client';

import { Letter } from "@/types/types";
import { CardBody, Card, Switch, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import { Heart } from "lucide-react";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useState } from "react";


dayjs.extend(utc)
dayjs.extend(timezone)

const manilaTimezone = 'Asia/Manila'

interface ShowLetterSwitchProps {
  initialValue?: boolean;
  weekLetters: Letter[];
}

export default function ShowLetters({ initialValue = false, weekLetters }: ShowLetterSwitchProps) {
  const manilaCurrentDate = dayjs().tz(manilaTimezone).startOf('day')

  const [showLetters, setShowLetters] = useState(false)
  return (
    <>
      <Switch isSelected={showLetters} onValueChange={setShowLetters}>Show letters</Switch>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weekLetters.length > 0 && weekLetters.map((letter) => {
          const letterDate = dayjs(letter.openDate).tz(manilaTimezone).startOf('day')
          if (manilaCurrentDate.isBefore(letterDate) || !showLetters) {
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
    </>
  );
}
