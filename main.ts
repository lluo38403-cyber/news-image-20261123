// news-image-20261123 entry (Node 22, standard library only).
// The image beside this file sums up Monday 23 November 2026:
// COP31 ends with no deal; Iran strikes in Bahrain; Russian strikes
// in Ukraine and Ukrainian sea drones hit Russian ships in Libya;
// Asian chip stocks slide; Democrats win their biggest House
// majority in decades; Mexico captures cartel leader "Chapo Isidro".
// This program copies entry.png to /output/entry.png, so both
// grader runs write the same bytes. No network is used.
//
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.png");

copyFileSync(new URL("./entry.png", import.meta.url), outFile);

// Read the output back and prove it is a whole PNG: it must start with
// the PNG magic bytes and end with the IEND chunk, so a truncated or
// corrupted copy cannot pass as an entry.
const bytes = readFileSync(outFile);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const IEND = Buffer.from([0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  process.stderr.write(`news-image: ${outFile} does not start with the PNG magic bytes: the copy is not a PNG\n`);
  process.exit(1);
}
if (!bytes.subarray(bytes.length - 8).equals(IEND)) {
  process.stderr.write(`news-image: ${outFile} does not end with the IEND chunk: the copy is truncated\n`);
  process.exit(1);
}

// The rules cap an entry at 1 MiB, and the two runs must agree: check
// the output is no larger than 1048576 bytes and exactly the size of
// entry.png, so a copy that grew or shrank is refused here, not by the
// grader.
const source = readFileSync(new URL("./entry.png", import.meta.url));
if (bytes.length > 1048576) {
  process.stderr.write(`news-image: ${outFile} is ${bytes.length} bytes, over the 1048576 byte cap\n`);
  process.exit(1);
}
if (bytes.length !== source.length) {
  process.stderr.write(`news-image: ${outFile} is ${bytes.length} bytes, entry.png is ${source.length} bytes: the copy is not the same size\n`);
  process.exit(1);
}
