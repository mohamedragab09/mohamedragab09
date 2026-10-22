"use client";

import { TableCell } from "@/components/ui/table";
import { Avatar } from "../dashpage-content.tsx/avatar";
import { MessageItem } from "../pages/messages-data-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteMessage } from "@/lib/services/contact";

export function MessageTBody({ item }: { item: MessageItem }) {
    const date = new Date(item.create_at).toISOString().split("T")[0];
    const emailUsername = item.email.split("@")[0];

    const route = useRouter();

    async function handleDeleting(itemId: number) {
        try {
            await deleteMessage(itemId);
            toast.success("Project deleted successfully");
            
            route.refresh();
        } catch (error: unknown) {
            console.error("Delete project error:", error);

            toast.error(error instanceof Error ? error.message : "Failed to delete project");
        }
    }

    return (
        <>
        <TableCell>
            <div className="flex items-center gap-2.5">
                <Avatar name={item.name} />
                <div className="min-w-0 max-w-xs">
                    <p className="text-sm font-semibold truncate">
                        {item.name}
                    </p>
                </div>
            </div>
        </TableCell>

        <TableCell>
            <p className="text-sm truncate max-w-xs">
                {item.message}
            </p>
        </TableCell>

        <TableCell>
            <a
                href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(item.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm truncate block max-w-xs hover:underline"
            >
                {emailUsername}
            </a>
        </TableCell>

        <TableCell>
            <p className="text-sm text-muted-foreground whitespace-nowrap">
                {date}
            </p>
        </TableCell>
        
        <TableCell>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive focus:text-destructive h-7 w-7"
                            onClick={() => handleDeleting(item.id)}
                        >
                            <ClipboardList className="h-3.5 w-3.5" />
                        </Button>
                    }
                />
                <TooltipContent>
                    Delete Message
                </TooltipContent>
            </Tooltip>
        </TableCell>
        </>
    );
}
