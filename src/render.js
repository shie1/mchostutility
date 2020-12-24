const {
    remote,
    clipboard
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
    writeStorage('ngrokAuth', token + '');
    $('.ngrok').hide()
    $('.host').show()
}

$('#ngrokForm').on('submit', () => {
    ngrokAuth()
})

async function host() {
    $('*').hide()
    let server = {
        name: $('#serverName').val(),
        gamemode: $('#serverGM').val(),
        difficulty: $('#serverDifficulty').val(),
        maxPlayers: $('#serverPlayers').val(),
        onlineMode: $('#serverCracked').val()
    }
    writeStorage('server', server)
    require('./genfiles.js')
    let ip = await ngrok.connect({ proto: 'tcp', addr: 25565, authtoken: storage.ngrokAuth })
    ip = ip.substring(6)
    clipboard.writeText(ip)
    setTimeout(() => {
        serverProcess = cp.exec(`start cmd /k "echo Server ip: ${ip} && java -Xms1024M -Xmx1024M -jar server.jar nogui"`, { cwd: path.resolve('./src/server') });
        serverProcess.on('close', () => {
            window.close()
        })
    }, 1000)
}

$('#hostForm').on('submit', () => {
    host()
})

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
    $('#serverGM').val(server.gamemode);
    $('#serverDifficulty').val(server.difficulty);
    $('#serverPlayers').val(server.maxPlayers);
    $('#serverCracked').val(server.onlineMode);
}