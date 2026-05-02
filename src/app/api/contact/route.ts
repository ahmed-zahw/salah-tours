import { NextResponse } from "next/server";
import { AppDataSource, initializeDB } from "@lib/db";
import { ContactInfo } from "@entities/ContactInfo";

interface UpdateContactInfoDTO {
  phone?: string;
  email?: string;
  supportEmail?: string;
  address?: string;
  city?: string;
  workingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  description?: string;
}

export async function GET() {
  try {
    await initializeDB();
    const contactInfoRepository = AppDataSource.getRepository(ContactInfo);
    const contactInfo = await contactInfoRepository.findOne({
      where: { id: 1 },
    });

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await initializeDB();
    const body = await request.json();
    const data: UpdateContactInfoDTO = body;

    const result = await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      let contactInfo = await transactionalEntityManager.findOne(ContactInfo, {
        where: { id: 1 },
      });

      if (contactInfo) {
        // Update existing contact info
        Object.assign(contactInfo, data);
      } else {
        // Create new contact info if it doesn't exist
        contactInfo = transactionalEntityManager.create(ContactInfo, {
          id: 1,
          ...data,
        });
      }

      await transactionalEntityManager.save(ContactInfo, contactInfo);
      return contactInfo;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update contact info" },
      { status: 500 }
    );
  }
}
