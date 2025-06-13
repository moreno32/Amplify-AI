import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPIPillProps {
  kpi: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
}

const ICONS = {
  increase: <TrendingUp className="h-4 w-4 text-green-500" />,
  decrease: <TrendingDown className="h-4 w-4 text-red-500" />,
  neutral: <Minus className="h-4 w-4 text-gray-500" />,
};

export function KPIPill({ kpi, value, change, changeType }: KPIPillProps) {
  return (
    <Card>
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {ICONS[changeType]}
          <span className="text-sm font-medium">{kpi}</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{value}</p>
          <p
            className={cn(
              'text-xs',
              changeType === 'increase' && 'text-green-500',
              changeType === 'decrease' && 'text-red-500',
              changeType === 'neutral' && 'text-gray-500'
            )}
          >
            {change}
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 