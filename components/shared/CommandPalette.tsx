'use client';

import * as React from 'react';
import {
  BrainCircuit,
  Calendar,
  Home,
  LayoutGrid,
  Lightbulb,
  MessageCircle,
  Plus,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

interface CommandPaletteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ isOpen, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [isCampaignModalOpen, setCampaignModalOpen] = React.useState(false);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <>
      {/* <CreateCampaignModal isOpen={isCampaignModalOpen} onOpenChange={setCampaignModalOpen} /> */}
      <CommandDialog open={isOpen} onOpenChange={onOpenChange}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
              <LayoutGrid className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/calendar'))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/inbox'))}>
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>Inbox</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/analytics'))}>
              <Lightbulb className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/influencers'))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Influencers</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/strategy-coach'))}>
              <BrainCircuit className="mr-2 h-4 w-4" />
              <span>Strategy Coach</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => setCampaignModalOpen(true))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Campaign</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 