const Board = () => {
  // Sample board member data
  const boardMembers = [
    {
      id: 1,
      name: "Sarah Williams",
      yearsInNaturism: 8,
      otherOrganizations: ["SANAT"],
      communityCouncil: true,
      role: "Chairperson",
    },
    {
      id: 2,
      name: "Michael Johnson",
      yearsInNaturism: 12,
      otherOrganizations: ["SANAT", "Cape Naturist Society"],
      communityCouncil: true,
      role: "Vice-Chair",
    },
    {
      id: 3,
      name: "Lisa Thompson",
      yearsInNaturism: 6,
      otherOrganizations: ["SANAT"],
      communityCouncil: false,
      role: "Secretary",
    },
    {
      id: 4,
      name: "David Roberts",
      yearsInNaturism: 15,
      otherOrganizations: ["SANAT", "Western Cape Naturists"],
      communityCouncil: true,
      role: "Treasurer",
    },
    {
      id: 5,
      name: "Emma Davis",
      yearsInNaturism: 4,
      otherOrganizations: [],
      communityCouncil: false,
      role: "Events Coordinator",
    },
    {
      id: 6,
      name: "James Wilson",
      yearsInNaturism: 10,
      otherOrganizations: ["SANAT"],
      communityCouncil: true,
      role: "Community Relations",
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200"
            >
              {/* Profile Picture Placeholder */}
              <div className="avatar-lg bg-gradient-to-br from-nature-200 to-earth-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="icon-2xl text-nature-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Member Info */}
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-nature-600 font-medium mb-3">{member.role}</p>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="icon-sm text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    {member.yearsInNaturism} years in naturism
                  </span>
                </div>

                {member.otherOrganizations.length > 0 && (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="icon-sm text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {member.otherOrganizations.join(", ")}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="icon-sm text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Community Council:{" "}
                    {member.communityCouncil ? (
                      <span className="text-nature-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
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
