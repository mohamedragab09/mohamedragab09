
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
