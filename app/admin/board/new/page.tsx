import BoardMemberForm from "@/components/admin/BoardMemberForm";

export default function NewBoardMemberPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Board Member</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <BoardMemberForm member={null} />
      </div>
    </div>
  );
}
