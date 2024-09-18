'use strict'

function onInit() {
    const userData = loadFromStorage(USER_KEY) || getDefaultUserData()
    renderColors(userData)
}

function renderColors(userData) {
    const elTxtColor = document.querySelector('input[name="txtColor"]')
    if (elTxtColor) elTxtColor.value = userData.txtColor
    const elBgnColor = document.querySelector('input[name="bgnColor"]')
    if (elBgnColor) elBgnColor.value = userData.bgnColor
    document.documentElement.style.setProperty('--default-text-color', userData.txtColor)
    document.documentElement.style.setProperty('--primary-color', userData.bgnColor)
}

function showAge(newVal) {
    document.getElementById('sAge').innerHTML = newVal
}

function onSubmit(ev) {
    ev.preventDefault()

    const userData = {
        email: document.querySelector('input[name="email"]').value,
        age: document.querySelector('input[name="age"]').value,
        txtColor: document.querySelector('input[name="txtColor"]').value,
        bgnColor: document.querySelector('input[name="bgnColor"]').value,
        birthDate: document.querySelector('input[name="dob"]').value,
        birthTime: document.querySelector('input[name="tob"]').value,
    }
    _saveUserDetails(userData)
    renderColors(userData)
    console.log('userData:', userData)
}

function getDefaultUserData() {
    return {
        email: '',
        age: '25',
        txtColor: '#333',
        bgnColor: '#00796b',
        birthDate: '2024-01-01',
        birthTime: '00:00',
    }
}
