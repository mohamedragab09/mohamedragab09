import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function PageHeader({ title, description, badgeFunc, badgeContent }: {
    title: string;
    description: string;
    badgeFunc?: () => void;
    badgeContent: string
}) {
    return(
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="text-xl text-primary font-bold tracking-tight">{title}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                    {description}
                </p>
            </div>
            <Badge
                variant="outline"
                className="gap-1.5 text-xs shrink-0 py-1 cursor-pointer"
                onClick={badgeFunc}
            >
                <ArrowRight className="h-3 w-3 text-primary" />
                {badgeContent}
            </Badge>
        </div>
    )
}