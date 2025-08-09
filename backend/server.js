
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/db');
const auth = require('./src/auth');
const reports = require('./src/reports');
const users = require('./src/users');
const exportsRouter = require('./src/exports');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', users);
app.use('/api/reports', auth.authenticateJWT, reports);
app.use('/api/exports', auth.authenticateJWT, exportsRouter);

app.get('/api/health', (req,res)=> res.json({status:'ok', ts: Date.now()}));

// serve frontend build in production
const staticPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
  app.get('*', (req,res)=> {
    if (req.path.startsWith('/api')) return res.status(404).json({error:'Not found'});
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on port', PORT));
