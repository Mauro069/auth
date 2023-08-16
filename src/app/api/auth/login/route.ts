import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body: IUser = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Te falto enviar algún campo" },
        { status: 400 }
      );
    }

    const userFind = await User.findOne({ email });

    if (!userFind) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 400 }
      );
    }

    const isCorrect: boolean = await bcrypt.compare(
      password,
      userFind.password
    );

    if (!isCorrect) {
      return NextResponse.json(
        { message: "La contraseña es incorrecta" },
        { status: 400 }
      );
    }

    const { password: userPass, ...rest } = userFind._doc;

    const token = jwt.sign({ data: rest }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      { userLogged: rest, message: "Autorizado!" },
      { status: 200 }
    );
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
