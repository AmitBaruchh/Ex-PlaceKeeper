'use strict'

const USER_KEY = 'user'

function _saveUserDetails(userData) {
    saveToStorage(USER_KEY, userData)
}
