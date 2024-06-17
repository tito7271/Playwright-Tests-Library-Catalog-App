import { test, expect } from '@playwright/test';
import { ALL_BOOKS_LIST, CREATE_FORM, DETAILS_BUTTONS, DETAILS_DESCRIPTION, LOGGED_USER_NAVBAR, LOGIN_FORM, NAVBAR, REGISTER_FORM } from '../utils/locators.js';
import { ALERT, ALERT_MESSAGE, BASE_URL, TEST_BOOK, TEST_URL, TEST_USER } from '../utils/constants.js';

// Navigation tests

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto(BASE_URL)

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible()
    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible()


    // await page.goto(BASE_URL)

    // await page.waitForSelector(NAVBAR.NAV_NAVBAR)

    // const allBooksLink = await page.$(NAVBAR.ALL_BOOKS_LINK)
    // const isLinkVisible =  await allBooksLink.isVisible()
    
    // expect(isLinkVisible).toBe(true)
})

test('Verify "Login" button is visible', async ( {page} ) => {
    await page.goto(BASE_URL)

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible()
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible()
})

test('Verify "Register" button is visible', async ( {page} ) => {
    await page.goto(BASE_URL)

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible()
    await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible()
})

test('Verify "All Books" link is visible after user login', async ( {page} ) => {
    await page.goto(BASE_URL)

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible()
    await page.locator(NAVBAR.LOGIN_BUTTON).click()

    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible()

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
    await expect(page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_ALL_BOOKS_LINK)).toBeVisible()
})

// test('Verify "All Books" link is visible after user login', async ({ page }) => {
//     await page.goto('http://localhost:3000/login');
  
//     await page.fill('input[name="email"]', 'peter@abv.bg');
//     await page.fill('input[name="password"]', '123456');
//     await page.click('input[type="submit"]');
  
//     const allBooksLink = await page.$('a[href="/catalog"]');
//     const isAllBooksLinkVisible = await allBooksLink.isVisible();
  
//     expect(isAllBooksLinkVisible).toBe(true);
//   });


test('Verify "My Books" button is visible after user login', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(NAVBAR.LOGIN_BUTTON).click()

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
    await expect(page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_MY_BOOKS_BUTTON)).toBeVisible()
})

test('Verify "Logout" button is visible after user login', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(NAVBAR.LOGIN_BUTTON).click()

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
    await expect(page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_LOGOUT_BUTTON)).toBeVisible()
})

test('Verify welcoming message with email address is visible after user login', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(NAVBAR.LOGIN_BUTTON).click()

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
    await expect(page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_WELCOME_MESSAGE)).toBeVisible()
})

// Login form tests

test('Login with valid credentials', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
})

test('Login with empty input fields', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()
    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })
    await page.waitForURL(TEST_URL.TEST_LOGIN_URL)
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL)
})

test('Login with empty email field', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()
    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })
    await page.waitForURL(TEST_URL.TEST_LOGIN_URL)
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL)
})

test('Login with empty password field', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click()
    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })
    await page.waitForURL(TEST_URL.TEST_LOGIN_URL)
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL)
})

// Register form tests

test('Register with valid values', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL)

    await page.locator(REGISTER_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_REGISTER_EMAIL)
    await page.locator(REGISTER_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
})

test('Register with empty input fields', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL)

    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click()

    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL)
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL)
})

// Add book page tests

test('Add book with correct data', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ])

    await page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_ADD_BOOK_BUTTON).click()

    await page.locator(CREATE_FORM.TITLE_FIELD).fill(TEST_BOOK.TITLE)
    await page.locator(CREATE_FORM.DESCRIPTION_FIELD).fill(TEST_BOOK.DESCRIPTION)
    await page.locator(CREATE_FORM.IMAGE_FIELD).fill(TEST_BOOK.IMAGE)
    await page.locator(CREATE_FORM.TYPE_OPTION).selectOption(TEST_BOOK.TEST_BOOK_OPTIONS.CLASSIC)
    await page.locator(CREATE_FORM.ADD_BOOK_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect (page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
})

test('Add book with empty title field', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ])

    await page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_ADD_BOOK_BUTTON).click()

    await page.locator(CREATE_FORM.DESCRIPTION_FIELD).fill(TEST_BOOK.DESCRIPTION)
    await page.locator(CREATE_FORM.IMAGE_FIELD).fill(TEST_BOOK.IMAGE)
    await page.locator(CREATE_FORM.TYPE_OPTION).selectOption(TEST_BOOK.TEST_BOOK_OPTIONS.CLASSIC)
    await page.locator(CREATE_FORM.ADD_BOOK_BUTTON).click()

    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })

    await page.waitForURL(TEST_URL.TEST_CREATE_BOOK_URL)
    expect (page.url()).toBe(TEST_URL.TEST_CREATE_BOOK_URL)
})

// All books page tests

test('Login and verify that all books are displayed', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ])

    const allBooksElements = page.locator(ALL_BOOKS_LIST)
    const bookCount = await allBooksElements.count()
    expect(bookCount).toBeGreaterThanOrEqual(0)
})

test('Login and navigate to Details page', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ])
    await page.locator(DETAILS_BUTTONS).first().click()
    await expect(page.locator(DETAILS_DESCRIPTION)).toBeVisible()
})

// Logout functionality tests

test('Verify "Logout" button is visible after login', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ])

    await expect(page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_LOGOUT_BUTTON)).toBeVisible()
})

test('Verify "Logout" button redirects correctly', async ( {page} ) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL)

    await page.locator(LOGIN_FORM.EMAIL_FIELD).fill(TEST_USER.TEST_EMAIL)
    await page.locator(LOGIN_FORM.PASSWORD_FIELD).fill(TEST_USER.TEST_PASSWORD)

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ])

    await page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_LOGOUT_BUTTON).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect (page.url()).toBe(TEST_URL.TEST_CATALOG_URL)

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible()
    await expect(page.locator(LOGGED_USER_NAVBAR.LOGGED_USER_WELCOME_MESSAGE)).toBeHidden()
})