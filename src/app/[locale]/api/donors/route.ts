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
  try {
    const { full_name, email, phone_number, message } = await req.json();

    await dbConnect();

    if (!full_name || !email || !phone_number) {
      return NextResponse.json(
        { error: "Marked fields are required" },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Provide a valid email" },
        { status: 400 },
      );
    }

    const exists = await Donor.findOne({ email });

    if (exists) {
      return NextResponse.json(
        {
          message: "You are already a registered donor.",
        },
        { status: 409 },
      );
    }
    const newDonor = await Donor.create({
      full_name,
      email,
      phone_number,
      message,
    });

    return NextResponse.json(
      { newDonor, success: "Your Info has been received" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
