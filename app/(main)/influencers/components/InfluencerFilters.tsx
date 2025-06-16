import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export const InfluencerFilters = () => {
    return (
        <div className="flex items-center gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Busca por nicho o @usuario..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="spain">España</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Audiencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nano">Nano (1k-10k)</SelectItem>
                  <SelectItem value="micro">Micro (10k-50k)</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
    );
}; 