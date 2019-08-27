import { reject } from "q";

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
        '"}'
    )
}
/**
 * @param {number} seconds
 * @returns {Promise}
*/
export function delayTime(seconds = 1.5){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },seconds * 1000)
    })
}