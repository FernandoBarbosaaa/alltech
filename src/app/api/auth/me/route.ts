import { NextResponse } from "next/server";
import {
  getServerSession,
  setSessionCookie,
} from "@/lib/auth/session";
import {
  getUserProfile,
  getUserOwnReviews,
  updateUserProfile,
  RLSError,
} from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ user: null, reviews: [] });
    }
    const profile = await getUserProfile(session, session.userId);
    const reviews = await getUserOwnReviews(session);
    return NextResponse.json({ user: profile, reviews });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json({ user: null, reviews: [] }, { status: 200 });
    }
    return NextResponse.json({ user: null, reviews: [] }, { status: 200 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Não autenticado." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const targetUserId = body.userId || session.userId;

    const updated = await updateUserProfile(session, targetUserId, {
      name: body.name,
      phone: body.phone,
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    });

    await setSessionCookie({
      userId: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
    });

    return NextResponse.json({ user: updated });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao atualizar perfil." },
      { status: 500 }
    );
  }
}
