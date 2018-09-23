export const buildMatrix = (rows, cols) => {
    let m = [];

    for (let i = 0; i < rows; i++) {
        m.push([]);
        for (let j = 0; j < cols; j++) {
        m[i].push(0);
        }
    };

    return m;
}

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getPiece = (id) => {
    return [
        [
        [-2, 0], [-1, 0], [0, 0], [1, 0]
        ],
        [
        [-1, -1],
        [-1, 0], [0, 0], [1, 0]
        ],
        [
                            [1, -1],
        [-1, 0], [0, 0], [1, 0]
        ],
        [
        [0, 0], [1, 0],
        [0, 1], [1, 1]
        ],
        [
                [0, -1], [1, -1],
        [-1, 0], [0, 0]
        ],
        [
                    [0, -1],
        [-1, 0], [0, 0], [1, 0]
        ],
        [
        [-1, -1],[0, -1],
                    [0, 0], [1, 0]
        ]
    ][id];
}