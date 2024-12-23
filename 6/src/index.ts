import * as fs from 'node:fs/promises';

const part1 = false;

(async () => {
    const map = (await fs.readFile('../resources/input.txt', 'utf-8')).split('\n').map(l => l.split(''));
    let xPos, yPos;
    yPos = map.findIndex(row => row.includes('^'));
    if (yPos === undefined) throw new Error('unable to find guard');
    xPos = map[yPos].findIndex(c => c === '^');
    if (xPos === undefined) throw new Error('unable to find guard');

    enum Direction {
        UP,
        RIGHT,
        DOWN,
        LEFT
    }

    let direction = Direction.UP;

    function NextCell(direction: Direction, x: number, y: number) {
        switch (direction) {
            case Direction.UP:
                return map?.[y-1]?.[x];
            case Direction.RIGHT:
                return map?.[y]?.[x+1];
            case Direction.DOWN:
                return map?.[y+1]?.[x];
            case Direction.LEFT:
                return map?.[y]?.[x-1];
        }
    }

    while (true) {
        map[yPos][xPos] = 'X';
        const nextCell = NextCell(direction, xPos, yPos);
        if (nextCell === undefined) break;
        if (nextCell === '#') {
            direction = (direction + 1) % 4;
            continue;
        }
        switch (direction) {
            case Direction.UP:
                yPos--;
                break;
            case Direction.RIGHT:
                xPos++;
                break;
            case Direction.DOWN:
                yPos++;
                break;
            case Direction.LEFT:
                xPos--;
                break;
        }
    }
    const positionsVisited = map.reduce((acc, curr) => {
        acc += curr.filter(c => c === 'X').length;
        return acc;
    }, 0);
    // console.log(map.map(l => l.join('')).join('\n'));
    console.log(positionsVisited);
})();