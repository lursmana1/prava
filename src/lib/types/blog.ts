export type BlogCreator = {
  name: string;
};

export type Blog = {
  id: number;
  name: string;
  content: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  creator?: BlogCreator;
};

export type BlogsResponse = {
  data: Blog[];
  page: number;
  total: number;
  totalPages: number;
};
