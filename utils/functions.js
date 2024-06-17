function generateUniqueEmail() {
    const timestamp = Date.now()
    return `user${timestamp}@test.com`
}

function generateUniqueBookTitle() {
    const timestamp = Date.now()
    return `Test book${timestamp}`
}

export {
    generateUniqueEmail,
    generateUniqueBookTitle
}