import ExercisePage from "@/components/page/exercise";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return <ExercisePage id={params.id} />;
}
