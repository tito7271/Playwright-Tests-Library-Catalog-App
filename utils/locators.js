const NAVBAR = {
    NAV_NAVBAR: 'nav.navbar',
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGIN_BUTTON: 'a[href="/login"]',
    REGISTER_BUTTON: 'a[href="/register"]'
}

const LOGGED_USER_NAVBAR = {
    LOGGED_USER_NAVBAR: 'nav.navbar',
    LOGGED_USER_ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGGED_USER_MY_BOOKS_BUTTON: 'a[href="/profile"]',
    LOGGED_USER_ADD_BOOK_BUTTON: 'a[href="/create"]',
    LOGGED_USER_LOGOUT_BUTTON: 'nav.navbar a[id="logoutBtn"]',
    LOGGED_USER_WELCOME_MESSAGE: '//span[text()="Welcome, peter@abv.bg"]'
}

const LOGIN_FORM = {
    LOGIN_FORM: '#login-form',
    EMAIL_FIELD: 'input[id="email"]',
    PASSWORD_FIELD: 'input[id="password"]',
    LOGIN_BUTTON: '#login-form input[type="submit"]'
}

const REGISTER_FORM = {
    REGISTER_FORM: '#register-form',
    EMAIL_FIELD: 'input[id="email"]',
    PASSWORD_FIELD: 'input[id="password"]',
    REPEAT_PASSWORD_FIELD: 'input[id="repeat-pass"]',
    REGISTER_BUTTON: '#register-form input[type="submit"]'
}

const CREATE_FORM = {
    TITLE_FIELD: 'input[id="title"]',
    DESCRIPTION_FIELD: 'textarea[id="description"]',
    IMAGE_FIELD: 'input[id="image"]',
    TYPE_OPTION: '#type',
    ADD_BOOK_BUTTON: '#create-form input[type="submit"]'
}

const ALL_BOOKS_LIST = '//li[@class="otherBooks"]'

const DETAILS_BUTTONS = '//a[text()="Details"]'

const DETAILS_DESCRIPTION = '//h3[text()="Description:"]'

export {
    NAVBAR,
    LOGIN_FORM,
    LOGGED_USER_NAVBAR,
    REGISTER_FORM,
    CREATE_FORM,
    ALL_BOOKS_LIST,
    DETAILS_BUTTONS,
    DETAILS_DESCRIPTION
}