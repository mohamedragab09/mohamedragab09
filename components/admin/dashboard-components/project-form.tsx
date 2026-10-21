
"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Globe, Loader2 } from "lucide-react";

import { cn } from "cn";
import type {
    CreateProjectInput,
  Project,
  ProjectFormProps,
  ProjectFormValues,
  ProjectStack,
  Status,
  UpdateProjectInput,
} from "@/lib/types/projects";

import {
  createProject,
  getProjectById,
  updateProject,
} from "@/lib/services/projects";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PROJECT_STACK: {
  key: ProjectStack;
  label: string;
  icon: typeof Globe;
}[] = [
  { key: "full_stack", label: "Full Stack", icon: Globe },
  { key: "frontend", label: "Frontend", icon: Globe },
  { key: "backend", label: "Backend", icon: Globe },
];

const ALLOWED_STATUSES: {
  key: Status;
  label: string;
}[] = [
  { key: "done", label: "Done" },
  { key: "progress", label: "Progress" },
  { key: "waited", label: "Waited" },
];

const getEmptyForm = (): ProjectFormValues => ({
  title: "",
  description: "",
  technologies: [],
  image_url: "",
  demo: "",
  stack: "",
  status: "",
});

function projectToForm(project: Project): ProjectFormValues {
  return {
    title: project.title,
    description: project.description,
    technologies: [...project.technologies],
    image_url: project.image_url,
    demo: project.demo,
    stack: project.stack,
    status: project.status,
  };
}

