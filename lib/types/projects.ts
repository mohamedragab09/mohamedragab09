
export type ProjectStack = "full_stack" | "frontend" | "backend";

export const STATUS_CONFIG = {
  progress: {
    label: "Progress",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  done: {
    label: "Done ✓",
    className: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
  waited: {
    label: "Waited",
    className: "bg-zinc-100 text-zinc-500 border-zinc-200",
    dot: "bg-zinc-400",
  },
} as const;

export type Status = keyof typeof STATUS_CONFIG;

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  demo: string;
  createdAt: string;
  updatedAt: string;
  stack: ProjectStack;
  status: Status;
}

export type ProjectFormValues = {
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  demo: string;
  stack: ProjectStack | "";
  status: Status | "";
};

export type CreateProjectInput = Omit<
  Project,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateProjectInput = Partial<CreateProjectInput>;

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
}

type ProjectFormBaseProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (project: Project) => void;
};

export type ProjectFormProps = ProjectFormBaseProps &
  (
    | {
        mode: "create";
        projectId?: never;
      }
    | {
        mode: "update";
        projectId: Project["id"];
      }
  );
