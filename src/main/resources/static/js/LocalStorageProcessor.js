//parse object then save to local storage as a String
export const save = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data))

//load data from local storage then return as a Object
export const load = key => {
    return JSON.parse(localStorage.getItem(key))
}