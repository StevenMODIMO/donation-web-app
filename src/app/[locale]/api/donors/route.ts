import { dbConnect } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";
import Donor from "@/models/Donor";
import { isEmail } from "validator";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const donors = await Donor.find();
    return NextResponse.json(donors, {
      status: 200,
      statusText: "Donors returned successfully",
    });
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  const { full_name, email, phone_number, message } = await req.json();
  try {
    await dbConnect()
    if (!full_name || !email || !phone_number) {
      return NextResponse.json({ error: "Marked fields are required" });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Provide a valid email" });
    }

    const newDonor = await Donor.create({
      full_name,
      email,
      phone_number,
      message,
    });
    return NextResponse.json(newDonor, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
