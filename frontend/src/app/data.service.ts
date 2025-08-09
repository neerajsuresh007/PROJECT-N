
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DataService{
  constructor(private http:HttpClient){}
  getSummary(from:any='', to:any=''){ return this.http.get('/api/reports/summary', { params: { from, to } }); }
  getDetails(q:any){ return this.http.get('/api/reports/details', { params: q }); }
  exportDetailsCsv(){ return this.http.get('/api/exports/details/csv', { responseType: 'blob' }); }
  exportDetailsExcel(){ return this.http.get('/api/exports/details/excel', { responseType: 'blob' }); }
  getCustomersSummary(){ return this.http.get('/api/reports/customers/summary'); }
  getCustomerDetail(id:any){ return this.http.get('/api/reports/customers/' + encodeURIComponent(id) + '/detail'); }
}
