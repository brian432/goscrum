export const limitString = (str) => {
    if (str.length > 170) {
        return { string: str.slice(0, 167).concat("..."), addButton: true }
    } return { string: str, addButton: false }
}