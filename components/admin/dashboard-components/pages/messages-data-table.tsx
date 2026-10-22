import { Card } from "@/components/ui/card";
import { PageHeader } from "../dashpage-content.tsx/page-header";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { THeader } from "../dashboard-table.tsx/table-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageTBody } from "../dashboard-table.tsx/message-table-body";

const MESSAGE_TABLE_HEADS = [
  "Name",
  "Message",
  "Email",
  "Create At",
  "Action"
];

export type MessageItem = {
    id: number;
    name: string;
    message: string;
    email: string;
    create_at: string;
}

type MessagesProps = {
    messages: MessageItem[];
}

export function MessagesDT({ messages }: MessagesProps) {
    return(
        <TooltipProvider>
            <div className="space-y-6">
                <PageHeader
                    title="All Messages"
                    description="Manage and qualify incoming messages from the landing page." 
                    badgeContent="Messages"
                />

                <Card className="border shadow-none">
                    <Table>
                        <TableHeader>
                            <THeader tableHeader={MESSAGE_TABLE_HEADS} />
                        </TableHeader>

                        <TableBody>
                            {messages.map((message) => (
                                <TableRow key={message.id} className="group">
                                    <MessageTBody item={message}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </TooltipProvider>
    )
}