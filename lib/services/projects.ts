
import { 
  ApiError, 
  ApiResponse, 
  CreateProjectInput, 
  Project, 
  UpdateProjectInput 
} from "../types/projects";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type ProjectId = Project["id"];

async function parseResponse<T>(response: Response): Promise<T> {
  const data: unknown = await response.json();

  if (!response.ok) {
    const errorData = data as Partial<ApiError>;
    throw new Error(errorData.message || "Request failed");
  }

  return data as T;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/api/projects`);
    
  const result = await parseResponse<
    Project[] | ApiResponse<Project[]>  
  >(response);

  return Array.isArray(result) ? result : result.data;
};

export const getProjectById = async (id: ProjectId): Promise<Project> => {
  const response = await fetch(`${API_URL}/api/projects/${id}`);
  
  const result = await parseResponse<
    Project | ApiResponse<Project>  
  >(response);

  return "data" in result ? result.data : result;
};

export const createProject = async (newProject: CreateProjectInput): Promise<Project | ApiResponse<Project>> => {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    credentials: "include",
    body: JSON.stringify(newProject)
  });

  return parseResponse<Project | ApiResponse<Project>>(response);    
}

export const updateProject = async (
  id: ProjectId,
  projectData: UpdateProjectInput
): Promise<Project | ApiResponse<Project>> => {
  const response = await fetch(
    `${API_URL}/api/projects/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(projectData),
    }
  );

  return parseResponse<Project | ApiResponse<Project>>(response);
};

export const deleteProject = async (
  id: ProjectId
): Promise<void | ApiResponse<null>> => {
  const response = await fetch(
    `${API_URL}/api/projects/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (response.status === 204) {
    return;
  }

  return parseResponse<ApiResponse<null>>(response);
};