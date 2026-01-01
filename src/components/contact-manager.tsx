'use client';

import { useState } from 'react';
import type { Contact } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Trash2, User, UserPlus, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type ContactManagerProps = {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
};

export function ContactManager({ contacts, setContacts }: ContactManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const addContact = (values: z.infer<typeof contactSchema>) => {
    const newContact = { id: crypto.randomUUID(), ...values };
    setContacts((prev) => [...prev, newContact]);
    form.reset();
    setIsOpen(false);
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Emergency Contacts
          </CardTitle>
          <CardDescription>
            Select loved ones to notify in an emergency.
          </CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Enter the name and email of your emergency contact.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(addContact)}
                className="grid gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. jane.doe@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save Contact</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No contacts added yet. Add one to get started.
            </p>
          ) : (
            <ul className="space-y-3">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {contact.name}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {contact.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteContact(contact.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Delete contact</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
