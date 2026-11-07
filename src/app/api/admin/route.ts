import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  adminGetDashboardData,
  adminModerateReview,
  adminResolveReport,
  adminUpdateContactStatus,
  adminDeleteContactMessage,
  deleteReview,
  RLSError,
} from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession();
    const data = await adminGetDashboardData(session);
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao carregar painel administrativo." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession();
    const body = await request.json();

    if (body.action === "moderate_review") {
      const updated = await adminModerateReview(
        session,
        body.reviewId,
        body.status
      );
      return NextResponse.json({ review: updated });
    }

    if (body.action === "resolve_report") {
      const updated = await adminResolveReport(
        session,
        body.reportId,
        body.status
      );
      return NextResponse.json({ report: updated });
    }

    if (body.action === "update_contact") {
      const updated = await adminUpdateContactStatus(
        session,
        body.messageId,
        body.status
      );
      return NextResponse.json({ contact: updated });
    }

    return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro na operação administrativa." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID não informado." }, { status: 400 });
    }

    if (type === "review") {
      await deleteReview(session, id);
      return NextResponse.json({ ok: true });
    }

    if (type === "contact") {
      await adminDeleteContactMessage(session, id);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Tipo inválido." }, { status: 400 });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao excluir registro." },
      { status: 500 }
    );
  }
}
