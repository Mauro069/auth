import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User, { IUser, IUserSchema } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface BodyProps extends IUser {
  confirmPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body: BodyProps = await request.json();
    const { email, password, confirmPassword } = body;

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Te falto enviar algún campo" },
        { status: 400 }
      );
    }

    if(password !== confirmPassword) {
      return NextResponse.json(
        { message: "Las contraseñas no coinciden" },
        { status: 400 }
      );
    }

    const userFind = await User.findOne({ email });

    if (userFind) {
      return NextResponse.json(
        { message: "Ya existe un usuario con ese correo" },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUserSchema = new User({
      email,
      password: hashedPassword,
    });

    // @ts-ignore
    const { password: userPass, ...rest } = newUser._doc;

    await newUser.save();

    const token = jwt.sign({ data: rest }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json({ newUser: rest }, { status: 200 });
    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error", error },
      { status: 500 }
    );
  }
}
