'use strict'
const PLACE_KEY = 'places'

var gPlaces = []
_createPlaces()

//List
function getPlaces() {
    return gPlaces
}

function getPlaceById(placeId) {
    return gPlaces.find(place => place.id === placeId)
}

//Delete
function removePlace(placeId) {
    const idx = gPlaces.findIndex(place => place.id === placeId)
    if (idx === -1) return
    gPlaces.splice(idx, 1)
    _savePlaces()
}

// Create
function addPlace(name, lat, lng, zoom) {
    const place = _createPlace(name, lat, lng, zoom)
    gPlaces.unshift(place)
    _savePlaces()
}

// Private functions
function _createPlace(name, lat, lng, zoom) {
    return {
        id: makeId(),
        lat,
        lng,
        name,
        zoom,
    }
}

function _createPlaces() {
    gPlaces = loadFromStorage(PLACE_KEY)
    if (gPlaces && gPlaces.length !== 0) return

    gPlaces = []
    gPlaces.push(_createPlace('Eilat', 29.55036, 34.952278, getRandomInt(7, 12)))
    gPlaces.push(_createPlace('Pukis house', 32.1416, 34.831213, getRandomInt(7, 12)))
    _savePlaces()
}

function _savePlaces() {
    saveToStorage(PLACE_KEY, gPlaces)
}

function getAsCSV() {
    let csvStr = `Id, Lat, Lng, Name, Zoom`
    gPlaces.forEach(place => {
        const csvLine = `\n${place.id}, ${place.lat}, ${place.lng}, ${place.name}, ${place.zoom}`
        csvStr += csvLine
    })
    return csvStr
}
