import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Avatar } from "../dashpage-content.tsx/avatar";
import Image from "next/image";
import { StatusBadge } from "../status-badge";
import { Project } from "@/lib/types/projects";
import { FILTER_TABS } from "../pages/projects-data-table";

export function THeader({ tableHeader }: { tableHeader: string[] }) {
    return (
        <>
            <TableRow className="hover:bg-transparent">
                {tableHeader.map((item) => (
                  <TableHead key={item}>{item}</TableHead>
                ))}
              </TableRow>
        </>
    )
};

export function ProjectTBody({item}: {item: Project}) {
    return (
        <>
            {/* Title */}
            <TableCell>
                <div className="flex items-center gap-2.5">
                    <Avatar name={item.title} />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{item.title}</p>
                    </div>
                </div>
            </TableCell>

            {/* Image */}
            <TableCell>
                <Image 
                    src={item.image_url} 
                    alt={item.title}
                    width={40} 
                    height={40} 
                    className="rounded-md w-18 h-10" 
                />
            </TableCell>

            {/* Stack */}
            <TableCell>
                <p className="text-sm text-foreground">{FILTER_TABS.find(s => s.key === item.stack)?.label}</p>
            </TableCell>

            {/* status */}
            <TableCell>
                <StatusBadge status={item.status} />
            </TableCell>
        </>
    )
}


