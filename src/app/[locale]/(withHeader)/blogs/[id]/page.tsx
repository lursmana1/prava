import BaseApi from "@/api/BaseApi";
import { sanitizeHtml } from "@/lib/sanitize";
import type { Blog } from "@/lib/types/blog";
import Image from "next/image";
import { notFound } from "next/navigation";

function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ka-GE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

type Props = { params: Promise<{ id: string }> };

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  let blog: Blog;

  try {
    const res = await BaseApi.get(`/blogs/${id}`);
    blog = res.data;
  } catch {
    notFound();
  }

  return (
    <div className="section py-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{blog.name}</h1>
        <div className="flex items-center gap-2 text-slate-500 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <time
            dateTime={
              typeof blog.createdAt === "string"
                ? blog.createdAt
                : blog.createdAt.toISOString()
            }
          >
            {formatDate(blog.createdAt)}
          </time>
        </div>
        {blog.imageUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 mb-8">
            <Image
              src={blog.imageUrl}
              alt={blog.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        // aq tip tap dasiwrbdea
        <div
          className="tiptap-prose"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content ?? "") }}
        />
      </article>
    </div>
  );
}
