import DataTable from "@/components/admin/dashboard-components/data-table";
import { getProjects } from "@/lib/services/projects";

export default async function Page() {
    const projects = await getProjects();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {projects.length > 0 ? (
                <DataTable projects={projects} />
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    )
}