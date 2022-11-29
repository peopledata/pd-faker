# pd-faker
Personal Data Space Faker

Using Datomspace and [fakerjs](https://fakerjs.dev/) to build up a fake personald data space. 


## 关于个人数据空间的说明
- 每一个用户可以创建一个或多个个人数据空间（PDS）: Personal Data Space
- PDS里的数据结构采用`datoms`协议: [datoms](https://www.npmjs.com/package/datoms)

### datom的结构
一个datom是具有如下标准结构的文件集合。通常包括六个文件（datoms v1.3.0版本）：

- 1.1 [bitfield][bitefield]

采用bitfield对datom的一些状态进行二进制编码（es6标准，前缀为0b）。

```json
state:
		{
      var1: fales,
      var2: true,
      var3: false,
    }
//上述状态用es6的bitfield表示：
const state = 0b010
```

- 1.2 data
​采用wc3 VCs数据模型 的数据资产。一般包括原始数据，metadata以及（数据控制者）数字签名，可验证。
[个人数据VCs格式规范]

- 1.3 key
由一个masterkey生成的private-key.
拥有此key，才能访问datom。

- 1.4 secret_key
由crypto.keyPair()生成的key。
```js
const crypto = require('datom-crypto')

//生成一对新的keyPair: {keyPair.PublicKey, keyPair.secretKey}

const keyPair = crypto.keyPair()
  
console.log('publicKey is ',keyPair.publicKey.toString('hex'))
console.log('secretKey is',keyPair.secretKey.toString('hex'))
```

- 1.5 signatures
对数据块的签名。
```js
signature = crypto.sign(data_block, secretKey)
```

- 1.6 tree
```json
对datom的数据块计算merkle tree。并把root hash存储在此。以作为后续审计和验证。
hash = crypto.data(data) 
hash = crypto.parent(left,right) 
{
  index: treeIndex,
  hash: hashOfThisNode,
  size: byteSizeOfThisTree
}
hash = crypto.tree(peaks) 
```

- 1.7 options