
const pool = require('../src/db');
const bcrypt = require('bcrypt');
async function seed(){
  await pool.query("INSERT INTO users(username, password_hash, role) VALUES($1,$2,$3) ON CONFLICT (username) DO NOTHING", ['admin', await bcrypt.hash('admin123',10), 'admin']);
  await pool.query("INSERT INTO users(username, password_hash, role) VALUES($1,$2,$3) ON CONFLICT (username) DO NOTHING", ['manager', await bcrypt.hash('manager123',10), 'manager']);
  // insert a few sales
  for(let i=0;i<50;i++){
    const now = new Date();
    await pool.query("INSERT INTO sales(doc_no, sale_date, issue_date, awb_no, customer, airline, shipper, nature, no_pieces, rate, gross_weight, chargeable_weight, cost, selling_price, freight_charge, commission, input_tax, supplier_charges, airline_charges, income_other_charges, output_tax, staff, username, branch, card_paid, reference, narration, cash, card, cheque, transfer, credit) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32)", 
    ['DOC'+(1000+i), now, now, 'AWB'+(2000+i), ['Alpha','Beta','Gamma'][i%3], ['AirA','AirB'][i%2], 'Shipper'+(i%5), 'General', i%5+1, 100+i, 10+i, 12+i, 200+i, 400+i, 50+i, 5+i, 10+i, 'Fuel:20;Handling:5', 'Surcharge:10', 'Service:15', 12+i, ['Neeraj','Mohan'][i%2], ['system','admin'][i%2], ['Mumbai','Delhi','Bengaluru'][i%3], 100, 'REF'+(3000+i), 'Sample', 10, 20, 0, 5, 0]);
  }
  console.log('Seeded demo users and sales');
  process.exit(0);
}
seed().catch(e=>{console.error(e);process.exit(1)});
