import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { messages } from "@/utils/messages";

interface BodyProps {
  newPassword: string;
  confirmPassword: string;
}

interface TokenData {
  data: {
    email: string;
    userId: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BodyProps = await request.json();

    const { confirmPassword, newPassword } = body;

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const headersList = headers();
    const token = headersList.get("token");

    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 400 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");
      // @ts-ignore
      const { data }: TokenData = isTokenValid;

      const userFind = await User.findById(data.userId);

      if (!userFind) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: messages.error.passwordsNotMatch },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      userFind.password = hashedPassword;

      await userFind.save();

      return NextResponse.json(
        { message: messages.success.passwordChanged },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid, error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
