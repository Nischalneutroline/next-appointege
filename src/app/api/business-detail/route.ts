import { NextRequest, NextResponse } from "next/server";
import { businessDetailSchema } from "@/features/business-detail/schemas/schema";
import { BusinessDetail } from "@/features/business-detail/types/types";
import { ZodError } from "zod";
import {
  BusinessStatus,
  WeekDays,
  HolidayType,
  AvailabilityType,
} from "@/features/business-detail/types/types";

const businessDetails: BusinessDetail[] = [
  {
    id: "business-id-123",
    name: "Tech Solutions Pvt. Ltd.",
    industry: "IT Services",
    email: "contact@techsolutions.com",
    phone: "+977 1 4002000",
    website: "https://www.techsolutions.com",
    businessRegistrationNumber: "BRN-12345",
    status: BusinessStatus.ACTIVE,
    address: [
      {
        id: "address-id-1",
        street: "123 Main Street",
        city: "Kathmandu",
        country: "Nepal",
        zipCode: "44600",
        googleMap: "https://goo.gl/maps/1234xyz",
      },
      {
        id: "address-id-2",
        street: "456 Secondary Street",
        city: "Pokhara",
        country: "Nepal",
        zipCode: "33700",
        googleMap: "https://goo.gl/maps/abcd1234",
      },
    ],
    businessAvailability: [
      {
        id: "availability-id-1",
        weekDay: WeekDays.MONDAY,
        type: AvailabilityType.GENERAL, // Only 'GENERAL' for Business
        timeSlots: [
          {
            id: "time-slot-id-1",
            startTime: "2025-03-01T09:00:00Z",
            endTime: "2025-03-01T17:00:00Z",
          },
          {
            id: "time-slot-id-2",
            startTime: "2025-03-02T09:00:00Z",
            endTime: "2025-03-02T17:00:00Z",
          },
        ],
      },
    ],
    holiday: [
      {
        id: "holiday-id-1",
        holiday: WeekDays.SATURDAY,
        type: HolidayType.GENERAL, // Only 'GENERAL' for Business Holidays
        date: "2025-04-15T00:00:00Z",
      },
    ],
  },
];

// Create a new business detail
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = businessDetailSchema.parse(body);

    // Helper function to generate unique IDs
    const generateId = () =>
      String(Date.now()) + Math.random().toString(36).slice(2, 11);

    // Generate a unique ID for the business (using timestamp here)
    const newBusiness: BusinessDetail = {
      ...parsedData,
      id: generateId(),

      address: parsedData.address.map((addr) => ({
        ...addr,
        id: generateId(),
      })),

      businessAvailability: parsedData.businessAvailability.map(
        (availability) => ({
          ...availability,
          id: generateId(),
          timeSlots: availability.timeSlots.map((slot) => ({
            ...slot,
            id: generateId(),
          })),
        })
      ),

      holiday: parsedData.holiday.map((holiday) => ({
        ...holiday,
        id: generateId(),
      })),
    };
    businessDetails.push(newBusiness);

    return NextResponse.json(
      { message: "Business created successfully", business: newBusiness },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
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

// Fetch all business details
export async function GET() {
  try {
    if (businessDetails.length === 0) {
      return NextResponse.json(
        { error: "No business details found" },
        { status: 404 }
      );
    }
    return NextResponse.json(businessDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch business details" },
      { status: 500 }
    );
  }
}

// Update an existing business detail
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = businessDetailSchema.parse(body);

    const { id } = body;
    const businessIndex = businessDetails.findIndex(
      (business) => business.id === id
    );

    if (businessIndex === -1) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    const updatedBusiness = {
        ...businessDetails[businessIndex],
        ...parsedData,
        address: parsedData.address.map((addr) => ({
          ...addr,
          id: generateId(),  // Add a unique ID to each address
        })),
        businessAvailability: parsedData.businessAvailability.map((availability) => ({
          ...availability,
          id: generateId(),  // Add a unique ID to each availability
          timeSlots: availability.timeSlots.map((slot) => ({
            ...slot,
            id: generateId(),  // Add a unique ID to each timeSlot
          }))
        })),
        holiday: parsedData.holiday.map((holiday) => ({
          ...holiday,
          id: generateId(),  // Add a unique ID to each holiday
        })),
      };
      
      
    businessDetails[businessIndex] = updatedBusiness;

    return NextResponse.json(
      { message: "Business updated successfully", business: updatedBusiness },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
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

// Delete a business detail
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const businessIndex = businessDetails.findIndex(
      (business) => business.id === id
    );

    if (businessIndex === -1) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    businessDetails.splice(businessIndex, 1);

    return NextResponse.json(
      { message: "Business deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete business" },
      { status: 500 }
    );
  }
}
function generateId(): any {
    throw new Error("Function not implemented.");
}

