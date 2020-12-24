const fs = require('fs');
const storage = JSON.parse(fs.readFileSync('./storage.json'));
const server = storage.server;

let tosrc

if (storage.devmode) {
    tosrc = './src'
} else {
    tosrc = './resources/app/src'
}

let properties = `spawn-protection=16
max-tick-time=60000
query.port=25565
generator-settings=
sync-chunk-writes=true
force-gamemode=false
allow-nether=true
enforce-whitelist=false
gamemode=${server.gamemode}
broadcast-console-to-ops=true
enable-query=false
player-idle-timeout=0
difficulty=${server.difficulty}
spawn-monsters=true
broadcast-rcon-to-ops=true
op-permission-level=4
pvp=true
entity-broadcast-range-percentage=100
snooper-enabled=true
level-type=default
hardcore=false
enable-status=true
enable-command-block=false
max-players=${server.maxPlayers}
network-compression-threshold=256
resource-pack-sha1=
max-world-size=29999984
function-permission-level=2
rcon.port=25575
server-port=25565
server-ip=
spawn-npcs=true
allow-flight=false
level-name=world
view-distance=10
resource-pack=
spawn-animals=true
white-list=false
rcon.password=
generate-structures=true
max-build-height=256
online-mode=${server.onlineMode}
level-seed=
use-native-transport=true
prevent-proxy-connections=false
enable-jmx-monitoring=false
enable-rcon=false
rate-limit=0
motd=${server.name}`;

fs.writeFileSync(tosrc + '/server/server.properties', properties);