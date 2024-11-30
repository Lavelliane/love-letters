'use client';

import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Calendar, Heart } from "lucide-react";
import { useRouter } from 'next/navigation';

const AnniversaryLogin = () => {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ anniversary: date })
      });
      const data = await response.json();
      if(data.success) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transition-colors hover:bg-primary-hover">
              <Heart className="w-8 h-8 text-background" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-primary">
            Welcome Back, Love
          </h1>
          <p className="text-accent">
            Enter our special day to continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Input
              variant="bordered"
              labelPlacement="outside"
              placeholder="000000"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              classNames={{
                input: "bg-white text-primary",
                inputWrapper: "bg-white border-accent hover:border-accent-hover focus-within:!border-primary",
                label: "color-accent",
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            className="bg-primary hover:bg-primary-hover text-background font-medium text-md h-12 transition-colors"
          >
            Continue to Our Space
          </Button>
        </form>

        {/* Decorative Element */}
        <div className="pt-8 flex justify-center">
          <div className="w-32 h-1 rounded-full bg-secondary transition-colors hover:bg-secondary-hover" />
        </div>
      </div>
    </div>
  );
};

export default AnniversaryLogin;