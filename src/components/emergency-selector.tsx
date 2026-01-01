'use client';

import type { EmergencyTemplate } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HeartPulse, Shield, Car, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const emergencyTemplates: EmergencyTemplate[] = [
  {
    id: 'medical',
    title: 'Medical Emergency',
    situation:
      "I'm having a medical emergency and need help immediately. My location is attached.",
    icon: HeartPulse,
  },
  {
    id: 'unsafe',
    title: 'Feeling Unsafe',
    situation:
      "I am in a situation where I feel unsafe and need assistance. Please check on me. My location is attached.",
    icon: Shield,
  },
  {
    id: 'accident',
    title: 'In an Accident',
    situation:
      "I've been in an accident and require urgent help. My location is attached.",
    icon: Car,
  },
  {
    id: 'other',
    title: 'General Help',
    situation:
      "I need help, but it's not a critical emergency. Please contact me when you can. My location is attached.",
    icon: HelpCircle,
  },
];

type EmergencySelectorProps = {
  selectedTemplate: EmergencyTemplate | null;
  onSelectTemplate: (template: EmergencyTemplate) => void;
};

export function EmergencySelector({
  selectedTemplate,
  onSelectTemplate,
}: EmergencySelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What's the emergency?</CardTitle>
        <CardDescription>
          Select a situation to generate a message.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencyTemplates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={cn(
                'h-auto p-4 flex flex-col items-center justify-center gap-2 text-center transition-all duration-200',
                selectedTemplate?.id === template.id
                  ? 'bg-primary/10 border-primary ring-2 ring-primary text-primary'
                  : 'text-foreground'
              )}
              onClick={() => onSelectTemplate(template)}
            >
              <template.icon className="h-8 w-8 mb-2" />
              <span className="font-semibold text-sm">{template.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
