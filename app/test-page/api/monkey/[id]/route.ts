import { NextResponse } from "next/server";
import monkeysData from "../../../monkeys.json";


const monkeys = monkeysData as Array<{
  id: string;
  name: string;
  age: number;
  favFood: string;
  species: string;
}>;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const monkey = monkeys.find((m) => m.id === params.id);

  if (!monkey) {
    return NextResponse.json({ error: "Monkey not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: monkey.id,
    name: monkey.name,
    age: monkey.age,
    favFood: monkey.favFood,
    species: monkey.species,
  });
}