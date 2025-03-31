import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { faqSchema } from "@/features/faq/schemas/schema";
import { FAQ } from "@/features/faq/types/types";

const dummyFAQs: FAQ[] = [
  {
    id: "1",
    question: "How can I reset my password?",
    answer:
      "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions.",
    category: "General",
    isActive: true,
    order: 1,
    lastUpdatedById: "user123",
    createdById: "admin1",
  },
  {
    id: "2",
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team by emailing support@ourcompany.com or calling (123) 456-7890.",
    category: "Support",
    isActive: true,
    order: 2,
    lastUpdatedById: "user124",
    createdById: "admin2",
  },
  {
    id: "3",
    question: "What payment methods are accepted?",
    answer: "We accept credit/debit cards, PayPal, and bank transfers.",
    category: "Billing",
    isActive: true,
    order: 3,
    lastUpdatedById: "user125",
    createdById: "admin3",
  },
  {
    id: "4",
    question: "Where can I view my order history?",
    answer:
      "You can view your order history by logging into your account and navigating to the 'Orders' section.",
    category: "General",
    isActive: false, // Inactive FAQ
    order: 4,
    lastUpdatedById: "user126",
    createdById: "admin4",
  },
];

// POST: Create new FAQ
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = faqSchema.parse(body);

    // Create a new FAQ entry
    const newFAQ: FAQ = {
      ...parsedData,
      id: String(Date.now()), // Generate a unique ID for the new FAQ
    };

    dummyFAQs.push(newFAQ); // Add new FAQ to the array (or save to DB in a real scenario)

    return NextResponse.json(
      {
        message: "FAQ created successfully",
        faq: newFAQ,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all FAQs
export async function GET() {
  try {
    if (dummyFAQs.length === 0) {
      return NextResponse.json({ error: "No FAQs found" }, { status: 404 });
    }

    return NextResponse.json(dummyFAQs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing FAQ
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = faqSchema.parse(body);
    const { id } = body;

    // Find the FAQ by ID
    const faqIndex = dummyFAQs.findIndex((faq) => faq.id === id);

    if (faqIndex === -1) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    // Update the FAQ
    const updatedFAQ = { ...dummyFAQs[faqIndex], ...parsedData };
    dummyFAQs[faqIndex] = updatedFAQ;

    return NextResponse.json(
      { message: "FAQ updated successfully", faq: updatedFAQ },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an FAQ
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = faqSchema.parse(body);
    const { id } = body;

    // Find the FAQ by ID
    const faqIndex = dummyFAQs.findIndex((faq) => faq.id === id);

    if (faqIndex === -1) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    // Delete the FAQ
    dummyFAQs.splice(faqIndex, 1); // Remove from the array (or delete from DB in real scenarios)

    return NextResponse.json(
      { message: "FAQ deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
