import { input } from "./02.input.ts";

type TheirMoveCode = "A" | "B" | "C";
type OutcomeCode = "X" | "Y" | "Z";
type Move = "rock" | "paper" | "scissors";
type GameOutcome = "win" | "lose" | "draw";

const theirMoveMap: Record<TheirMoveCode, Move> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const outcomeMap: Record<OutcomeCode, GameOutcome> = {
  X: "lose",
  Y: "draw",
  Z: "win",
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

function getMyMove(theirMove: Move, outcome: GameOutcome): Move {
  const theirMoveIndex = moveCycle.indexOf(theirMove);
  const indexAdjust = outcome === "draw" ? 0 : outcome === "lose" ? -1 : 1;
  return moveCycle.at((theirMoveIndex + indexAdjust) % 3)!;
}

function solve(input: string) {
  const lines = input.split("\n");
  let score = 0;

  for (const line of lines) {
    const [theirMoveCode, outcomeCode] = line.split(" ") as [
      TheirMoveCode,
      OutcomeCode
    ];

    const theirMove = theirMoveMap[theirMoveCode];
    const outcome = outcomeMap[outcomeCode];

    const myMove = getMyMove(theirMove, outcome);

    score += moveScore[myMove];
    score += outcomeScore[outcome];
  }

  return score;
}

console.log(`answer: ${solve(input)}`);
