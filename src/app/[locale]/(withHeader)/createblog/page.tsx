import CreateBlogForm from "@/components/CreateBlogForm/CreateBlogForm";

export default function CreateBlogPage() {
  return (
    <main className="section flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="mb-8 text-3xl font-semibold">Create Blog</h1>
        <CreateBlogForm />
      </div>
    </main>
  );
}
