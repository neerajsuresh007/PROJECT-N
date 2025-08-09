
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({selector:'app-summary', template:`
<div class="card"><h3>Summary</h3><div><button (click)="load()">Refresh</button></div><div *ngIf='summary'>Total: {{summary.totalSales}}</div></div>`})
export class SummaryComponent implements OnInit{
  summary:any;
  constructor(private ds:DataService) {}
  ngOnInit(){ this.load(); }
  load(){ this.ds.getSummary().subscribe((r:any)=> this.summary = r.summary); }
}
