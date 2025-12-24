interface MemberCardProps {
  id: number;
  name: string;
  yearsInNaturism: number;
  otherOrganizations: string[];
  communityCouncil: boolean;
  role: string;
}

interface MemberBlankCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

// React Function called MemberCard
export const MemberCard = (member: MemberCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
      {/* Profile Picture Placeholder */}
      <div className="avatar-lg bg-gradient-to-br from-nature-200 to-earth-200 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg
          className="icon-2xl text-nature-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <title>Member Icon</title>
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
        {member.otherOrganizations.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="icon-sm text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Organisations</title>
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
      </div>
    </div>
  );
};

export const MemberBlankCard = (props: MemberBlankCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 flex items-center justify-center">
      {/* Member Info */}
      {props.title && (
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {props.title}
        </h3>
      )}
      {props.subtitle && (
        <p className="text-nature-600 font-medium mb-3">{props.subtitle}</p>
      )}

      {/* Details */}
      {props.description && (
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-700">{props.description}</span>
          </div>
        </div>
      )}
    </div>
  );
};
