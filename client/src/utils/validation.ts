export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
}

export const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 20
}

export const validatePasswordLength = (password) => {
    return password.length >= 6
}

export const validatePasswordSpecialChar = (password) => {
    const re = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
    return re.test(password)
}
