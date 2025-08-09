
const express = require('express');
const router = express.Router();
const pool = require('./db');

// summary: accepts from,to as ISO strings
router.get('/summary', async (req,res)=>{
  const from = req.query.from ? new Date(req.query.from) : new Date();
  const to = req.query.to ? new Date(req.query.to) : new Date();
  const rows = (await pool.query('SELECT selling_price, credit, date_trunc(\'day\', sale_date) as day FROM sales WHERE sale_date >= $1 AND sale_date <= $2', [from, to])).rows;
  const summary = rows.reduce((acc,r)=>{ acc.totalSales += Number(r.selling_price||0); acc.totalRefunds += Number(r.credit||0); return acc; }, { totalSales:0, totalRefunds:0 });
  summary.netSales = summary.totalSales - summary.totalRefunds;
  const times = {};
  rows.forEach(r=> { const d = r.day.toISOString().slice(0,10); times[d] = (times[d]||0) + Number(r.selling_price||0); });
  const timeseries = Object.keys(times).sort().map(k=> ({ date: k, value: times[k] }));
  res.json({ summary, timeseries });
});

// details: filters (from,to,branch array, user array, customer, staff array, currency array, modes array, pagination)
router.get('/details', async (req,res)=>{
  const q = req.query;
  let base = 'SELECT * FROM sales WHERE 1=1';
  const params = [];
  let idx = 1;
  if (q.from) { base += ` AND sale_date >= $${idx++}`; params.push(q.from); }
  if (q.to) { base += ` AND sale_date <= $${idx++}`; params.push(q.to); }
  if (q.branch) { const arr = Array.isArray(q.branch) ? q.branch : [q.branch]; base += ` AND branch = ANY($${idx++}::text[])`; params.push(arr); }
  if (q.user) { const arr = Array.isArray(q.user) ? q.user : [q.user]; base += ` AND username = ANY($${idx++}::text[])`; params.push(arr); }
  if (q.customer) { base += ` AND customer = $${idx++}`; params.push(q.customer); }
  if (q.staff) { const arr = Array.isArray(q.staff) ? q.staff : [q.staff]; base += ` AND staff = ANY($${idx++}::text[])`; params.push(arr); }
  base += ' ORDER BY sale_date DESC';
  const result = await pool.query(base, params);
  res.json({ rows: result.rows, total: result.rows.length });
});

module.exports = router;
