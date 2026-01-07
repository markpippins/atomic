export interface SubItem {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'complete';
}

export interface Requirement {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'complete';
  technologies: string[];
  subItems: SubItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRequirementDto {
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'complete';
  technologies: string[];
}

export interface UpdateRequirementDto {
  name?: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'complete';
  technologies?: string[];
}
