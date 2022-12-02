import { input } from "./01.input.ts";

// ⭐️
function solve(input: string) {
  const lines = input.split("\n");
  let currentTotal = 0;
  const totals = [];

  for (const line of lines) {
    if (!line) {
      totals.push(currentTotal);
      currentTotal = 0;
      continue;
    }

    currentTotal += Number.parseInt(line);
  }
  // OBO: need to push the final total
  if (currentTotal) totals.push(currentTotal);

  totals.sort((a, b) => b - a);
  const [first, second, third, ...rest] = totals;

  return first + second + third;
}

console.log(`answer: ${solve(input)}`);
