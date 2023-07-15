export const truncateString = (str:string, size:number = 25) => {
    if (str.length > size) {
        return str.slice(0, size) + "...";
    }
    return str;
}