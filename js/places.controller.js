'use strict'

var gMap
var gMarker
var gMarkers = []
var gIsFirstLocation = true

function onInit() {
    const userData = loadFromStorage(USER_KEY) || getDefaultUserData()
    renderColors(userData)
    renderPlaces()
    showLocation({ coords: { latitude: 29.55036, longitude: 34.952278 } })
    renderMarkers()
}

function renderPlaces() {
    const places = getPlaces()
    const strHTMLs = places
        .map(place => {
            return `
            <div>
                <h4>${place.name}</h4>
                <button onclick="onRemovePlace('${place.id}')">Remove</button>
                <button onclick="onPanToPlace('${place.id}')">Go to Place</button>
            </div>
        `
        })
        .join('')
    document.querySelector('.places-list').innerHTML = strHTMLs
}

function onRemovePlace(placeId) {
    removePlace(placeId)
    renderPlaces()
    renderMarkers()
}

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }

    // One time position snapshot or continues watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
    // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}

function showLocation(position) {
    document.getElementById('latitude').innerHTML = position.coords.latitude
    document.getElementById('longitude').innerHTML = position.coords.longitude
    document.getElementById('accuracy').innerHTML = position.coords.accuracy
    const date = new Date(position.timestamp)
    document.getElementById('timestamp').innerHTML = formatTime(date)
    initMap(position.coords.latitude, position.coords.longitude)
}

function handleLocationError(err) {
    var errMsg = ''
    switch (err.code) {
        case 1:
            errMsg = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            errMsg = 'Unable to determine your location: ' + err.message
            break
        case 3:
            errMsg = 'Timed out before retrieving the location.'
            break
    }
    const elMsg = document.querySelector('.err-msg')
    elMsg.innerHTML = errMsg
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: 8,
    }

    gMap = new google.maps.Map(elMap, options)

    gMarker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        label: {
            text: gIsFirstLocation ? 'Eilat' : 'Current Location',
            color: '#009',
            fontSize: '18px',
            fontWeight: 'bold',
        },
    })

    gMap.addListener('click', ev => {
        const name = prompt('Place name?', 'Place 1')
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        addPlace(name, lat, lng, gMap.getZoom())
        renderPlaces()
    })
}

function formatTime(date) {
    date = new Date(date)
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

function onPanToPlace(placeId) {
    const place = getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)

    renderMarkers()
}

function renderMarkers() {
    const places = getPlaces()
    // remove previous markers
    gMarkers.forEach(marker => marker.setMap(null))
    // every place is creating a marker
    gMarkers = places.map(place => {
        return new google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map: gMap,
            title: place.name,
        })
    })
}

function onGetCurrLocation() {
    gIsFirstLocation = false
    getPosition()
    renderMarkers()
}

function onDownloadCSV(elLink) {
    const csvContent = getAsCSV()
    console.log(csvContent)

    elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}
