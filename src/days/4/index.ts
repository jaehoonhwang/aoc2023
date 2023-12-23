import { ReadFileSample, ReadFileProblem, isNumber } from "@aoc/utils";

export const name = "day 4; from index.ts";
export const day = "4";

const problemInputs = ReadFileProblem(day);
const sampleInputs = ReadFileSample(day);

const idSeparator = ":";
const numberSeparator = "|";

interface Card {
  id: number,
  firstHalf: number[],
  secondHalf: number[],
}

export function SolveDayFour() {
  console.log("it's day 4");

  console.log(solvePartOne(problemInputs));
  console.log(solvePartTwo(problemInputs));
}

function solvePartOne(inputs: string[]): number {
  let ret = 0;
  for (let inputLine of inputs) {
    let card = parseLine(inputLine);
    let points = 0;
    let winningSet = new Set(card.firstHalf);
    for (let potential of card.secondHalf) {
      if (winningSet.has(potential)) {
        if (points == 0) {
          points = 1;
        } else {
          points += points;
        }
      }
    }
    ret += points;
  }

  return ret;
}

function solvePartTwo(inputs: string[]): number {
  let ret = 0;
  let copies = new Map<number, number>();
  for (let j = 1; j < inputs.length + 1; j++) {
    copies.set(j, 1);
  }

  for (let inputLine of inputs) {
    let card = parseLine(inputLine);
    let points = 0;
    let winningSet = new Set(card.firstHalf);
    for (let potential of card.secondHalf) {
      if (winningSet.has(potential)) {
        points += 1;
      }
    }

    let idCopies = copies.get(card.id)!;
    for (let i = 1; i <= points; i++) {
      copies.set(card.id + i, copies.get(card.id + i)! + idCopies);
    }
  }

  for (let [_, v] of copies) {
    ret += v;
  }

  return ret;
}

function parseLine(input: string): Card {
  let idSeparatorSplits = input.split(idSeparator);
  let gameId = parseGameId(idSeparatorSplits[0]);
  let numberSeparatorSplits = idSeparatorSplits[1].split(numberSeparator);
  let fh = parseNumbers(numberSeparatorSplits[0]);
  let lh = parseNumbers(numberSeparatorSplits[1]);

  return {
    id: gameId,
    firstHalf: fh,
    secondHalf: lh,
  };
}

function parseGameId(possibleGameId: string): number {
  let spaceParsed = possibleGameId.split(/\s+/);
  return Number(spaceParsed[1]);
}

function parseNumbers(possibleNumbers: string): number[] {
  let trimmedNumbers = possibleNumbers.trim();
  let ret: number[] = [];
  for (let number of trimmedNumbers.split(/\s+/)) {
    ret.push(Number(number));
  }

  return ret;
}
