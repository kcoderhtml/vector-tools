import { createPrompt } from "bun-promptx";

type Vector = {
  magnitude: number;
  angle: number;
};

type DeConstructedVector = {
  x: number;
  y: number;
};

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const radiansToDegrees = (radians: number) => {
  return radians * (180 / Math.PI);
};

const aMag = createPrompt("Enter magnitude Am: ");
const aAngle = createPrompt("Enter angle Aa: ");

const magnitudeValue: number = aMag.value ? parseFloat(aMag.value) : 0;
const angleValue: number = aAngle.value ? parseFloat(aAngle.value) : 0;

const vectorA: Vector = {
  magnitude: magnitudeValue,
  angle: angleValue,
};

const bMag = createPrompt("Enter magnitude Bm: ");
const bAngle = createPrompt("Enter angle Ba: ");

const magnitudeValueB: number = bMag.value ? parseFloat(bMag.value) : 0;
const angleValueB: number = bAngle.value ? parseFloat(bAngle.value) : 0;

const vectorB: Vector = {
  magnitude: magnitudeValueB,
  angle: angleValueB,
};

console.log(
  "\n---\nJust to confirm these vectors are correct?\nVector A:",
  vectorA,
  "\nVector B:",
  vectorB,
  "\n---\n"
);

const confirm =
  createPrompt("Confirm vectors? (y/n): ").value?.toLowerCase() === "y";

if (confirm) {
  console.log("Vectors confirmed! Calculating ...");
} else {
  console.log("Vectors not confirmed. Exiting ...");
  process.exit(0);
}

const deConstA: DeConstructedVector = {
  x: vectorA.magnitude * Math.cos(degreesToRadians(vectorA.angle)),
  y: vectorA.magnitude * Math.sin(degreesToRadians(vectorA.angle)),
};

const deConstB: DeConstructedVector = {
  x: vectorB.magnitude * Math.cos(degreesToRadians(vectorB.angle)),
  y: vectorB.magnitude * Math.sin(degreesToRadians(vectorB.angle)),
};

const deConstF: DeConstructedVector = {
  x: deConstA.x + deConstB.x,
  y: deConstA.y + deConstB.y,
};

console.log(
  "\n---",
  "\nDeconstructed Vector A:",
  deConstA,
  "\nDeconstructed Vector B:",
  deConstB,
  "\nDeconstructed Vector F:",
  deConstF,
  "\n---\n"
);

let finalVector: Vector = {
  magnitude: Math.sqrt(deConstF.x ** 2 + deConstF.y ** 2),
  angle: radiansToDegrees(Math.atan(deConstF.y / deConstF.x)),
};

let quadrant: number;

if (deConstF.x >= 0 && deConstF.y >= 0) {
  quadrant = 1;
} else if (deConstF.x < 0 && deConstF.y >= 0) {
  quadrant = 2;
  finalVector.angle += 180;
} else if (deConstF.x < 0 && deConstF.y < 0) {
  quadrant = 3;
  finalVector.angle += 180;
} else {
  quadrant = 4;
  finalVector.angle += 360;
}

console.log("The final vector lies in quadrant:", quadrant);
console.log("The final vector is:", finalVector);
