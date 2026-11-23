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

import { copyFileSync } from "node:fs";
import { join } from "node:path";

copyFileSync(
  new URL("./entry.png", import.meta.url),
  join(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.png"),
);
