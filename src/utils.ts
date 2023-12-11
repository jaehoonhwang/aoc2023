import * as fs from 'fs';
import * as path from 'path';

const dayPath = "days"
const problemFileName = "input.txt"
const sampleFileName = "sample_input.txt"
const encoding = "utf-8"

export function ReadFileProblem(day: string) : string[] {
  return ReadFile(day, problemFileName)
}

export function ReadFileSample(day: string) : string[] {
  return ReadFile(day, sampleFileName)
}

function ReadFile(day: string, f: string) : string[] {
  let fullPath = path.join(__dirname, dayPath, day, f);
  return parseString(fs.readFileSync(fullPath, encoding));
}

function parseString(inputs: string) : string[] {
  let splitted = inputs.split("\n");
  return splitted.filter(input => input != "");
}
