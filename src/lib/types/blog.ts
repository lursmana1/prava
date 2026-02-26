export type Blog = {
  id: number;
  name: string;
  content: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogsResponse = {
  data: Blog[];
  page: number;
  total: number;
  totalPages: number;
};
