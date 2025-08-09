
import { Injectable } from '@angular/core';
@Injectable({providedIn:'root'})
export class AuthService {
  login(token:any, user:any){ localStorage.setItem('dsr_token', token); localStorage.setItem('dsr_user', JSON.stringify(user)); }
  logout(){ localStorage.removeItem('dsr_token'); localStorage.removeItem('dsr_user'); }
  getUser(){ return JSON.parse(localStorage.getItem('dsr_user') || 'null'); }
  hasRole(r:any){ const u=this.getUser(); return u && u.role===r; }
}
