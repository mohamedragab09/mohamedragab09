"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import {
  MoreHorizontal,
  ClipboardList,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { deleteProject } from "@/lib/services/projects";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Project, ProjectStack } from "@/lib/types/projects";
import { PageHeader } from "../dashpage-content.tsx/page-header";
import { PageCards } from "../dashpage-content.tsx/page-cards";
import { FilterTapsAndSearch } from "../dashpage-content.tsx/filterstaps-search";
import { ProjectForm } from "../project-form";
import { ProjectTBody, THeader } from "../dashboard-table.tsx/table-header";

type ProjectId = Project["id"];

export type FilterTab = "all" | ProjectStack;

type FilterTabItem = {
  key: FilterTab;
  label: string;
};

export const FILTER_TABS = [
  { key: "all", label: "All Projects" },
  { key: "full_stack", label: "Full Stack" },
  { key: "frontend", label: "Fronend" },
  { key: "backend", label: "Backend" },
] satisfies FilterTabItem[];

const PROJECT_TABLE_HEADS = [
  "Title",
  "Image",
  "Stack",
  "Status",
  "Actions",
];

export function ProjectsDT({ projects }: {projects: Project[]}) {
    const [projectsList, setProjects] = useState<Project[]>(projects);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
    const [activeProject, setActiveProject] = useState<number | null>(null);

    const [filter, setFilter] = useState<FilterTab>("all");
    const [search, setSearch] = useState<string>("");

    //stack
    const stack = useMemo(() => ({
        total: projectsList.length,
        full_stack: projectsList.filter(l => l.stack === "full_stack").length,
        frontend: projectsList.filter(l => l.stack === "frontend").length,
        backend: projectsList.filter(l => l.stack === "backend").length,
    }), [projectsList]);

    // filtered + sorted
    const displayed = useMemo(() => {
        return projectsList.filter(
            l => {
            const matchStatus = filter === "all" || l.stack === filter;
            const q = search.toLowerCase();
            const matchSearch = !q ||
                l.title.toLowerCase().includes(q) ||
                (l.stack ?? "").toLowerCase().includes(q);
            return matchStatus && matchSearch;
            }
        )
    }, [projectsList, filter, search]);

    function openCreateSheet() {
        setIsCreateOpen(true);
    }

    function openUpdateSheet(project: Project) {
        setActiveProject(project.id);
        setIsUpdateOpen(true);
    }

    async function handleDeleting(projectId: ProjectId) {
        try {
            await deleteProject(projectId);

            setProjects(prev =>
                prev.filter(project => project.id !== projectId)
            );

            toast.success("Project deleted successfully");

        } catch (error: unknown) {
            console.error("Delete project error:", error);

            toast.error(error instanceof Error ? error.message : "Failed to delete project");
        }
    }
    
    return (
        <TooltipProvider>
            <div className="space-y-6">
                {/* ── Page header ── */}
                <PageHeader
                    title={"All Projects"} 
                    description={"Manage and qualify incoming projects from the landing page."} 
                    badgeFunc={openCreateSheet} 
                    badgeContent={"Add new project"} 
                />
        
                {/* ──Page Cards ── */}
                <PageCards stack={stack} />
        
                {/* ── Filters + Search ── */}
                <FilterTapsAndSearch
                    projectsList={projectsList} 
                    filter={filter} 
                    setFilter={setFilter} 
                    search={search} 
                    setSearch={setSearch} 
                />
        
                {/* ── Table ── */}
                <Card className="border shadow-none">
                    <Table>
                        <TableHeader>
                            <THeader tableHeader={PROJECT_TABLE_HEADS} />
                        </TableHeader>
            
                        <TableBody>
                            {displayed.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-16 text-center text-sm text-muted-foreground">
                                        No projects match your search.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayed.map(project => (
                                    <TableRow key={project.id} className="group">
                                        <ProjectTBody item={project}/>
                    
                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-50 transition-opacity group-hover:opacity-100">
                                                <Tooltip>
                                                    <TooltipTrigger
                                                        render={
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7"
                                                                onClick={() => openUpdateSheet(project)}
                                                            >
                                                                <ClipboardList className="h-3.5 w-3.5" />
                                                            </Button>
                                                        }
                                                    />
                                                    <TooltipContent>
                                                        Update Project
                                                    </TooltipContent>
                                                </Tooltip>
                        
                                                <DropdownMenu>
                                                <DropdownMenuTrigger render={
                                                    <Button variant="ghost" size="icon" className="h-7 w-7" >
                                                        <MoreHorizontal className="h-3.5 w-3.5" />
                                                    </Button>
                                                }>
                                                    
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44">
                                                    <DropdownMenuItem onClick={() => openUpdateSheet(project)}>
                                                        <ClipboardList className="mr-2 h-3.5 w-3.5" />
                                                        Update Project
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-3.5 w-3.5" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => handleDeleting(project.id)}
                                                    >
                                                        Delete Project
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
            
                    {/* Footer */}
                    <div className="flex items-center justify-between border-t px-4 py-2.5">
                        <p className="text-xs text-muted-foreground">
                            Showing <strong>{displayed.length}</strong> of <strong>{projects.length}</strong> projects
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Last updated: just now
                        </p>
                    </div>
                </Card>
        
                {/* ── project form (creating & updating a project) ── */}
                {activeProject !== null && (
                <ProjectForm
                    mode="update"
                    projectId={activeProject}
                    open={isUpdateOpen}
                    onOpenChange={setIsUpdateOpen}
                    onSave={(updatedProject) => {
                        setProjects(prev =>
                            prev.map(project =>
                            project.id === updatedProject.id
                                ? updatedProject
                                : project
                            )
                        );
                    }}
                />
                )}
        
                <ProjectForm
                    mode="create"
                    open={isCreateOpen}
                    onOpenChange={setIsCreateOpen}
                    onSave={(newProject) => {
                        setProjects(prev => [...prev, newProject]);
                    }}
                />
            </div>
        </TooltipProvider>
    );
}