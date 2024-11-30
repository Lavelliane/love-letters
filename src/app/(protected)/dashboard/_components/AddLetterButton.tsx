// app/dashboard/_components/AddLetterButton.tsx
'use client'

import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import AddLetterModal from './AddLetterModal';

interface AddLetterButtonProps {
  weeks: any[];
}

const AddLetterButton = ({ weeks }: AddLetterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary-hover text-background"
        endContent={<Plus className="w-4 h-4" />}
      >
        Add Letter
      </Button>
      <AddLetterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        weeks={weeks}
      />
    </>
  );
};

export default AddLetterButton;