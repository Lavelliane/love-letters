'use client'

import { Button } from '@nextui-org/react';
import { ChevronLeft, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

function BackButton() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
          const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Logout failed');
          }
      
          // Redirect to login page
          router.push('/');
        } catch (error) {
          console.error('Logout error:', error);
          // Handle error appropriately
        }
      };
    return (
        <Button
            onClick={handleLogout}
            variant='light'
            className="text-red-500 transition-colors duration-300 bg-transparent border-none"
        >
            <LogOut className="w-5 h-5" />
        </Button>
    )
}

export default BackButton
