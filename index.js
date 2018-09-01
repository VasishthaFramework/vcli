#!/usr/bin/env node

const program = require("commander");
const path = require("path");
const fs = require("fs");
const { V } = require("@archanpatkar/vasishtha-core");
let port = 8080;

program
  .version('0.0.1', '-v, --version')
  .arguments('[file]')
  .option('-p, --port [value]','Port Number')
  .action(function(file) {
    const filepath = path.resolve(file);
    const app = new V();
    const controllers = `${filepath}/controllers`;
    const views = `${filepath}/views`;
    const static = `${filepath}/static`;
    if(fs.existsSync(controllers)) {
        app.load(controllers);
    }
    if(fs.existsSync(views)) {
        app.views(views);
    }
    if(fs.existsSync(static)) {
        app.static(static);
    }
    if(program.port != undefined) port = program.port;
    app.start(port);
  })
  .parse(process.argv);