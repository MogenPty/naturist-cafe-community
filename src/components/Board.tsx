import { MemberCard } from "./MemberCard";

const Board = () => {
  // Sample board member data
  const boardMembers = [
    {
      id: 1,
      sortId: 5,
      name: "Vongani (Vonks) Nkuna",
      yearsInNaturism: 8,
      otherOrganizations: ["Naturist Cafe"],
      communityCouncil: true,
      role: "Director",
    },
    {
      id: 2,
      sortId: 2,
      name: "Linah (Layla) Mahlomuza",
      yearsInNaturism: 12,
      otherOrganizations: ["Naturist Cafe"],
      communityCouncil: true,
      role: "Director",
    },
    {
      id: 3,
      sortId: 3,
      name: "Solomon (Solly) Motsoane",
      yearsInNaturism: 6,
      otherOrganizations: ["Bare Bliss Naturists Group"],
      communityCouncil: false,
      role: "Director",
    },
    {
      id: 4,
      sortId: 7,
      name: "Valencia (Vally) Mabika",
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
    <section id="board" className="section-padding bg-white">
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
          {boardMembers
            .sort((a, b) => a.sortId - b.sortId)
            .map((member) => (
              <MemberCard key={member.id} {...member} />
            ))}
        </div>

        {/* Board Information */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="bg-nature-50 p-6 rounded-lg">
            <h3 className="font-semibold text-nature-800 mb-3 flex items-center gap-2">
              <svg
                className="icon-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Community Leadership
            </h3>
            <p className="text-sm text-nature-700">
              Our board consists of experienced naturists committed to fostering
              a welcoming, respectful community environment guided by naturist
              principles and values.
            </p>
          </div>

          <div className="bg-earth-50 p-6 rounded-lg">
            <h3 className="font-semibold text-earth-800 mb-3 flex items-center gap-2">
              <svg
                className="icon-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6M8 6V4"
                />
              </svg>
              Experience & Expertise
            </h3>
            <p className="text-sm text-earth-700">
              Board members bring years of naturist experience and connections
              with organizations like SANAT, ensuring informed leadership and
              community representation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;
