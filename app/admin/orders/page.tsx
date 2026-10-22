import { MessagesDT } from "@/components/admin/dashboard-components/pages/messages-data-table";
import { getMessages } from "@/lib/services/contact-client";

export default async function Page() {
    const messages = await getMessages();

    console.log(messages);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {messages.length > 0 ? (
                <MessagesDT messages={messages} />
            ) : (
                <p>No Messages found.</p>
            )}
        </div>
    )
}
