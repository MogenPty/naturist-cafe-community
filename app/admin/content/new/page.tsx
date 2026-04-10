import ContentForm from "@/components/admin/ContentForm";

export default function NewContentPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Content</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <ContentForm content={null} />
      </div>
    </div>
  );
}
