import { NextResponse } from "next/server";
import { createContactMessage, RLSError } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createContactMessage({
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      service_category: body.service_category || "Segurança Eletrônica",
      property_type: body.property_type || "Residência",
      message: body.message || "",
    });

    return NextResponse.json({ contact: created }, { status: 201 });
  } catch (err) {
    if (err instanceof RLSError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro ao enviar mensagem de contato." },
      { status: 500 }
    );
  }
}
