import { headers } from "next/headers";
import { getContentTextBySection } from "../lib/db/queries";
import AgeGate from "./AgeGate";

export default async function AgeGateEntry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [primaryText, secondaryText, privacyNotice] = await Promise.all([
    getContentTextBySection("age_primary_text"),
    getContentTextBySection("age_secondary_text"),
    getContentTextBySection("age_privacy_notice"),
  ]);

  const h = await headers();
  const country = h.get("x-user-country");
  const region = h.get("x-user-region");

  return (
    <AgeGate
      country={country}
      region={region}
      primaryText={primaryText}
      secondaryText={secondaryText}
      privacyNotice={privacyNotice}
    >
      {children}
    </AgeGate>
  );
}
