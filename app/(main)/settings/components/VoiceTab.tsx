import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BrandProfile } from '@/lib/types';

interface VoiceTabProps {
  data: BrandProfile['voice'];
}

export function VoiceTab({ data }: VoiceTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Espectro Tonal</CardTitle>
        <CardDescription>@VOICE::ToneSpectrum::001</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Empoderador</span>
            <span className="text-sm text-muted-foreground">70%</span>
          </div>
          <Progress value={70} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Educativo</span>
            <span className="text-sm text-muted-foreground">20%</span>
          </div>
          <Progress value={20} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Sofisticado</span>
            <span className="text-sm text-muted-foreground">10%</span>
          </div>
          <Progress value={10} />
        </div>
      </CardContent>
    </Card>
  );
} 