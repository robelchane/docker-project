import connectMongoDB from "@/libs/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

// POST request to create a new property
export async function POST(request) {
  const { name, price, bedrooms, bathrooms, address, sellerName, sellerEmail, detail, summary, image } = await request.json();
  
  await connectMongoDB();
  
  // Create a new property with the provided fields
  await Property.create({ name, price, bedrooms, bathrooms, address, sellerName, sellerEmail, detail, summary, image });
  
  return NextResponse.json({ message: "Property Created" }, { status: 201 });
}

// GET request to fetch all properties
export async function GET() {
  await connectMongoDB();
  
  // Find all properties from the database
  const properties = await Property.find();
  
  return NextResponse.json({ properties });
}

// DELETE request to remove a property by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  
  await connectMongoDB();
  
  // Delete the property with the specified ID
  await Property.findByIdAndDelete(id);
  
  return NextResponse.json({ message: "Property Deleted" }, { status: 200 });
}
