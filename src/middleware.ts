import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_cookie");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    await jwtVerify(token.value, new TextEncoder().encode("secreto"));

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/home",
};
