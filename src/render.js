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
    let server = {
        name: $('#serverName').val(),
        op: $('#serverOP').val(),
        gamemode: $('#serverGM').val(),
        difficulty: $('#serverDifficulty').val(),
        maxPlayers: $('#serverPlayers').val(),
        onlineMode: $('#serverCracked').val()
    }
    writeStorage('server', server)
    console.log(server)
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

if (storage.server) {
    server = storage.server
    $('#serverName').val(server.name);
    $('#serverOP').val(server.op);
    $('#serverGM').val(server.gamemode);
    $('#serverDifficulty').val(server.difficulty);
    $('#serverPlayers').val(server.maxPlayers);
    $('#serverCracked').val(server.onlineMode);
}