import { NextResponse } from "next/server";
import { registerUser, RLSError } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await registerUser({
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      password: body.password || "",
    });

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro interno ao criar conta." },
      { status: 500 }
    );
  }
}
