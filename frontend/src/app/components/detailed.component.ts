
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({selector:'app-detailed', template:`
<div class='card'><h3>Detailed</h3><div><button (click)='exportCsv()'>Export CSV</button> <button (click)='exportExcel()'>Export Excel</button></div><div *ngIf='rows'><div *ngFor='let r of rows'>{{r.doc_no}} - {{r.customer}} - {{r.selling_price}}</div></div></div>`})
export class DetailedComponent implements OnInit{
  rows:any[]=[];
  constructor(private ds:DataService) {}
  ngOnInit(){ this.load(); }
  load(){ this.ds.getDetails({}).subscribe((r:any)=> this.rows = r.rows); }
  exportCsv(){ this.ds.exportDetailsCsv().subscribe(b=>{ const url = URL.createObjectURL(b); const a=document.createElement('a'); a.href=url; a.download='details.csv'; a.click(); }); }
  exportExcel(){ this.ds.exportDetailsExcel().subscribe(b=>{ const url = URL.createObjectURL(b); const a=document.createElement('a'); a.href=url; a.download='details.xlsx'; a.click(); }); }
}
