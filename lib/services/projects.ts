
import type {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
} from "../types/projects";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type ProjectId = Project["id"];

export const getProjects = async () => {
  try{
    const response = await fetch(`${API_URL}/api/projects`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Projects failed:", error);
    throw error;
  }
};

export const getProjectById = async ( id: ProjectId ) => {
  try {
    const response = await fetch(`${API_URL}/api/projects/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Project failed:", error);
    throw error;
  }
};

export const createProject = async ( newProject: CreateProjectInput ) => {
  try {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newProject),
    });
  
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Validation errors:", data?.errors);
      throw new Error(
        data?.errors
          ?.map(
            (issue: { field: string; message: string }) =>
              `${issue.field}: ${issue.message}`
          )
          .join(", ") || data?.message || `HTTP error! Status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Fetch Project failed:", error);
    throw error;
  }
};

export const updateProject = async (
  id: ProjectId,
  projectData: UpdateProjectInput 
) => {
  try {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Project failed:", error);
    throw error;
  }
};

export const deleteProject = async ( id: ProjectId ) => {
  try {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Project failed:", error);
    throw error;
  }
};
