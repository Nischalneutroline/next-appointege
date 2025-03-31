import { NextRequest, NextResponse } from "next/server";
import { serviceSchema } from "@/features/service/schemas/schema";
import { Service, Status, WeekDays } from "@/features/service/types/types";
import { ZodError } from "zod";

let services: Service[] = [
  {
    id: "1",
    title: "Premium Car Wash",
    description:
      "A thorough interior and exterior cleaning service for your vehicle.",
    estimatedDuration: 90,
    status: Status.ACTIVE,
    serviceAvailability: [
      {
        weekDay: WeekDays.MONDAY,
        timeSlots: [
          {
            startTime: "2025-04-01T08:00:00Z",
            endTime: "2025-04-01T10:00:00Z",
          },
          {
            startTime: "2025-04-01T14:00:00Z",
            endTime: "2025-04-01T16:00:00Z",
          },
        ],
      },
      {
        weekDay: WeekDays.FRIDAY,
        timeSlots: [
          {
            startTime: "2025-04-05T10:00:00Z",
            endTime: "2025-04-05T12:00:00Z",
          },
        ],
      },
    ],
  },
];

//create service
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = serviceSchema.parse(body);

    // Generate a unique id (using timestamp here, for now)
    const newService: Service = {
      ...parsedData,
      id: String(Date.now()), // Add a unique ID
    };

    services.push(newService);

    return NextResponse.json(
      { message: "Service created successfully", service: newService },
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

//fetch all service
export async function GET() {
  try {
    if (services.length === 0) {
      return NextResponse.json({ error: "No services found" }, { status: 404 });
    }
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

//edit or  update service
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = serviceSchema.parse(body);

    const { id } = body;
    const serviceIndex = services.findIndex((service) => service.id === id);

    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const updatedService = { ...services[serviceIndex], ...parsedData };
    services[serviceIndex] = updatedService;

    return NextResponse.json(
      { message: "Service updated successfully", service: updatedService },
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

//delete service
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const serviceIndex = services.findIndex((service) => service.id === id); //replace with prisma id logic

    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    services.splice(serviceIndex, 1);

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
