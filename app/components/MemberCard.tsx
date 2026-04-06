import { User, Users } from "lucide-react";
import type { BoardMember } from "../lib/db";

interface MemberCardProps {
  member: BoardMember;
}

interface MemberBlankCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

// React Function called MemberCard
export const MemberCard = (props: MemberCardProps) => {
  const member = props.member;
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
      {/* Profile Picture Placeholder */}
      <div className="avatar-lg bg-gradient-to-br from-nature-200 to-earth-200 rounded-full mx-auto mb-4 flex items-center justify-center">
        <User className="icon-2xl text-nature-600" />
      </div>

      {/* Member Info */}
      <h3 className="font-semibold text-lg text-gray-900 mb-2">
        {member.name}
      </h3>

      {/* Details */}
      <div className="space-y-2 text-sm">
        {(member.otherOrganizations as string[])?.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <Users className="icon-sm text-gray-500" />
            <span className="text-gray-700">
              {(member.otherOrganizations as string[]).join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const MemberBlankCard = (props: MemberBlankCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
      {/* Profile Picture Placeholder */}
      <div className="avatar-lg bg-gradient-to-br from-nature-200 to-earth-200 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Users className="icon-2xl text-nature-600" />
      </div>

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
