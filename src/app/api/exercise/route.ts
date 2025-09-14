import { ApiResponse } from "@/@types/api";
import { Exercise } from "@/@types/routes";
import { freeze } from "@/lib/freeze";
import { exerciseList } from "@/static/exersices";
import { NextResponse } from "next/server";

export async function GET() {
  await freeze(2000);
  return NextResponse.json<ApiResponse<Exercise[]>>({
    response: exerciseList,
  });
}
