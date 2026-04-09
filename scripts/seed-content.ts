import { db } from "../app/lib/db/index";
import * as schema from "../app/lib/db/schema";
import { requireAdmin } from "../app/lib/session/actions";

// This script seeds initial content for the website
// Run with: pnpm tsx scripts/seed-content.ts

async function seedContent() {
  // We'll need an admin user to set createdBy. We'll fetch the first admin or null.
  const adminResult = await db.select({ userId: schema.admins.userId }).from(schema.admins).limit(1);
  const adminId = adminResult[0]?.userId || null;

  const initialContent = [
    {
      section: "hero_title",
      contentType: "text" as const,
      textValue: "The Naturist Café Community",
      imagePublicId: undefined,
      imageAlt: undefined,
      sortOrder: 1,
      active: true,
    },
    {
      section: "hero_subtitle",
      contentType: "text" as const,
      textValue:
        "A cultural association of naturists and nudists in terms of sections 30 and 31 of the Constitution of the Republic of South Africa.",
      imagePublicId: undefined,
      imageAlt: undefined,
      sortOrder: 2,
      active: true,
    },
    {
      section: "hero_image",
      contentType: "image" as const,
      textValue: undefined,
      imagePublicId: "ncc_001",
      imageAlt: "Community Directors",
      sortOrder: 3,
      active: true,
    },
    {
      section: "constitution_values",
      contentType: "html" as const,
      textValue: `<ul>
        <li>Respect for others</li>
        <li>Respect for ourselves</li>
        <li>Non-judgmentalism</li>
        <li>Non-discrimination</li>
        <li>Non-racialism</li>
        <li>Non-sexual</li>
        <li>Family-friendly</li>
        <li>Peace</li>
        <li>Safety</li>
        <li>Respect for nature</li>
      </ul>`,
      imagePublicId: undefined,
      imageAlt: undefined,
      sortOrder: 4,
      active: true,
    },
    {
      section: "constitution_image",
      contentType: "image" as const,
      textValue: undefined,
      imagePublicId: "ncc_002",
      imageAlt: "Three Naturists",
      sortOrder: 5,
      active: true,
    },
    {
      section: "markets_walks_quote",
      contentType: "text" as const,
      textValue:
        "our culture is based on going naked in order to delight in the wellness that comes with being in one's natural state, socially or individually, outdoors or indoors, without shame or fear;",
      imagePublicId: undefined,
      imageAlt: undefined,
      sortOrder: 6,
      active: true,
    },
  ];

  try {
    for (const content of initialContent) {
      // Check if section already exists
      const existing = await db
        .select()
        .from(schema.pagesContent)
        .where(eq(schema.pagesContent.section, content.section))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(schema.pagesContent).values({
          ...content,
          createdBy: adminId,
        });
        console.log(`✅ Created content for section: ${content.section}`);
      } else {
        console.log(`⏭️  Content for section "${content.section}" already exists, skipping`);
      }
    }

    console.log("\n🎉 Content seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding content:", error);
    process.exit(1);
  }
}

// Import eq
import { eq } from "drizzle-orm";

seedContent().catch((e) => {
  console.error(e);
  process.exit(1);
});
