export type Projects = {
  members: Member[];
  creator: Creator;
  id: number | string;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export type Creator = {
  id: number;
  name: string;
}

export type Member = {
  userId: number;
  name: string;
  avatar: string;
}
export type CreateProject = {
  projectName: string;
  alias:     string;
  description: string;
  categoryId:  number;
}

export type UpdateProject = {
  id:          number | string | undefined;
  projectName: string;
  creator:     number;
  description: string;
  categoryId:  number;
}
