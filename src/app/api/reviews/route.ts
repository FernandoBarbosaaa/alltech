import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getPublicReviews,
  createReview,
  RLSError,
  ServiceCategory,
} from "@/lib/db";

export async function GET() {
  try {
    const data = await getPublicReviews();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Erro ao carregar avaliações." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const body = await request.json();

    const created = await createReview(session, {
      rating: Number(body.rating),
      service_category: body.service_category as ServiceCategory,
      comment: body.comment || "",
    });

    return NextResponse.json({ review: created }, { status: 201 });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao publicar avaliação." },
      { status: 500 }
    );
  }
}
