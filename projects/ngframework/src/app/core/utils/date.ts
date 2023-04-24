export function calcDayDuration(sourceDate: Date, targetDate: Date) {
    return (targetDate.getTime() - sourceDate.getTime()) / (1000 * 3600 * 24);
}
