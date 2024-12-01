// app/dashboard/page.tsx
import React from 'react'
import { db } from "../../../../db";
import { weeks } from "../../../../db/schema";
import { desc } from "drizzle-orm";
import WeekCard from './_components/WeekCard';
import AddLetterButton from './_components/AddLetterButton';
import Logout from '@/components/Logout';

async function DashboardPage() {
    const allWeeks = await db.select()
        .from(weeks)
        .orderBy(desc(weeks.weekNumber));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-medium text-primary">Our Weeks Together</h1>
                <div className='flex gap-3'>
                    <AddLetterButton weeks={allWeeks} />
                    <Logout />
                </div>
            </div>
            <div className="space-y-4">
                {allWeeks.map((week) => (
                    <WeekCard key={week.id} {...week} />
                ))}
            </div>
        </div>
    )
}

export default DashboardPage;