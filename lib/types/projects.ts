import { Status } from "@/components/admin/dashboard-components/status-badge";

export type ProjectStack = "full_stack" | "frontend" | "backend";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url: string ;
  github: string | null;
  demo: string;
  createdAt: string;
  updatedAt: string;
  stack: ProjectStack;
  status: Status;
}

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
