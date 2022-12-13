//添加新的数据到已有的datoms里

require('dotenv').config();
const { faker } = require('@faker-js/faker')
const { Client: datomsClient } = require('datomspace') 
const crypto  = require('hypercore-crypto')
const datomSpaceServer = process.env.PDS
const pd_type = 'banks' //personal data type, change by type



//给那个datoms添加新的datom，就用其的key.

// contacts

//const key = 'af34af9259c7c5c7b7530d0ff73f72ba00329f1504649cf5af28bfec75ba6a8d'


// banks
//const key = '6828a127ab4d0ea710739ddcac62beb922313196cfa8bacf8ce1d887ab67dc65'
const key = '93f7407766313b5f96cd5c09c9c42deed7eef15c589f501c558f8f4ec38e3d5e'

//index
//const key = 'dfe1651b07d58966833c1c8861110327cb8e921dc3cf1fb63c573708f15f4921'

//travel
//const key = '22dc94846f041d2b4c650b94683fa26451d829d9da4d32d97b4d2e2c5fdf6a97'


async function start () {
  const c = new datomsClient({
    host: datomSpaceServer
  })

  // Ask for the RPC server status to see that everything works
  console.log(`连接 ${datomSpaceServer} ....`)
  console.log(await c.status()) 

  const myStore = c.corestore()

  
  // use datoms name to appaned new datom.
  const datom = myStore.get({
    name: 'travel', 
    valueEncoding: 'json'
  })

  

  /*
  //use the private-key to append new datom
  const datom = myStore.get(key, { 
    valueEncoding: 'json'
  })
  */
  


  console.log(`Step 1: appned new datom on ${key} \n`)



  //1. Append 4 new data to the bank account datoms.
  
  /*
  await datom.append({
      name: 'Jerry',
      bank: 'HSBC',
      account: '1002-200-300',
      balance: '21000'
  })
  
  */

//2. Create Personal Index data to the index datoms
/*
    await datom.append({
          index: 100,
          value: 1112345
        })  
*/

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

  //4. travel data
  
  await datom.append({
    date: faker.date.past(),
    from: faker.address.city(),
    to: faker.address.city()
  })

  

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
