import * as fs from 'fs';

let reports: number[][];
reports = fs.readFileSync('resources/input.txt', 'utf-8')
    .split('\n')
    .filter(l => l)
    .map(l => l.split(' ').map(s => parseInt(s)));

const reportDeltas = reports.map(levels =>
    levels.reduce((prev, cur, i, arr) => {
        if (i === arr.length - 1) return prev;
        prev.push(cur - arr[i + 1]);
        return prev;
    }, [] as number[]));

const validReportsPart1 = reportDeltas.filter(deltas => {
    // check increasing or decreasing
    if (!(deltas.every(d => d < 0) || deltas.every(d => d > 0))) {
        return false;
    }
    // check delta >= 1 && delta <=3
    return deltas.map(d => Math.abs(d)).every(d => d <= 3 && d >= 1);
}).length;
console.log(validReportsPart1);
