
const express = require('express');
const router = express.Router();
const pool = require('./db');
const ExcelJS = require('exceljs');
const { stringify } = require('csv-stringify/sync');
const PDFDocument = require('pdfkit');

router.get('/details/csv', async (req,res)=>{
  const rows = (await pool.query('SELECT * FROM sales ORDER BY sale_date DESC')).rows;
  const header = ['SL NO','DOCUMENT NO','DOC DATE','AWB NO','ISSUE DATE','CUSTOMER','AIRLINE','SHIPPER NAME','GROSS WEIGHT','CHARGABLE WEIGHT','NO OF UNIT','FREIGHT CHARGE','INPUT TAX','COMMISSION','SUPPLIER CHARGE','AIRLINE CHARGE','INCOME','OUTPUT TAX','COST','SELLING PRICE','REVENUE'];
  const records = rows.map((r,i)=> [i+1, r.doc_no, r.sale_date.toISOString().slice(0,10), r.awb_no, r.issue_date ? r.issue_date.toISOString().slice(0,10) : '', r.customer, r.airline, r.shipper, r.gross_weight, r.chargeable_weight, r.no_pieces, r.freight_charge, r.input_tax, r.commission, r.supplier_charges || '', r.airline_charges || '', r.income_other_charges || '', r.output_tax, r.cost, r.selling_price, r.selling_price - r.cost]);
  const csv = stringify([header, ...records]);
  res.setHeader('Content-Type','text/csv'); res.setHeader('Content-Disposition','attachment; filename="details_export.csv"'); res.send(csv);
});

router.get('/details/excel', async (req,res)=>{
  const rows = (await pool.query('SELECT * FROM sales ORDER BY sale_date DESC')).rows;
  const workbook = new ExcelJS.Workbook(); const sheet = workbook.addWorksheet('Details');
  sheet.addRow(['SL NO','DOCUMENT NO','DOC DATE','AWB NO','ISSUE DATE','CUSTOMER','AIRLINE','SHIPPER NAME','GROSS WEIGHT','CHARGABLE WEIGHT','NO OF UNIT','FREIGHT CHARGE','INPUT TAX','COMMISSION','SUPPLIER CHARGE','AIRLINE CHARGE','INCOME','OUTPUT TAX','COST','SELLING PRICE','REVENUE']);
  rows.forEach((r,i)=> sheet.addRow([i+1, r.doc_no, r.sale_date.toISOString().slice(0,10), r.awb_no, r.issue_date ? r.issue_date.toISOString().slice(0,10) : '', r.customer, r.airline, r.shipper, r.gross_weight, r.chargeable_weight, r.no_pieces, r.freight_charge, r.input_tax, r.commission, r.supplier_charges || '', r.airline_charges || '', r.income_other_charges || '', r.output_tax, r.cost, r.selling_price, r.selling_price - r.cost]));
  res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition','attachment; filename="details.xlsx"');
  await workbook.xlsx.write(res); res.end();
});

router.get('/summary/pdf', async (req,res)=>{
  const rows = (await pool.query('SELECT selling_price FROM sales')).rows;
  const doc = new PDFDocument(); res.setHeader('Content-Type','application/pdf'); res.setHeader('Content-Disposition','attachment; filename="summary.pdf"');
  doc.pipe(res); doc.fontSize(18).text('Daily Sales Summary', {align:'center'}); doc.moveDown();
  const total = rows.reduce((a,r)=> a + Number(r.selling_price||0),0); doc.fontSize(12).text('Total Sales: ' + total); doc.end();
});

module.exports = router;
