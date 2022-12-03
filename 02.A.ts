import { input } from "./02.input.ts";

type TheirMoveCode = "A" | "B" | "C";
type MyMoveCode = "X" | "Y" | "Z";
type Move = "rock" | "paper" | "scissors";
type GameOutcome = "win" | "lose" | "draw";

const theirMoveMap: Record<TheirMoveCode, Move> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const myMoveMap: Record<MyMoveCode, Move> = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const moveScore: Record<Move, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomeScore: Record<GameOutcome, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

const moveCycle = ["rock", "paper", "scissors"] as const;

// JavaScript `%` is a "remainder" operator. We gotta make our own "modulo" operator.
// Read more: https://2ality.com/2019/08/remainder-vs-modulo.html
const mod = (arg: number, div: number) => ((arg % div) + div) % div;

function getGameOutcome(theirMove: Move, myMove: Move): GameOutcome {
  const theirMoveIndex = moveCycle.indexOf(theirMove);
  const myMoveIndex = moveCycle.indexOf(myMove);
  const diffMod = mod(myMoveIndex - theirMoveIndex, 3);
  return diffMod === 0 ? "draw" : diffMod === 1 ? "win" : "lose";
}

function solve(input: string) {
  const lines = input.split("\n");
  let score = 0;

  for (const line of lines) {
    const [theirMoveCode, myMoveCode] = line.split(" ") as [
      TheirMoveCode,
      MyMoveCode
    ];
    const [theirMove, myMove] = [
      theirMoveMap[theirMoveCode],
      myMoveMap[myMoveCode],
    ];
    const outcome = getGameOutcome(theirMove, myMove);

    score += moveScore[myMove];
    score += outcomeScore[outcome];
  }

  return score;
}

console.log(`answer: ${solve(input)}`);
