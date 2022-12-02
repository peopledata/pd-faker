//添加新的数据到已有的datoms里

require('dotenv').config();

const { Client: datomsClient } = require('datomspace') 
const crypto  = require('hypercore-crypto')
const datomSpaceServer = process.env.PDS
const pd_type = 'banks' //personal data type, change by type



//给那个datoms添加新的datom，就用其的key.

// contacts
//const key = '6b5e26571af4ee064731eba773dd0c6d1b0c18ce1847d3065c029a7bc9babe13'


// banks
//const key = 'fe46faeae5e24b2889c97d075b6f1c476a3285b0cc792e1fd1601b3442c7d906'

//index
const key = 'b40b4be08e1ebad38ebc01dcdec25741b56814ffb3bbb83f8e737367eafc7a12'


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

  console.log(`Step 1: appned new datom on ${key} \n`)



  //1. Append 4 new data to the bank account datoms.
  
  /*
  await datom.append({
      name: 'Tom Lee',
      bank: 'ICCB',
      account: '12-231-92892xxxx',
      balance: '1112322'
  })
  */

//2. Create Personal Index data to the index datoms

    await datom.append({
          index: 100,
          value: 1112345
        })  


//3. Append new Contacs data to the datoms.
/*
for (let i =0; i < 10; i++) {
    await datom.append({
      name: faker.name.firstName(),
      Company: faker.company.name(),
      jobTitle: faker.name.jobTitle(),
      Tel: faker.phone.number(),
      City: faker.address.city(),
      Address: faker.address.streetAddress(),
      emal: faker.internet.email(),
      zipcode: faker.address.zipCode()
    }) 
  }
  */

  

  //console.log('Lengther of the conatct datoms:', Core.length)

//4. create e-commerce VCs data with issuers's proof
/*
 [todo]
 Use DID
*/

  //console.log('Lengther of the conatct datoms:', Core.length)

  console.log('Append the datoms is:')


  datom.createReadStream()
        .on('data', console.log)
        .on('end', console.log.bind(console, '\n(end)'))
  
 
  console.log('the private key is:', datom.key.toString('hex'))

  console.log('the discovery key is:', crypto.discoveryKey(Buffer.from(datom.key)).toString('hex'))

  c.network.configure(datom.discoveryKey, { announce: true, lookup: true })
  
  
}



start()
