'use client'

import { Button } from '@nextui-org/react';
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

function BackButton() {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.back()}
            variant='light'
            className="text-primary hover:text-primary/70 transition-colors duration-300 bg-transparent border-none"
        >
            <ChevronLeft className="w-9 h-9" />
        </Button>
    )
}

export default BackButton
