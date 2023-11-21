'use strict';

const express = require('express');
const path = require('path');
const uuid = require('uuid');

const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/demo-app/index.html'));
});

app.get('/healthz', (req, res) => {
  res.send('healthy');
});

app.get(['/generateuuid', '/demo-app/generateuuid'], (req, res) => {
  const newUUID = uuid.v4()
  diag.info("New UUID is ", newUUID);
  res.send(newUUID);
});

// serve your css as static
app.use(express.static(path.join(__dirname + '/demo-app/')));
app.use(express.static(__dirname));

app.listen(PORT, HOST, () => {
  diag.info(`Running on http://${HOST}:${PORT}`);
});