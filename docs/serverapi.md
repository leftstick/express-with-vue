# How to write a service API

## Server side structure

```
server
├── apis
│   ├── todo.js
│   └── todos.js
├── core
│   ├── di
│   ├── error
│   ├── express
│   ├── extension
│   └── util
├── entry
└── service
```

## How to create API?

First, create a js-file/directory under `server/apis`, just like `todo.js`, `todos.js`. The directory here is more like a namespace/category, it means the APIs you are going to create under this directory are related. For example: `tests`

Second, let's create an API module with the category `tests` we created above. For example: we name it `opertest.js`

Let's take a look how will this `opertest.js` looks like?

```javascript
const service = require('../../service/TestService')
const { resolveResult } = require('../../assistant/utils/http')

/**
 * @method get
 * @api /tests/:id
 **/
module.exports.getTestById = async function(req, res) {
  //get all items from test collection
  const docs = await service.getAllItems()

  return res.json(resolveResult(docs))
}

/**
 * @method post
 * @api /tests
 **/
module.exports.createTest = async function(req, res) {
  const result = await service.createItem(req.body)

  return res.json(resolveResult(result))
}

/**
 * @method put
 * @api /tests/:id
 **/
module.exports.updateTest = async function(req, res) {
  const result = await service.updateItem(req.params._id, req.body)

  return res.json(resolveResult(result))
}

/**
 * @method delete
 * @api /tests/:id
 **/
module.exports.delete = async function(req, res) {
  const result = await service.deleteItem(req.params._id)

  return res.json(resolveResult(result))
}
```

Then, let's create this `TestService` at `server/service/`

```javascript
const InvalidParamsError = require('../error/InvalidParamsError')

let items = []

class TestService {
  async getAllItems() {
    return items
  }

  async createItem(opts) {
    items.push(opts)
    return opts
  }

  async updateItem(_id, opts) {
    if (!_id) {
      throw new InvalidParamsError('[_id] is missing in path')
    }
    const found = items.find(item => item._id === _id)

    if (!found) {
      throw new InvalidParamsError(`[${_id}] is not exist`)
    }

    found.testName = opts.testName
    found.testTime = new Date()

    return found
  }

  async deleteItem(_id) {
    if (!_id) {
      throw new InvalidParamsError('[_id] is missing in path')
    }
    const found = items.find(item => item._id === _id)

    items = items.filter(item => item._id !== _id)

    return found
  }
}

module.exports = TestService
```

> The class name(`TestService`) should be the one you injected in opertest.js

Now, you can re-launch the server, and try following command to test your API:

```bash
#get all items from test collection
curl http://localhost:3000/apis/test

#create a new test item with testName: test
curl -X POST http://localhost:3000/apis/test -H 'content-type: application/json' -d '{"testName": "test"}'

#update a specific test item with new testName: hello
curl -X PUT http://localhost:3000/apis/test/<testID> -H 'content-type: application/json' -d '{"testName": "hello"}'

#delete a specific test item
curl -X DELETE http://localhost:3000/apis/test/<testID> -H 'content-type: application/json'
```
