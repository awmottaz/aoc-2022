import { input } from "./03.input.ts";

function createGroups(lines: string[]): [string, string, string][] {
  // https://youtu.be/r2S1I_ien6A
  const result: [string, string, string][] = [];

  //                                 ⬇️⬇️⬇️
  for (let i = 0; i < lines.length; i += 3) {
    const nextThreeLines: [string, string, string] = [
      lines[i],
      lines[i + 1],
      lines[i + 2],
    ];
    result.push(nextThreeLines);
  }

  return result;
}

function getCommonItem(a: string, b: string, c: string): string {
  for (const aChar of a) {
    if (!b.includes(aChar)) continue;
    if (c.includes(aChar)) return aChar;
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
  const groups = createGroups(input.split("\n"));
  let prioritySum = 0;

  for (const [group1, group2, group3] of groups) {
    const commonItem = getCommonItem(group1, group2, group3);
    const priority = computePriority(commonItem);

    prioritySum += priority;
  }

  return prioritySum;
}

console.log(`answer: ${solve(input)}`);
