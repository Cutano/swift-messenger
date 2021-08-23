export function formatTime(timeInt) {
    const ref = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const msgDate = new Date(parseInt(timeInt));
    const now = new Date(Date.now());

    if (now.getFullYear() === msgDate.getFullYear() && now.getMonth() === msgDate.getMonth() && now.getDate() === msgDate.getDate()) {
        return `${msgDate.getHours()}:${msgDate.getMinutes() < 10 ? '0' + msgDate.getMinutes() : msgDate.getMinutes()}`;
    } else if ((now.getFullYear() === msgDate.getFullYear() && now.getMonth() !== msgDate.getMonth()) || (now.getFullYear() === msgDate.getFullYear() && now.getMonth() === msgDate.getMonth() && now.getDate() !== msgDate.getDate()))
        return `${ref[msgDate.getMonth()]} ${msgDate.getDate()}`;
    else return `${ref[msgDate.getMonth()]} ${msgDate.getFullYear()}`
}