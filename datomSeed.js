//Preaper for Swarm 

require('dotenv').config();

const { faker } = require('@faker-js/faker')
const { Client: datomsClient } = require('datomspace') 
const Swarm = require('peopleswarm')

const crypto  = require('datom-crypto')
const datomSpaceServer = process.env.PDS
const pd_type = 'private' //personal data type, change by type
const key = '9941fe393c391bfb7a04e342de7c4c1608df7a0e12415d6e9aa6c56dcd4699d8'

async function start () {


    const swarm = new Swarm()


    const c = new datomsClient({
      host: datomSpaceServer
    })
  
    // Ask for the RPC server status to see that everything works
    console.log(`连接 ${datomSpaceServer} ....`)
    console.log(await c.status()) 
  
    const myStore = c.corestore()
  
    const datom = myStore.get(key,{
      valueEncoding: 'json'
    })

    await datom.ready()

  

  // Ask for the RPC server status to see that everything works
  console.log(`连接 ${datomSpaceServer} ....`)
  console.log(await c.status()) 

  datom.createReadStream()
        .on('data', console.log)
        .on('end', console.log.bind(console, '\n(end)'))
  
 
  console.log('the private key is:', datom.key.toString('hex'))

  console.log('the discovery key is:', crypto.discoveryKey(Buffer.from(datom.key)).toString('hex'))

  

  c.network.configure(datom.discoveryKey, { announce: true, lookup: true })

  swarm.join(datom.discoveryKey)





  
  
}



start()
