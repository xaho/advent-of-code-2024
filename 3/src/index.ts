import * as fs from 'fs';

const part1 = false;

(async () => {
    const input = fs.readFileSync('../resources/input.txt', 'utf8');
    const re = /((?<do>do\(\))|(?<dont>don't\(\))|(mul\((?<left>\d{1,3}),(?<right>\d{1,3})\)))/g;
    let match;
    let total = 0;
    let enabled = true;
    while((match = re.exec(input)) !== null) {
        if (match?.groups?.do && part1) enabled = true;
        if (match?.groups?.dont && part1) enabled = false;
        if (match?.groups?.left && match?.groups?.right && enabled) 
            total += parseInt(match.groups.left) * parseInt(match.groups.right);
    }
    console.log(total);
})();