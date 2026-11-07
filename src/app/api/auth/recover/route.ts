import { NextResponse } from "next/server";
import {
  requestPasswordReset,
  resetPasswordWithCode,
  RLSError,
} from "@/lib/db";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await requestPasswordReset(body.email || "");
    return NextResponse.json({
      message:
        "Código de verificação gerado com sucesso. Utilize o código abaixo para definir sua nova senha.",
      resetCode: result.resetCode,
      email: result.email,
    });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao solicitar recuperação de senha." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const user = await resetPasswordWithCode({
      email: body.email || "",
      code: body.code || "",
      newPassword: body.newPassword || "",
    });

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({
      message: "Senha redefinida com sucesso!",
      user,
    });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao redefinir senha." },
      { status: 500 }
    );
  }
}
