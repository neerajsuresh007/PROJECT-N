
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
@Component({selector:'app-login', template:`
<div style="padding:24px; max-width:420px; margin:40px auto; background:white; border-radius:8px;">
  <h3>Sign in</h3>
  <div><input placeholder="Username" [(ngModel)]="username"/></div>
  <div style="margin-top:8px;"><input type="password" placeholder="Password" [(ngModel)]="password"/></div>
  <div style="margin-top:12px;"><button (click)="login()">Login</button></div>
</div>`})
export class LoginComponent{
  username=''; password='';
  constructor(private http:HttpClient, private auth:AuthService){}
  login(){ this.http.post('/api/auth/login', { username: this.username, password: this.password }).subscribe((r:any)=>{ this.auth.login(r.token, r.user); window.location.reload(); }); }
}
