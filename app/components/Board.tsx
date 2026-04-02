import { MemberBlankCard, MemberCard } from "./MemberCard";

const Board = () => {
  // Sample board member data
  const boardMembers = [
    {
      id: 1,
      sortId: 5,
      name: "Vongani (Vonks) Nkuna",
      yearsInNaturism: 8,
      otherOrganizations: ["Naturist Café Arthouse Films"],
      communityCouncil: true,
      role: "Director",
    },
    {
      id: 2,
      sortId: 2,
      name: "Linah (Layla) Mahlomuza",
      yearsInNaturism: 12,
      otherOrganizations: ["Naturist Café Arthouse Films"],
      communityCouncil: true,
      role: "Director",
    },
    {
      id: 3,
      sortId: 3,
      name: "Solly (RealSollyM) Motsoane",
      yearsInNaturism: 6,
      otherOrganizations: ["Bare Bliss Naturists Group"],
      communityCouncil: false,
      role: "Director",
    },
    {
      id: 4,
      sortId: 7,
      name: "Valencia (Miss Vee) Mabika",
      yearsInNaturism: 15,
      otherOrganizations: ["Bare Bliss Naturists Group"],
      communityCouncil: true,
      role: "Councillor",
    },
    {
      id: 5,
      sortId: 1,
      name: "Aobakwe (Buks) Peter",
      yearsInNaturism: 4,
      otherOrganizations: [],
      communityCouncil: true,
      role: "Director",
    },
    {
      id: 6,
      sortId: 6,
      name: "Rethabile (Ree) Oitsile",
      yearsInNaturism: 10,
      otherOrganizations: [],
      communityCouncil: true,
      role: "Councillor",
    },
    {
      id: 7,
      sortId: 4,
      name: "Veronica Mabula",
      yearsInNaturism: 15,
      otherOrganizations: [],
      communityCouncil: true,
      role: "Director",
    },
  ];

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
          {boardMembers
            .sort((a, b) => a.sortId - b.sortId)
            .map((member) => (
              <MemberCard key={member.id} {...member} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Board;
