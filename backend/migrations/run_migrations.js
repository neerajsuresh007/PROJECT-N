
const fs = require('fs');
const path = require('path');
const pool = require('../src/db');

async function run() {
  const dir = path.join(__dirname);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  for (const f of files) {
    const sql = fs.readFileSync(path.join(dir,f), 'utf8');
    console.log('Running', f);
    await pool.query(sql);
  }
  console.log('Migrations complete');
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1); });
