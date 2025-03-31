import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/features/user/schemas/schema";
import { User, Role } from "@/features/user/types/types";
import { z } from "zod";

let users: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    password: "SecurePass123!",
    name: "John Doe",
    phone: "+1234567890",
    role: Role.USER,
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA",
      zipCode: "10001",
    },
  },
];

// POST: Create new User
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = userSchema.parse(body);

    // Create a new user
    const newUser: User = {
      ...parsedData,
      id: String(Date.now()),
      role: Role[parsedData.role as keyof typeof Role], // Generate a unique ID for the new user
    };

    users.push(newUser); // Add the new user to the array (or save to DB in a real scenario)

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
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

// GET: Retrieve all Users
export async function GET() {
  try {
    if (users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing User
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = userSchema.parse(body);
    const { id } = body;

    // Find the user by email (in a real scenario, use a unique identifier like userId)
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user
    const updatedUser = {
      ...users[userIndex],
      ...parsedData,
      role: Role[parsedData.role as keyof typeof Role],
    };
    users[userIndex] = updatedUser;

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
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

// DELETE: Delete a User
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = userSchema.parse(body);
    const { id } = body;

    // Find the user by email
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete the user
    users.splice(userIndex, 1); // Remove from the array (or delete from DB in real scenarios)

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