export function ProjectForm(props: ProjectFormProps) {
    const { open, onOpenChange, onSave } = props;
    const mode = props.mode;

    const [project, setProject] = useState<Project | null>(null);
    const [form, setForm] = useState<ProjectFormValues>(getEmptyForm);
    const [technology, setTechnology] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [loadedProjectId, setLoadedProjectId] = useState<number | null>(null);

    const projectId = props.mode === "update" ? props.projectId : undefined;

    const loading =
    mode === "update" &&
    open &&
    projectId !== undefined &&
    loadedProjectId !== projectId &&
    !loadError;

    useEffect(() => {
        if (!open || props.mode !== "update") return;

        const id: number = props.projectId;

        let cancelled = false;

        async function fetchProject(): Promise<void> {
            try {
                const data = await getProjectById(id);

                if (cancelled) return;

                setProject(data);
                setForm(projectToForm(data));
                setLoadedProjectId(id);
            } catch (error: unknown) {
                if (cancelled) return;

                console.error("Failed to load project:", error);
                setProject(null);
                setLoadError(true);
            }
        }

        void fetchProject();

        return () => {
            cancelled = true;
        };
    }, [open, props.mode, props.projectId]);

    function handleOpenChange(nextOpen: boolean): void {
        if (nextOpen) {
            setSaved(false);
            setTechnology("");
            setLoadError(false);

            if (mode === "create") {
            setProject(null);
            setForm(getEmptyForm());
            }
        }

        onOpenChange(nextOpen);
    }

    function toggleStack(stackKey: ProjectStack): void {
        setForm((prev) => ({
        ...prev,
        stack: prev.stack === stackKey ? "" : stackKey,
        }));
    }

    function addTechnology(): void {
        const value = technology.trim();

        if (!value) return;

        setForm((prev) => {
        if (
            prev.technologies.some(
            (item) => item.toLowerCase() === value.toLowerCase()
            )
        ) {
            return prev;
        }

        return {
            ...prev,
            technologies: [...prev.technologies, value],
        };
        });

        setTechnology("");
    }

    function removeTechnology(index: number): void {
        setForm((prev) => ({
        ...prev,
        technologies: prev.technologies.filter(
            (_, currentIndex) => currentIndex !== index
        ),
        }));
    }


  async function handleSave(): Promise<void> {
    if (
      saving ||
      saved ||
      !form.title.trim() ||
      !form.description.trim() ||
      !form.stack ||
      !form.status ||
      !form.image_url.trim() ||
      form.technologies.length === 0
    ) {
      return;
    }

    if (mode === "update" && !project) {
      return;
    }

    setSaving(true);

    try {
      const commonPayload = {
        title: form.title.trim(),
        description: form.description.trim(),
        technologies: form.technologies,
        image_url: form.image_url.trim(),
        demo: form.demo.trim(),
        stack: form.stack,
        status: form.status,
      };

      let result: Project;

      if (mode === "create") {
        result = await createProject(commonPayload);
      } else {
        if (!project) return;

        const payload: UpdateProjectInput = {
          ...commonPayload,
        };

        result = await updateProject(project.id, payload);
      }

      setProject(result);
      setSaved(true);
      onSave?.(result);
      onOpenChange(false);
    } catch (error: unknown) {
      console.error(
        "Failed to save project:",
        error instanceof Error ? error.message : error
      );
    } finally {
      setSaving(false);
    }
  }

    if (
        mode === "update" &&
        open &&
        (loading || loadError || !project)
    ) {
        return (
            <Sheet open={open} onOpenChange={handleOpenChange}>
                <SheetContent
                    side="right"
                    className="sm:max-w-135 overflow-y-auto p-6"
                >
                    <SheetHeader>
                        <SheetTitle>
                            {loading
                            ? "Loading project..."
                            : "Unable to load project"}
                        </SheetTitle>

                        <SheetDescription>
                            {loading
                            ? "Please wait while the project is loaded."
                            : "Close this panel and try again."}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>    
        );
    }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-135 overflow-y-auto p-0 gap-0"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
              {mode === "update" ? project?.id : "+"}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <SheetTitle className="text-base leading-tight">
                {mode === "update" ? "Edit Project" : "Create Project"}
              </SheetTitle>

              <Input
                aria-label="Project title"
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
                placeholder="Project title"
              />

              <SheetDescription className="text-xs truncate">
                {form.stack || "No stack selected"} ·{" "}
                {form.status || "No status selected"}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 py-5 space-y-6">
          <section>
            <Label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
              Stacks Available
            </Label>

            <div className="grid grid-cols-2 gap-2">
              {PROJECT_STACK.map(({ key, label, icon: Icon }) => {
                const active = form.stack === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleStack(key)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-150 text-left",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted/50"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-70" />
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <Label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase block">
              Technologies
            </Label>

            <div className="space-y-1.5">
              <Label htmlFor="technologies" className="text-xs text-muted-foreground">
                Add Technology
              </Label>

              <div className="flex gap-2">
                <Input
                  id="technologies"
                  value={technology}
                  onChange={(event) => setTechnology(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTechnology();
                    }
                  }}
                  placeholder="React"
                  className="h-9"
                />

                <Button
                  type="button"
                  className="h-9"
                  onClick={addTechnology}
                >
                  Add
                </Button>
              </div>
            </div>

            {form.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {form.technologies.map((tech, index) => (
                  <div
                    key={`${tech}-${index}`}
                    className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm"
                  >
                    <span>{tech}</span>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Remove ${tech}`}
                      onClick={() => removeTechnology(index)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Separator />

          <section className="space-y-1.5">
            <Label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Project Status
            </Label>

            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  status: value as Status,
                }))
              }
            >
              <SelectTrigger className="h-9 text-sm w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                {ALLOWED_STATUSES.map(({ key, label }) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="image"
                className="text-xs font-semibold tracking-widest text-muted-foreground uppercase"
              >
                Image URL
              </Label>

              <Input
                id="image"
                type="url"
                value={form.image_url}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    image_url: event.target.value,
                  }))
                }
                placeholder="https://..."
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="demo"
                className="text-xs font-semibold tracking-widest text-muted-foreground uppercase"
              >
                Demo URL
              </Label>

              <Input
                id="demo"
                type="url"
                value={form.demo}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    demo: event.target.value,
                  }))
                }
                placeholder="https://..."
              />
            </div>
          </section>

          <Separator />

          <section className="space-y-1.5">
            <Label
              htmlFor="description"
              className="text-xs font-semibold tracking-widest text-muted-foreground uppercase"
            >
              Project Description
            </Label>

            <Textarea
              id="description"
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              rows={4}
              className="resize-none text-sm leading-relaxed"
            />
          </section>

          <Button
            type="button"
            className={cn(
              "w-full h-11 font-semibold tracking-wide transition-all duration-300",
              saved && "bg-emerald-600 hover:bg-emerald-600"
            )}
            disabled={
              saving ||
              saved ||
              !form.stack ||
              !form.status ||
              !form.title.trim()
            }
            onClick={() => void handleSave()}
          >
            {saved ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {mode === "create" ? "Created" : "Saved"}
              </>
            ) : saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "create" ? "Creating..." : "Saving..."}
              </>
            ) : mode === "create" ? (
              "Create Project"
            ) : (
              "Save Updates"
            )}
          </Button>

          {(!form.stack || !form.status) && (
            <p className="text-center text-xs text-muted-foreground -mt-2">
              Select a stack and status to save.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
