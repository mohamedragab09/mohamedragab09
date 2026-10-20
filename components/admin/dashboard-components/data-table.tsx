"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Search,
  MoreHorizontal,
  ClipboardList,
  Eye,
  Users,
  ArrowRight,
  CircleDollarSign,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { StatusBadge } from "./status-badge";
import { toast } from "sonner";
import { Project } from "@/components/landing-page/ui/project-card";
import { deleteProject } from "@/lib/services/projects";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ProjectId = Project["id"];
type ProjectStack = "full_stack" | "frontend" | "backend";
type FilterTab = "all" | ProjectStack;
type FilterTabItem = {
  key: FilterTab;
  label: string;
};

const FILTER_TABS = [
  { key: "all", label: "All Projects" },
  { key: "full_stack", label: "Full Stack" },
  { key: "frontend", label: "Fronend" },
  { key: "backend", label: "Backend" },
] satisfies FilterTabItem[];

// Stat Card
function StatCard({
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

//  Avatar initials
function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
      {initials}
    </div>
  );
}

//  Main Component 
export default function DataTable({ projects }: {projects: Project[]}) {
  const [projectsList, setProjects] = useState<Project[]>(projects);

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);

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
    return projectsList
      .filter(l => {
        const matchStatus = filter === "all" || l.stack === filter;
        const q = search.toLowerCase();
        const matchSearch = !q ||
          l.title.toLowerCase().includes(q) ||
          (l.stack ?? "").toLowerCase().includes(q);
        return matchStatus && matchSearch;
      })
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl text-primary font-bold tracking-tight">All Projects</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and qualify incoming projects from the landing page.
            </p>
          </div>
          <Badge
            variant="outline"
            className="gap-1.5 text-xs shrink-0 py-1 cursor-pointer"
            onClick={openCreateSheet}
          >
            <ArrowRight className="h-3 w-3" />
            Add new project
          </Badge>
        </div>

        {/* ── Stack ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Total Projects" value={stack.total} icon={Users} accent="bg-blue-100 text-blue-600" />
          <StatCard label="Full Stack" value={stack.full_stack} icon={ClipboardList} accent="bg-emerald-100 text-emerald-600" />
          <StatCard label="Frontend" value={stack.frontend} icon={CircleDollarSign} accent="bg-violet-100 text-violet-600" />
          <StatCard label="Backend" value={stack.backend} icon={TrendingUp} accent="bg-amber-100 text-amber-600" />
        </div>


        {/* ── Filters + Search ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            {FILTER_TABS.map(({ key, label }) => {
              const count = key === "all" ? projectsList.length : projectsList.filter(l => l.stack === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                    filter === key
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  )}
                >
                  {label}
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    filter === key ? "bg-background/20 text-background" : "bg-background text-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm text-primary"
            />
          </div>
        </div>

        {/* ── Table ── */}
        <Card className="border shadow-none">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-55">Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Stack</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
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

                    {/* Title */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={project.title} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">{project.title}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Image */}
                    <TableCell>
                      <Image 
                        src={project.image_url} 
                        alt={project.title}
                        width={40} 
                        height={40} 
                        className="rounded-md w-18 h-10" 
                       />
                    </TableCell>

                    {/* Stack */}
                    <TableCell>
                      <p className="text-sm text-foreground">{FILTER_TABS.find(s => s.key === project.stack)?.label}</p>
                    </TableCell>

                    {/* status */}
                    <TableCell>
                      <StatusBadge status={project.status} />
                    </TableCell>


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
        {/* <ProjectForm
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

        <ProjectForm
          mode="create"
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onSave={(newProject) => {
            setProjects(prev => [...prev, newProject]);
          }}
        /> */}
      </div>
    </TooltipProvider>
  );
}