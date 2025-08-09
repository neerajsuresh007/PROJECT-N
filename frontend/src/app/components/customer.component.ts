
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({selector:'app-customer', template:`<div class='card'><h3>Customer Summary</h3><div *ngIf='rows'><div *ngFor='let r of rows'>{{r.customer}} - {{r.totalRevenue}} <button (click)='exportLines(r.customer)'>Export Lines</button></div></div></div>`})
export class CustomerComponent implements OnInit{
  rows:any[]=[];
  constructor(private ds:DataService) {}
  ngOnInit(){ this.load(); }
  load(){ this.ds.getCustomersSummary().subscribe((r:any)=> this.rows = r.rows); }
  exportLines(c:any){ fetch('/api/customers/' + encodeURIComponent(c) + '/export/csv').then(r=> r.blob()).then(b=>{ const url=URL.createObjectURL(b); const a=document.createElement('a'); a.href=url; a.download=c + '_lines.csv'; a.click(); }); }
}
