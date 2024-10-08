import connectMongoDB from "@/libs/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

// PUT request to update a property by ID
export async function PUT(request, { params }) {
  const { id } = params;
  
  // Destructure the request body to get the updated property data
  const { name, price, bedrooms, bathrooms, address, sellerName, sellerEmail, detail, summary, image } = await request.json();
  
  await connectMongoDB();
  
  // Update the property with the provided fields
  await Property.findByIdAndUpdate(id, { name, price, bedrooms, bathrooms, address, sellerName, sellerEmail, detail, summary, image });
  
  return NextResponse.json({ message: "Property updated" }, { status: 200 });
}
