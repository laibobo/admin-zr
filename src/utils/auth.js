import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const PageBtnKey = 'Page-Btns'

export function getToken() {
    return Cookies.get(TokenKey)
}
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function getPageBtns() {
    return Cookies.get(PageBtnKey)
}
export function setPageBtns(btns) {
    return Cookies.set(PageBtnKey, btns)
}
export function removePageBtns() {
    return Cookies.remove(PageBtnKey)
}