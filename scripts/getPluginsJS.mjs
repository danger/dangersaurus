// @ts-check
// https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search
import fs from "fs"
import RegClient from 'npm-registry-client'

var client = new RegClient({})
var search = "https://registry.npmjs.org/-/v1/search?size=250&text=keywords:danger-plugin"
var params = {timeout: 1000}

const get = (url) => new Promise((res) => { client.get(url, params, (err, data) => res(data)) })

const go = async () => {
  const results = await get(search)
  var plugins = []

  for (var result of results.objects) {
    const metadataURL  =  "https://registry.npmjs.org/" + result.package.name
    const json = await get(metadataURL)
    if (json.name && json.name.startsWith("danger-plugin")) {
      plugins.push(json)
    }
  }

  fs.writeFileSync("static/json_data/js_plugins.json", JSON.stringify(plugins, null, '  '))
}

go()
