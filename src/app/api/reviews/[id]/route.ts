import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  updateReview,
  deleteReview,
  reportReview,
  RLSError,
  ServiceCategory,
} from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession();
    const body = await request.json();

    const updated = await updateReview(session, id, {
      rating: body.rating !== undefined ? Number(body.rating) : undefined,
      service_category: body.service_category as ServiceCategory | undefined,
      comment: body.comment,
    });

    return NextResponse.json({ review: updated });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao editar avaliação." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession();
    await deleteReview(session, id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao excluir avaliação." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession();
    const body = await request.json();

    const report = await reportReview(session, id, {
      reason: body.reason || "",
      details: body.details || "",
    });

    return NextResponse.json({ report }, { status: 201 });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao enviar denúncia." },
      { status: 500 }
    );
  }
}
