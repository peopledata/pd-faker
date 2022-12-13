import Swarm from 'peopleswarm'
import crypto from 'crypto'

// Run swarm instance

const swarm = new Swarm()

// Swarms abstract away servers and clients and just gives you connections
swarm.on('connection', function (encryptedSocket) {
  console.log('New connection from', encryptedSocket.remotePublicKey.toString('hex'))

  encryptedSocket.write('Hello PeopleData!')


  encryptedSocket.on('data', function (data) {
    console.log('Remote peer said:', data.toString())
  })
  encryptedSocket.on('error', function (err) {
    console.log('Remote peer errored:', err)
  })
  encryptedSocket.on('close', function () {
    console.log('Remote peer fully left')
  })

  process.stdin.pipe(encryptedSocket).pipe(process.stdout)
  
})

// Topics are just identifiers to find other peers under
const topic = crypto.createHash('sha256').update('Insert a topic name here').digest()
swarm.join(topic)
