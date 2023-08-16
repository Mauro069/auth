import { EmailTemplate } from "@/components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User, { IUserSchema } from "@/models/User";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";

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
        { message: "Te falto enviar algo" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const headersList = headers();
    const token = headersList.get("token");

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 400 });
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");
      // @ts-ignore
      const { data }: TokenData = isTokenValid;

      const userFind = await User.findById(data.userId);

      if (!userFind) {
        return NextResponse.json(
          { message: "Usuario no existente" },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "Las contraseñas no coinciden" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      userFind.password = hashedPassword;

      await userFind.save();

      return NextResponse.json(
        { message: "Contraseña cambiada correctamente" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Token no valido", error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
