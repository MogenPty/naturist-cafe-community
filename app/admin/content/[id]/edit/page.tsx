import { notFound } from "next/navigation";
import ContentForm from "../../../../components/admin/ContentForm";
import { getContentById } from "../../../../lib/db/queries";

interface EditContentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditContentPage({
  params,
}: EditContentPageProps) {
  const { id } = await params;
  const content = await getContentById(id);

  if (!content) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Content</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <ContentForm content={content} />
      </div>
    </div>
  );
}
