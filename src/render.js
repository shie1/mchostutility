const {
    remote
} = require('electron');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const $ = require('jquery');
const ngrok = require('ngrok');
const { width, height } = require('screenz');
const storage = JSON.parse(fs.readFileSync('./storage.json'))

function writeStorage(name, data) {
    storage[name] = data
    fs.writeFileSync('./storage.json', JSON.stringify(storage))
    return true
}

function delStorage(name) {
    delete storage[name]
    fs.writeFileSync('./storage.json', JSON.stringify(storage))
    return true
}

function ngrokAuth() {
    token = $('#ngrokAuth').val();
    writeStorage('ngrokAuth', token);
    $('.ngrok').hide()
    $('.host').show()
}

function host() {
    let serverName = $('#serverName').val();
    let serverFile = $('#serverFile').val();
    let gamemode = $('#serverGM').val();
    let difficulty = $('#serverDifficulty').val();
    let maxPlayers = $('#serverPlayers').val();
    let cracked = $('#serverCracked').val();
}

$(':root').css('--screenH', `${height}px`)
$(':root').css('--screenW', `${width}px`)

$('#closeApp').on('click', () => {
    window.close()
})

if (!storage.ngrokAuth) {
    $('.ngrok').show()
    $('.host').hide()
} else {
    $('.ngrok').hide()
    $('.host').show()
}