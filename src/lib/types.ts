import type { LucideIcon } from 'lucide-react';

export type Contact = {
  id: string;
  name: string;
  email: string;
};

export type EmergencyTemplate = {
  id: string;
  title: string;
  situation: string;
  icon: LucideIcon;
};
