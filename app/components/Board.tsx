import type { BoardMember } from "../lib/db";
import { getActiveBoardMembers } from "../lib/db/queries";
import { MemberBlankCard, MemberCard } from "./MemberCard";

const Board = async () => {
  const boardMembers = await getActiveBoardMembers();

  return (
    <section id={"board"} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Our Board & Council
          </h2>

          {/* Preamble Quote */}
          <blockquote className="text-lg md:text-xl italic text-nature-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            "our community's cultural ambition is to live out our naturist
            customs peacefully and amicably, as much and as easily as possible,
            wherever we find ourselves."
          </blockquote>
        </div>

        {/* Board Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 max-w-6xl mx-auto">
          <MemberBlankCard title="Board Members" />
          {boardMembers.map((member: BoardMember) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Board;
