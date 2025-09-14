export type Exercise = {
  id: number;
  nameFa: string;
  nameEn: string;
  targetAreas: string[];
  goal: string;
  levels: {
    sets: number;
    reps: number;
    rest: string;
    duration: number;
    hint?: string;
  };
  image: string;
};
