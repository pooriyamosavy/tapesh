import { ApiResponse } from "@/@types/api";
import { Exercise } from "@/@types/routes";
import { freeze } from "@/lib/freeze";
import { exerciseList } from "@/static/exersices";
import { NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function GET(_req: Request, { params }: Props) {
  await freeze(2000);
  return NextResponse.json<ApiResponse<Exercise | undefined>>({
    response: exerciseList.find((e) => e.id === Number(params.id)),
  });
}
