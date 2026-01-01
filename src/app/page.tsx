'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Contact, EmergencyTemplate } from '@/lib/types';
import { AppHeader } from '@/components/app-header';
import { EmergencySelector } from '@/components/emergency-selector';
import { ContactManager } from '@/components/contact-manager';
import { Button } from '@/components/ui/button';
import { Loader2, Siren } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendSosAction } from '@/app/actions';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmergencyTemplate | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    // Load contacts from localStorage on mount
    try {
      const storedContacts = window.localStorage.getItem('contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Failed to load contacts from localStorage', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load saved contacts.',
      });
    }

    // Get user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast({
            title: 'Location Acquired',
            description: 'Your location is ready for SOS messages.',
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            variant: 'destructive',
            title: 'Location Error',
            description:
              'Could not get your location. Please enable location services.',
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Unsupported Browser',
        description: 'Geolocation is not supported by your browser.',
      });
    }
  }, [toast]);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (error) {
        console.error('Failed to save contacts to localStorage', error);
      }
    }
  }, [contacts, isClient]);

  const handleSos = useCallback(async () => {
    if (!location) {
      toast({
        variant: 'destructive',
        title: 'Location not available',
        description: 'Cannot send SOS without your location.',
      });
      return;
    }
    if (contacts.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No contacts selected',
        description: 'Please add at least one emergency contact.',
      });
      return;
    }
    if (!selectedTemplate) {
      toast({
        variant: 'destructive',
        title: 'No emergency selected',
        description: 'Please select the nature of your emergency.',
      });
      return;
    }

    setIsLoading(true);
    toast({
      title: 'Sending SOS...',
      description: 'Contacting emergency services and loved ones.',
    });

    const result = await sendSosAction(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        situation: selectedTemplate.situation,
        template: selectedTemplate.title,
      },
      contacts,
      `SOS: ${selectedTemplate.title}`
    );

    setIsLoading(false);

    if (result.success) {
      toast({
        title: 'SOS Sent!',
        description: 'Your emergency contacts have been notified via email.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message,
      });
    }
  }, [location, contacts, selectedTemplate, toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 space-y-8">
        <EmergencySelector
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
        <ContactManager contacts={contacts} setContacts={setContacts} />
        <div className="h-32"></div> {/* Spacer for the fixed footer */}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center gap-3">
          <Button
            className="w-24 h-24 rounded-full bg-destructive text-destructive-foreground shadow-2xl transition-all duration-300 ease-in-out hover:bg-destructive/90 active:scale-95 disabled:opacity-50 disabled:animate-none disabled:scale-100 data-[loading=false]:animate-pulse"
            onClick={handleSos}
            disabled={
              isLoading || !location || contacts.length === 0 || !selectedTemplate
            }
            data-loading={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-12 w-12 animate-spin" />
            ) : (
              <Siren className="h-12 w-12" />
            )}
            <span className="sr-only">SOS</span>
          </Button>
          <p className="text-sm font-semibold text-center text-foreground/80">
            SEND SOS
          </p>
        </div>
      </footer>
    </div>
  );
}
