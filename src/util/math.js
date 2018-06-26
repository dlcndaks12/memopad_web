export function ramdom(digit) {
    const randomNum = Math.random() * (Math.pow(10, digit));
    return Math.round(randomNum);
}