const Npc = require('./utility/npcs');

let npc = new Npc(0);

console.log(npc.index);

npc = new Npc(npc.index);

console.log(npc.index);

npc = new Npc(npc.index);

console.log(npc.index);

npc = new Npc(npc.index);

console.log(npc.index);

console.log(npc.isCoolDown);

npc.coolDown(10);

setInterval(() => {
  console.log(npc.isCoolDown);
}, 1000);
