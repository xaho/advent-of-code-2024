import * as fs from 'fs';

let input;
input = fs.readFileSync('resources/input.txt', 'utf-8')
    .split('\n')
    .filter(l => l)
    .map(line =>
        line.split(/\W+/)
            .map(n => parseInt(n, 10))
    );
// input = [[1, 2], [2, 4]];
const left = input.map(([left, right]) => left).sort();
const right = input.map(([left, right]) => right).sort();
const sorted = left.map((left, i) => [left, right[i]])

let result = sorted
    .map(([left, right]) => Math.abs(left - right))
    .reduce((prev, cur) => prev + cur, 0);

console.log('part1', result);

let occurrences: { [number: number]: { left: number, right: number } } = {};

sorted.forEach(([left, right]) => {
    occurrences[left] ??= {left: 0, right: 0};
    occurrences[left].left++;
    occurrences[right] ??= {left: 0, right: 0};
    occurrences[right].right++;
});
result = Object.entries(occurrences).reduce((prev, [key, {left, right}]) => {
    if (left === 0) return prev;
    return prev + (parseInt(key, 10) * right);
    }, 0);
console.log('part2', result);