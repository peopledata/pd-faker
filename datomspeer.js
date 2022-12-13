
require('dotenv').config();

const { Client : datomsClient } = require('datomspace') 
const Swarm = require('peopleswarm')

const crypto  = require('datom-crypto')
const datomSpaceServer = process.env.PDS

// datom's public key.
const publickey = '92ca104bac39bc69cc33edd2c2b47168a12b09aaff19377dd4adff81e2a7dcac'


async function start() {


  const swarm = new Swarm()

  const c = new datomsClient({
    host: datomSpaceServer
  })

  // Ask for the RPC server status to see that everything works
  console.log(`连接 ${datomSpaceServer} ....`)
  console.log(await c.status()) 

  const myStore = c.corestore()


// Setup corestore replication
  swarm.on('connection', (connection) => myStore.replicate(connection))


  const datom = myStore.get(publickey,{
    valueEncoding: 'json'
  })

  await datom.ready()




// Make sure the length is loaded
await datom.ready()

// Join the discoveryKey (a hash of it's public key)
swarm.join(datom.discoveryKey)

await swarm.flush()

await datom.update()

console.log('datom length is:', datom.length)

}

start()
