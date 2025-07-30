// src/app/api/health/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Tu archivo de conexión
import mongoose from "mongoose"; // Importa mongoose para acceder a su estado

export async function GET() {
  try {
    await dbConnect(); // Intenta conectar o usar la conexión existente

    // Una vez conectado, podemos verificar el estado de la conexión de Mongoose
    if (mongoose.connection.readyState === 1) {
      // 1 significa 'connected'
      return NextResponse.json(
        {
          status: "ok",
          message: "Conexión a MongoDB exitosa.",
          db_ready_state: mongoose.connection.readyState,
        },
        { status: 200 }
      );
    } else {
      // Esto es un fallback, dbConnect() ya debería lanzar un error si falla la conexión
      return NextResponse.json(
        {
          status: "error",
          message: "MongoDB no está conectado o el estado es inesperado.",
          db_ready_state: mongoose.connection.readyState,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error en health check de MongoDB:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Fallo al conectar a MongoDB.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
