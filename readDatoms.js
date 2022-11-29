
require('dotenv').config();

const { Client: datomsClient } = require('datomspace') 
const crypto  = require('hypercore-crypto')
const datomSpaceServer = process.env.PDS
const pd_type = 'contacts' //personal data type, change by type



//给那个datoms添加新的datom，就用其的key.

// contacts
const key = '6b5e26571af4ee064731eba773dd0c6d1b0c18ce1847d3065c029a7bc9babe13'


// banks
//const key = 'fe46faeae5e24b2889c97d075b6f1c476a3285b0cc792e1fd1601b3442c7d906'


async function start () {
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

  

  datom.createReadStream()
        .on('data', console.log)
        .on('end', console.log.bind(console, '\n(end)'))
  
 
  console.log('the private key is:', datom.key.toString('hex'))

  console.log('the discovery key is:', crypto.discoveryKey(Buffer.from(datom.key)).toString('hex'))

  c.network.configure(datom.discoveryKey, { announce: true, lookup: true })
  
  
}



start()
