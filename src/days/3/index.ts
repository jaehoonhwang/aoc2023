import { ReadFileSample, ReadFileProblem, isNumber } from "@aoc/utils";

export const name = "day 3; from index.ts";
export const day = "3";

const problemInputs = ReadFileProblem(day);
const sampleInputs = ReadFileSample(day);

const emptySymbol: string = ".";
const gearSymbol: string = "*";
const gearRatioLimit: number = 2;

type Coordinates = Coordinate[];
type Pair = [number, number];
type Pairs = Pair[];

interface Coordinate {
  r: number,
  c: number,
}

interface PartID {
  start: Coordinate,
  value: string,
}

export function SolveDayThree() {
  console.log("it's day 3");

  //console.log(solvePartOne(problemInputs));
  console.log(solvePartTwo(problemInputs));
}

function solvePartOne(inputs: string[]): number {
  let sum = 0;
  let row = inputs.length;
  let col = inputs[0].length;
  let totalParts: Map<string, PartID> = new Map<string, PartID>();
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (isSymbol(inputs[r][c])) {
        let parts = checkAround(inputs, { r: r, c: c, });
        for (let part of parts) {
          // Get rid of duplicates by using map
          totalParts.set(generatePartKey(part), part);
        }
      }
    }
  }


  for (let [_, part] of totalParts) {
    console.log(part);
    sum += Number(part.value);
  }

  return sum;
}

function solvePartTwo(inputs: string[]) {
  let sum = 0;
  let row = inputs.length;
  let col = inputs[0].length;
  let ratios: Map<string, number> = new Map<string, number>();
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (isSymbol(inputs[r][c]) && inputs[r][c] == gearSymbol) {
        let parts = checkAround(inputs, { r: r, c: c, });
        let removeDupes = new Map<string, PartID>();

        for (let part of parts) {
          // Get rid of duplicates by using map
          removeDupes.set(generatePartKey(part), part);
        }

        if (removeDupes.size == gearRatioLimit) {
          let temp = 1;
          for (let [_, part] of removeDupes) {
            temp = temp * Number(part.value);
          }
          sum += temp;
        }
      }
    }
  }

  return sum;
}

function isSymbol(input: string): boolean {
  if (isNumber(input)) {
    return false;
  }

  return input !== emptySymbol;
}

function checkAround(inputs: string[], coord: Coordinate): PartID[] {
  let possibleCoordinates: Coordinates = generateLegalCoords(inputs, coord);
  let parts: PartID[] = [];

  for (let possible of possibleCoordinates) {
    parts.push(traverseHorizontal(inputs, possible));
  }

  return parts;
}

function generateLegalCoords(inputs: string[], coord: Coordinate): Coordinates {
  let legals: Coordinates = [];
  let rLimit = inputs.length;
  let cLimit = inputs[0].length;
  let adds: Pairs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], /*[0, 0],*/[0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  let possibles: Coordinates = adds.map((x) => { return { r: coord.r + x[0], c: coord.c + x[1] } });

  for (let possible of possibles) {
    if (0 > possible.r || possible.r >= rLimit) {
      continue;
    }
    if (0 > possible.c || possible.c >= cLimit) {
      continue;
    }
    if (isNumber(inputs[possible.r][possible.c])) {
      legals.push(possible);
    }
  }

  return legals;
}

function traverseHorizontal(inputs: string[], target: Coordinate): PartID {
  const r = target.r;
  let c = target.c;
  let cLeft = c - 1;
  let ret = "";
  while (cLeft >= 0) {
    if (isNumber(inputs[r][cLeft])) {
      ret = inputs[r][cLeft] + ret;
      cLeft--;
      continue;
    }
    break;
  }

  let cRight = c;
  while (cRight < inputs[0].length) {
    if (isNumber(inputs[r][cRight])) {
      ret += inputs[r][cRight];
      cRight++;
      continue;
    }
    break;
  }

  return {
    start: { r: r, c: cLeft + 1 },
    value: ret,
  };
}

function generatePartKey(part: PartID): string {
  return [part.start.r, part.start.c].join(",")
}

function generateCoordKey(coord: Coordinate): string {
  return [coord.r, coord.c].join(",")
}
