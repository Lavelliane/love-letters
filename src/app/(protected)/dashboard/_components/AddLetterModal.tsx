'use client'

import React, { useState } from 'react';
import {
 Modal,
 ModalContent,
 ModalHeader,
 ModalBody,
 ModalFooter,
 Button,
 Input,
 Textarea,
 Select,
 SelectItem,
} from "@nextui-org/react";
import { addLoveLetter, createWeek } from '../_actions';

interface Week {
 id: string;
 weekNumber: number;
 createdAt: Date;
 updatedAt: Date;
}

interface AddLetterModalProps {
 isOpen: boolean;
 onClose: () => void;
 weeks: any;
}

const AddLetterModal = ({ isOpen, onClose, weeks }: AddLetterModalProps) => {
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [author, setAuthor] = useState('');
 const [weekId, setWeekId] = useState('');
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setLoading(true);
   
   try {
     let targetWeekId = weekId;
     
     if (weekId === 'new') {
       const newWeek = await createWeek();
       targetWeekId = newWeek.id;
     }

     await addLoveLetter({
       title,
       content,
       authorId: 'user123',
       author,
       openDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
       weekId: targetWeekId
     });

     onClose();
   } finally {
     setLoading(false);
   }
 };

 return (
   <Modal isOpen={isOpen} onClose={onClose} size="3xl">
     <ModalContent>
       <form onSubmit={handleSubmit} className="space-y-4">
         <ModalHeader className="text-primary">
           Write a Love Letter
         </ModalHeader>
         <ModalBody className="gap-4">
           <div className="flex gap-4">
             <Input
               label="Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               required
               className="flex-1"
             />
             <Input
               label="Your Name"
               value={author}
               onChange={(e) => setAuthor(e.target.value)}
               required
               className="w-1/3"
               placeholder="Your name"
             />
           </div>
           <Textarea
             label="Content"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             required
             minRows={5}
             className="w-full"
           />
           <Select
             label="Select Week"
             selectedKeys={weekId ? [weekId] : []}
             onChange={(e) => setWeekId(e.target.value)}
             required
             className="w-full text-primary"
           >
             <SelectItem key="new" value="new">
               Create New Week
             </SelectItem>
             {weeks.map((week: any) => (
               <SelectItem key={week.id} value={week.id}>
                 Week {week.weekNumber}
               </SelectItem>
             ))}
           </Select>
         </ModalBody>
         <ModalFooter>
           <Button
             color="danger"
             variant="light"
             onPress={onClose}
           >
             Cancel
           </Button>
           <Button
             type="submit"
             variant='bordered'
             className="text-primary"
             isLoading={loading}
           >
             Add Letter
           </Button>
         </ModalFooter>
       </form>
     </ModalContent>
   </Modal>
 );
};

export default AddLetterModal;