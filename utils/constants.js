import { generateUniqueEmail, generateUniqueBookTitle } from '../utils/functions.js'

const BASE_URL = "http://localhost:3000"

const TEST_URL = {
    TEST_HOME_URL: BASE_URL + '/',
    TEST_LOGIN_URL: BASE_URL + '/login',
    TEST_REGISTER_URL: BASE_URL + '/register',
    TEST_CATALOG_URL: BASE_URL + '/catalog',
    TEST_CREATE_BOOK_URL: BASE_URL + '/create'
}

const TEST_USER = {
    TEST_EMAIL: 'peter@abv.bg',
    TEST_PASSWORD: '123456',
    TEST_REGISTER_EMAIL: generateUniqueEmail()
}

const ALERT = {
    ALERT_MESSAGE: 'All fields are required!'
}

const TEST_BOOK = {
    TITLE: generateUniqueBookTitle(),
    DESCRIPTION: 'Test book description',
    IMAGE: 'https://example.com/book-image.jpg',
    TEST_BOOK_OPTIONS: {
        FICTION: 'Fiction',
        ROMANCE: 'Romance',
        MYSTERY: 'Mistery',
        CLASSIC: 'Clasic',
        OTHER: 'Other'
    }
}

export {
    BASE_URL,
    TEST_URL,
    TEST_USER,
    ALERT,
    TEST_BOOK
}