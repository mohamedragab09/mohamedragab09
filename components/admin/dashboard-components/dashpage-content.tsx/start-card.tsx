import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";
import { LucideIcon } from "lucide-react";

export function StatCard({
  label, value, icon: Icon, accent,
}: {
  label: string
  value: number;
  icon: LucideIcon;
  accent: string; 
}) {
  return (
    <Card className="border shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className={cn("rounded-lg p-2", accent)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}