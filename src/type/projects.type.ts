export type Projects = {
  members: Member[];
  creator: Creator;
  id: number;
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