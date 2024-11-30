'use client';
import React from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation';

interface WeekCardProps {
  id: string;
  weekNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

const WeekCard = ({ id, weekNumber, createdAt }: WeekCardProps) => {

    const router = useRouter();
  return (
    <Card 
      className="w-full border rounded-md border-secondary bg-transparent hover:border-primary/50 transition-all duration-300 group cursor-pointer"
      shadow="none"
      radius="sm"
      isPressable
      onPress={() => {
        router.push(`/week/${id}`);
      }}
    >
      <CardBody className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-primary font-medium text-lg">
              Week {weekNumber}
            </p>
            <p className="text-xs text-primary/70">
              {new Date(createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <ChevronRight 
            className="w-4 h-4 text-primary/50 group-hover:text-primary/70 transition-colors duration-300" 
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default WeekCard;