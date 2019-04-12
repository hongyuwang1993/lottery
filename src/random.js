export default function getRandomNum(max, count, historyId) {
    let result = [];
    if (historyId.length >= max) {
        return result;
    }
    count = Math.min(count, max - historyId.length);
    for (let i = 0; i < count; i++) {
        while (true) {
            let num = Math.floor(Math.random() * max);
            if (result.indexOf(num) === -1 && historyId.indexOf(num) === -1) {
                result.push(num);
                break;
            }
        }
    }
    return result;
}
