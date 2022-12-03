import { input } from "./03.input.ts";

function splitInHalf(str: string): [string, string] {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
}

function getCommonItem(a: string, b: string): string {
  for (const aChar of a) {
    if (b.includes(aChar)) return aChar;
  }

  throw new Error("could not find anything common");
}

function computePriority(char: string): number {
  // A-Z occupy code points 65-90
  // a-z occupy code points 97-122
  const codePoint = char.codePointAt(0) as number;

  const lowercasePriority = codePoint - 96;
  const uppercasePriority = codePoint - 38;

  return lowercasePriority > 0 ? lowercasePriority : uppercasePriority;
}

function solve(input: string) {
  const lines = input.split("\n");
  let prioritySum = 0;

  for (const line of lines) {
    const [leftCompartment, rightCompartment] = splitInHalf(line);
    const commonItem = getCommonItem(leftCompartment, rightCompartment);
    const priority = computePriority(commonItem);

    prioritySum += priority;
  }

  return prioritySum;
}

console.log(`answer: ${solve(input)}`);
