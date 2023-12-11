import { ReadFileSample, ReadFileProblem } from "@aoc/utils";

export const name = "day 1; from index.ts";
export const day = "1";

const problemInputs = ReadFileProblem(day);
const sampleInputs = ReadFileSample(day);

const letterMapping = new Map<string, number>([
  ["eight", 8],
  ["five", 5],
  ["four", 4],
  ["nine", 9],
  ["one", 1],
  ["seven", 7],
  ["six", 6],
  ["two", 2],
  ["three", 3],
]);

const trieMapping = makeTrieMapping(Array.from(letterMapping.keys()));

const enum TrieState {
  VALID = 1,
  DONE = 2,
}

export function SolveDayOne() {
  console.log("it's day 1");

  solvePartOne(problemInputs); // Solved it.
  solvePartTwo(problemInputs); // Solved it.
}

function solvePartOne(inputs: string[]) {
  let formattedNumbers: number[][] = [];
  let answer: number = 0;
  for (var input of inputs) {
    let numbers = [];
    for (var char of [...input]) {
      let possibleNumber = Number(char);
      if (Number.isNaN(possibleNumber)) {
        continue;
      }
      numbers.push(possibleNumber);
    }
    formattedNumbers.push(numbers);
  }

  for (var numbers of formattedNumbers) {
    answer += combineNumbers(numbers);
  }
}

function solvePartTwo(inputs: string[]) {
  let formattedNumbers: number[][] = [];
  let answer: number = 0;
  for (var input of inputs) {
    let numbers = [];
    let chars = [...input];
    for (let i = 0; i < chars.length; i++) {
      let char = chars.at(i);
      let possibleNumber = Number(char);
      if (!Number.isNaN(possibleNumber)) {
        numbers.push(possibleNumber);
      } else {
        let aggregator = "";
        for (let j = i; j < chars.length; j++) {
          aggregator += chars.at(j);
          if (!trieMapping.has(aggregator)) {
            break;
          }
          let state = trieMapping.get(aggregator)!;
          if (state === TrieState.VALID) {
            continue;
          } else {
            i = j - 1;
            numbers.push(letterMapping.get(aggregator)!);
            break;
          }
        }
      }
    }
    formattedNumbers.push(numbers);
  }

  console.log(formattedNumbers);

  for (var numbers of formattedNumbers) {
    answer += combineNumbers(numbers);
  }

  console.log(answer);
}

function combineNumbers(numbers: number[]): number {
  if (numbers.length == 0) {
    throw new Error("an array can't be length of 0");
  } else if (numbers.length == 1) {
    return numbers.at(0)! * 10 + numbers.at(0)!;
  } else {
    return numbers.at(0)! * 10 + numbers.at(numbers.length - 1)!;
  }
}

function makeTrieMapping(words: string[]): Map<string, TrieState> {
  let ret = new Map<string, TrieState>();

  for (var word of words) {
    let aggregator = "";
    for (let i = 0; i < word.length - 1; i++) {
      aggregator += word.charAt(i);
      ret.set(aggregator, TrieState.VALID);
    }
    ret.set(word, TrieState.DONE);
  }

  return ret;
}
