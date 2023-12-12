import { ReadFileSample, ReadFileProblem } from "@aoc/utils";

export const name = "day 2; from index.ts";
export const day = "2";

const problemInputs = ReadFileProblem(day);
const sampleInputs = ReadFileSample(day);

interface GameRound {
  id: number,
  turns: Map<GameColor, number>[],
}

const enum GameColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

const gameSeparator: string = ":";
const roundSeparator: string = ";";
const turnSeparator: string = ",";

const colorLimit = new Map<GameColor, number>(
  [
    [GameColor.RED, 12],
    [GameColor.GREEN, 13],
    [GameColor.BLUE, 14],
  ]
);

export function SolveDayTwo() {
  console.log("it's day 2");

  console.log("part 1: ", solvePartOne(problemInputs)); // solved.
  console.log("part 2: ", solvePartTwo(problemInputs)); // solved.
}

function solvePartOne(inputs: string[]): number {
  let games: GameRound[] = [];
  for (let input of inputs) {
    games.push(gameParser(input));
  }

  let answer = 0;
  for (let game of games) {
    let isValid = true;
    for (let turn of game.turns) {
      if (!isValid) { break; }
      for (let [k, v] of turn) {
        if (colorLimit.get(k)! < v) {
          isValid = false;
          break;
        }
      }
    }
    if (isValid) {
      answer += game.id;
    }
  };

  console.log(answer);
  return answer;
}

function solvePartTwo(inputs: string[]) :number {
  let games: GameRound[] = [];
  for (let input of inputs) {
    games.push(gameParser(input));
  }

  let answer = 0;
  for (let game of games) {
    let maxMap = new Map<GameColor, number>(
      [
        [GameColor.RED, 0],
        [GameColor.GREEN, 0],
        [GameColor.BLUE, 0],
      ]
    );
    for (let turn of game.turns) {
      for (let [k, v] of turn) {
        maxMap.set(k, Math.max(maxMap.get(k)!, v));
      }
    }

    let needs: number[] = [];
    for (let [k, v] of maxMap) {
      needs.push(v);
    }
    let powerSet = 1;
    for (let need of needs) {
      powerSet = powerSet * need;
    }
    answer += powerSet;
  };

  console.log(answer);
  return answer;
}


function gameParser(line: string): GameRound {
  let gameSeparated: string[] = line.split(gameSeparator);
  let gameId = extractGame(gameSeparated[0]);
  let rounds = extractRounds(gameSeparated[1]);

  return { id: gameId, turns: rounds };
}

function extractGame(gameLine: string): number {
  let spaceSepareted = gameLine.split(" ");
  return Number(spaceSepareted[1]);
}

function extractRounds(roundLine: string): Map<GameColor, number>[] {
  let roundsLines = roundLine.split(roundSeparator).map(round => round.trim());
  let rounds: Map<GameColor, number>[] = [];
  for (let round of roundsLines) {
    rounds.push(extractTurn(round));
  }
  return rounds;
}

function extractTurn(turnLine: string): Map<GameColor, number> {
  let colors = turnLine.split(turnSeparator).map(turn => turn.trim());
  let turn = new Map<GameColor, number>();
  for (let colorLine of colors) {
    let colorSeparated = colorLine.split(" ");
    let colorCount = Number(colorSeparated[0]);
    let colorName = colorSeparated[1];
    if (colorName == GameColor.GREEN) {
      turn.set(GameColor.GREEN, colorCount);
    } else if (colorName == GameColor.RED) {
      turn.set(GameColor.RED, colorCount);
    } else {
      turn.set(GameColor.BLUE, colorCount);
    }
  }
  return turn;
}
