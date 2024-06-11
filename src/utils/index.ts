export function CompareDate(date1: number, date2: number) {  
    const diffInMilliseconds: number = Math.abs(date2 - date1);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    if (diffInMinutes <= 60) {
        return `${diffInMinutes} minutes`;
    } else if (diffInMinutes <= 24 * 60) {
        return `${Math.floor(diffInMinutes / 60)} hours`;
    } else {
        return `${Math.floor(diffInMinutes / (24 * 60))} days`;
    }
}
