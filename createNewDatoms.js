//Create Datoms on PDS
/*
在host name为{ datomSpaceServer }的 datomSpaceServer上创建新的datom
*/

/*
使用方法： 
  1）先运行datomSpaceServer.js；
  2) 在新的客户端，运行此程序。
*/

/* 
datoms目录
1. 每个datom的discoverykey的最前2个字母是1级目录名，接着2个字母是二级目录名，整个discoverykey是3级目录名。

*/
require('dotenv').config();

const { faker } = require('@faker-js/faker')
const { Client: datomsClient } = require('datomspace') 
const crypto  = require('datom-crypto')
const datomSpaceServer = process.env.PDS
const pd_type = 'travel' //personal data type, change by type

async function start () {

  const c = new datomsClient(
    
    {
    host: datomSpaceServer
  })

  // Ask for the RPC server status to see that everything works
  console.log(`连接 ${datomSpaceServer} ....`)
  console.log(await c.status()) 

  const myStore = c.corestore()

  const datom = myStore.get({

    valueEncoding: 'json'
  })

  console.log(`Step 1: create ${pd_type} datoms\n`)


  //Choose different personal data type to create.


  //1. create new bank account data in the PDS.

  
  /*
  await datom.append({
      name: 'jerry zhang',
      bank: 'bank of china',
      account: '92892xxxx',
      balance: '82988292002'
  })
  */

//2. Create Personal Index data in the PDS.

/*
  for (let i =0; i < 100; i++) {  
    await datom.append({
          index: i,
          value: i*12345
        })
    }

*/

//3. Create new Contacs data in the PDS.
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

  //4. Create new Travle data in the PDS.

  
for (let i =0; i < 10; i++) {
    await datom.append({
      date: faker.date.past(),
      from: faker.address.city(),
      to: faker.address.city()
    }) 
  }



  //console.log('Lengther of the conatct datoms:', Core.length)

//4. create e-commerce VCs data with issuers's proof
/*
 [todo]
 Use DID
*/

  console.log('Create the datoms is:')


  datom.createReadStream()
        .on('data', console.log)
        .on('end', console.log.bind(console, '\n(end)'))
  
 
  console.log('the private key is:', datom.key.toString('hex'))

  console.log('the discovery key is:', crypto.discoveryKey(Buffer.from(datom.key)).toString('hex'))

  

  c.network.configure(datom.discoveryKey, { announce: true, lookup: true })
  
  
}



start()
