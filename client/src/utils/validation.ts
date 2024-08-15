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

export const validateName = (name) => name.length >= 3 && name.length <= 50

export const validateDescription = (description) =>
    description.length >= 3 && description.length <= 240

export const validateLocation = (location) =>
    location.length >= 3 && location.length <= 50

export const validateStatus = (status) =>
    status === "found" || status === "lost"

export const validateCategory = (category) =>
    category === "accessories" ||
    category === "clothing" ||
    category === "electronics" ||
    category === "personal" ||
    category === "miscellaneous" ||
    category === "other"

export const validateFiles = (files) => files.length > 0 && files.length <= 5
