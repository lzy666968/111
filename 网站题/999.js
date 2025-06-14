/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
    // 捕获量
    let captureAmount = 0;
    // 车的坐标
    let x, y;

    // 声明label
    loop:
    // 遍历棋盘，找到初始状态下车的位置
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if (board[i][j] === 'R') {
                // 找到车
                x = i;
                y = j;
                // 利用label来退出最外层循环，减少遍历的数组元素
                break loop;
            }
        }
    }

    // 车在X轴上移动的方位
    const dx = [0, 1, 0, -1];
    // 车在Y轴上移动的方位
    const dy = [1, 0, -1, 0];

    // 外层循环，依次走4个方向
    for(let i = 0; i < 4; i++) {
        // 内层循环，向同一个方向一直走下去
        // 官方这里是从第0步开始走，我觉得没必要还造成浪费，直接从第一步开始走就行了
        for(let j = 1; ; j++) {
            // 车在X轴移动后的坐标
            const moveX = x + j * dx[i];
            // 车在y轴移动后的坐标
            const moveY = y + j * dy[i];

            // 车不能走出棋盘范围 且 不可以碰到象
            if (moveX < 0 || moveX >= 8 || moveY < 0 || moveY >= 8 || board[moveX][moveY] === 'B') {
                break;
            }
            // 捕获到卒
            if (board[moveX][moveY] === 'p') {
                captureAmount++;
                // 题目要求：捕获到小卒后，这个方向就不能在继续前进了
                break;
            }
        }
    }

    // 返回捕获数量
    return captureAmount;
};
