import BaseApi from "@/api/BaseApi";
import BlogIntroduction from "@/components/Blogs/BlogIntroduction";
import BlogPagination from "@/components/antComponents/AntPagination/BlogPagination";
import type { Blog, BlogsResponse } from "@/lib/types/blog";

type PageProps = {
  searchParams?: Promise<{ page?: string; size?: string }>;
};

export default async function BlogsPage({ searchParams }: PageProps) {
  const sp = searchParams ? await searchParams : {};
  const page = Number(sp.page ?? "1");

  const res = await BaseApi.get<BlogsResponse>("/blogs", {
    params: { page, size: 10 },
  });

  const { data, page: resPage, total } = res.data;
  const pagination = {
    page: resPage ?? page,
    size: 10,
    total: total ?? data.length,
  };

  return (
    <div className="section py-8">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>
      <div className="space-y-0">
        {data.map((blog: Blog) => (
          <BlogIntroduction key={blog.id} {...blog} />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <BlogPagination
          page={pagination.page}
          size={pagination.size}
          total={pagination.total}
        />
      </div>
    </div>
  );
}
