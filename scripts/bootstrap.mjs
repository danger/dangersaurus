// @ts-check
import { existsSync } from "fs"
import {exec} from "./util.mjs"

const clone = (lang, docs) => {
  const repo = lang === "js" ? "danger-js"
    : lang === "ruby" ? "danger" :
      lang === "dart" ? "danger.dart" : lang
  
  if (!existsSync("repos/" + lang))
    exec(`git clone https://github.com/danger/${repo} repos/${lang}`)

  if (!existsSync("docs/"))
    exec(`mkdir docs`)

  
  if (docs) {
    exec(`cp -r repos/${lang}/${docs} docs/${lang}`)
  } else {
    if (!existsSync("docs/" + lang)) exec(`mkdir docs/${lang}`)
    exec(`cp repos/${lang}/README.md docs/${lang}`)
  }
}

console.log("Cloning docs")

clone("js", "docs")
clone("ruby", "docs")
clone("swift", "Documentation")
clone("kotlin", "docs")
clone("python")
clone("dart")
