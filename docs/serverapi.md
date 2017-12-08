How to write a service API
=========================

## Server side structure

```
server
├── api
│   ├── todo
│   └── todos
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

First, create a directory under server/api, just like `todo`, `todos`. This directory is more like a namespace/category, it means the APIs you are going to create under this directory are related. For example: `test`

Second, let's create an API module for the category `test` we created above. For example: we name it `opertest.js`

Let's take a look how will this `opertest.js` looks like?

```javascript
const { ONE_DAY } = require('../../core/util/constant')
 
/**
 * declare the API
 */
module.exports.api = '/api/test/:_id?'
 
/**
 * declare a get method for this API, usually it is used to fetch a specified resource
 *
 * sendApi method helps you to organize the data into project-agreed format
 *
 * @param {*} req request instance passed from express
 * @param {*} res response instance passed from express
 * @param {Injectable Service} TestService, you can inject as many services as you need at the end
 */
module.exports.get = async function(req, res, TestService) {
  //get all items from test collection
  const docs = await TestService.getAllItems()
 
  res
    .cacheFor(ONE_DAY) //set Cache-Control header
    .sendApi(docs)
}
 
/**
 * declare a post method for this API, usually it used to create a resource
 *
 * @param {*} req request instance passed from express
 * @param {*} res response instance passed from express
 * @param {Injectable Service} TestService, you can inject as many services as you need at the end
 */
module.exports.post = async function(req, res, TestService) {
  const result = await TestService.createItem(req.body)
 
  res.sendApi(result)
}
 
/**
 * declare a put method for this API, usually it used to update a resource
 *
 * @param {*} req request instance passed from express
 * @param {*} res response instance passed from express
 * @param {Injectable Service} TestService, you can inject as many services as you need at the end
 */
module.exports.put = async function(req, res, TestService) {
  const result = await TestService.updateItem(req.params._id, req.body)
 
  res.sendApi(result)
}
 
/**
 * declare a delete method for this API, usually it used to delete a resource
 *
 * @param {*} req request instance passed from express
 * @param {*} res response instance passed from express
 * @param {Injectable Service} TestService, you can inject as many services as you need at the end
 */
module.exports.delete = async function(req, res, TestService) {
  const result = await TestService.deleteItem(req.params._id)
 
  res.sendApi(result)
}
```

You may see that we inject `TestService` at the end of arguments for each function. It is our Dependency-Injection feature, you can inject as many services as you need at the end of argument list, the framework will create instance for each request(so that you won't worry about the shared state to be polluted). The argument you injected should be the service class name.

Then, let's create this `TestService` at `server/service/`

```javascript
const InvalidParamsError = require('../core/error/InvalidParamsError')

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

>The class name(`TestService`) should be the one you injected in opertest.js

Now, you can re-launch the server, and try following command to test your API:

```bash
#get all items from test collection
curl http://localhost:3000/api/test
 
#create a new test item with testName: test
curl -X POST http://localhost:3000/api/test -H 'content-type: application/json' -d '{"testName": "test"}'
 
#update a specific test item with new testName: hello
curl -X PUT http://localhost:3000/api/test/<testID> -H 'content-type: application/json' -d '{"testName": "hello"}'
 
#delete a specific test item
curl -X DELETE http://localhost:3000/api/test/<testID> -H 'content-type: application/json'
```
