import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  description,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p
          className={`text-sm ${
            changeType === 'increase' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {change} vs. mes anterior
        </p>
      </CardContent>
    </Card>
  );
} 