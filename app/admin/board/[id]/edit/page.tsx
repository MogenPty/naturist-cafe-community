import { notFound } from "next/navigation";
import { getBoardMemberById } from "@/lib/db/queries";
import BoardMemberForm from "@/components/admin/BoardMemberForm";

interface EditBoardMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBoardMemberPage({ params }: EditBoardMemberPageProps) {
  const { id } = await params;
  const member = await getBoardMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Board Member</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <BoardMemberForm member={member} />
      </div>
    </div>
  );
}
