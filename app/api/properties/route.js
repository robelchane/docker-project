import connectMongoDB from "@/libs/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

// POST request to create a new property
export async function POST(request) {
  const { name, price, bedrooms, bathrooms, address, sellerName, sellerEmail, detail, summary, image } = await request.json();
  
  await connectMongoDB();
  
  const existingProperty = await Property.findOne({ $or: [{ name }, { address }] });

  if (existingProperty) {
    return NextResponse.json({ message: "Property already exists" }, { status: 409 });
  }

  await Property.create({ name, price, bedrooms, bathrooms, address, sellerName, sellerEmail, detail, summary, image });
  
  return NextResponse.json({ message: "Property Created" }, { status: 201 });
}

// GET request to fetch all properties
export async function GET() {
  await connectMongoDB();
  
  const properties = await Property.find();
  
  return NextResponse.json({ properties });
}

// DELETE request to remove a property by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  
  await connectMongoDB();

  // Find property by ID before attempting to delete
  const property = await Property.findById(id);

  if (!property) {
    return NextResponse.json({ message: "Property not found" }, { status: 404 });
  }

  await Property.findByIdAndDelete(id);

  return NextResponse.json({ message: "Property Deleted" }, { status: 200 });
}

// PUT request to update a property by ID
export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const updatedData = await request.json();

  await connectMongoDB();

  const property = await Property.findById(id);

  if (!property) {
    return NextResponse.json({ message: "Property not found" }, { status: 404 });
  }

  Object.assign(property, updatedData); // Update with new data
  await property.save();

  return NextResponse.json({ message: "Property Updated", property }, { status: 200 });
}
