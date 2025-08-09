
-- 001_create_users_and_sales.sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  doc_no VARCHAR(100),
  sale_date TIMESTAMP NOT NULL,
  issue_date TIMESTAMP,
  awb_no VARCHAR(100),
  customer VARCHAR(255),
  airline VARCHAR(255),
  shipper VARCHAR(255),
  nature VARCHAR(255),
  no_pieces INT,
  rate NUMERIC,
  gross_weight NUMERIC,
  chargeable_weight NUMERIC,
  cost NUMERIC,
  selling_price NUMERIC,
  freight_charge NUMERIC,
  commission NUMERIC,
  input_tax NUMERIC,
  supplier_charges TEXT,
  airline_charges TEXT,
  income_other_charges TEXT,
  output_tax NUMERIC,
  staff VARCHAR(100),
  username VARCHAR(100),
  branch VARCHAR(100),
  card_paid NUMERIC,
  reference VARCHAR(255),
  narration TEXT,
  cash NUMERIC,
  card NUMERIC,
  cheque NUMERIC,
  transfer NUMERIC,
  credit NUMERIC
);
