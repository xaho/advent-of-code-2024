import * as fs from 'node:fs/promises';

const part1 = false;

// @ts-ignore
const f = (a, b) => [].concat(...a.map(a => b.map(b => [].concat(a, b))));
// @ts-ignore
const cartesian = (a, b, ...c) => b ? cartesian(f(a, b), ...c) : a;
// @ts-ignore
const offsets = cartesian([-1, 0, 1], [-1, 0, 1]).filter(x => !(x[0] === 0 && x[1] === 0));
// @ts-ignore
const cornerOffsets : number[][] = cartesian([-1, 1], [-1, 1]).filter(x => !(x[0] === 0 && x[1] === 0));

let matches = 0;

(async () => {
    const input = (await fs.readFile('../resources/input.txt', 'utf8'))
        .split('\n')
        .map(l => l.split(''));
    input.forEach((row, rowNr) => {
        row.forEach((cell, i) => {
            // 
            if (part1 && cell === 'X') {
                for (let [xOffset, yOffset] of offsets) {
                    if (input?.[rowNr + xOffset]?.[i + yOffset] === 'M') {
                        if (input?.[rowNr + xOffset * 2]?.[i + yOffset * 2] === 'A') {
                            if (input?.[rowNr + xOffset * 3]?.[i + yOffset * 3] === 'S') {
                                matches++;
                            }
                        }
                    }
                }
            }
            if (!part1 && cell === 'A') {
                let corners = cornerOffsets.map(([xOffset, yOffset]) => {
                    return input?.[rowNr + xOffset]?.[i + yOffset];
                });
                let stats = corners.reduce((acc, letter) => {
                    acc[letter]++;
                    return acc;
                }, {'S': 0, 'M': 0} as {[key: string]: number});
                if (stats.S === 2 && stats.M === 2 && (input?.[rowNr + 1]?.[i + 1] !== input?.[rowNr - 1]?.[i - 1])) {
                    matches++;
                }
            }
        })
    });
    console.log(matches);
})();