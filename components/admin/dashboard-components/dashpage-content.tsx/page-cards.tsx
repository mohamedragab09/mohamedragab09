import { CircleDollarSign, ClipboardList, TrendingUp, Users } from "lucide-react";
import { StatCard } from "./start-card";

type StackStats = {
  total: number;
  full_stack: number;
  frontend: number;
  backend: number;
};

export function PageCards({ stack }: { stack: StackStats }) {
    return(
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Total Projects" value={stack.total} icon={Users} accent="bg-blue-100 text-blue-600" />
          <StatCard label="Full Stack" value={stack.full_stack} icon={ClipboardList} accent="bg-emerald-100 text-emerald-600" />
          <StatCard label="Frontend" value={stack.frontend} icon={CircleDollarSign} accent="bg-violet-100 text-violet-600" />
          <StatCard label="Backend" value={stack.backend} icon={TrendingUp} accent="bg-amber-100 text-amber-600" />
        </div>
    )
}