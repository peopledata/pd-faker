const crypto = require('datom-crypto')
const b4a = require('b4a')
const fs = require('fs/promises')
const shell = require('shelljs')
const datoms_url='/home/ubuntu/pd-faker/datomspace/5e/61/5e6198d1396448421201e1b5b4e57fbd1086bab08f99f52a4a89380fba74416e'
// 解析datom的结构，演示如何使用。

async function readDatomTree() {
    try {
      //读private_key
      const key = await fs.readFile(`${datoms_url}/key`);
      console.log('The Private Key is:', key.toString('hex'));

      //读datomsde name 
      const name = await fs.readFile(`${datoms_url}/name`);
      console.log('The datoms name is:', name.toString('utf-8'));
      
      
      //读签名
      const signatures = await fs.readFile(`${datoms_url}/signatures`);
      console.log('the datoms sign is:',signatures.toString('hex'));

      //读tree
      //const tree = await fs.readFile(`${datoms_url}/tree`);
      //console.log('the datoms tree is:',tree.toString('hex'));
      

    } catch (err) {
      console.log(err);
    };

    // 构造一个生产NFT用的VCs凭证
    // 用datom中的signatures
};


  readDatomTree()