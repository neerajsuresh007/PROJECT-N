
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({selector:'app-root', template:`
<div class="ns-top"><span style="font-weight:600">NutraACS — Daily Sales</span><span style="float:right"><button *ngIf="!auth.getUser()" (click)="showLogin=true">Login</button><button *ngIf="auth.getUser()" (click)="logout()">Logout</button></span></div>
<div *ngIf="showLogin"><app-login></app-login></div>
<div *ngIf="!showLogin">
  <div style="display:flex;padding:16px;gap:12px;">
    <button (click)='view="summary"'>Summary</button>
    <button (click)='view="detailed"'>Detailed</button>
    <button (click)='view="customer"'>Customer</button>
    <div style="flex:1"></div>
    <div *ngIf='auth.hasRole("admin")'><button (click)='adminAction()'>Admin Action</button></div>
  </div>
  <div style="padding:16px;">
    <app-summary *ngIf="view==='summary'"></app-summary>
    <app-detailed *ngIf="view==='detailed'"></app-detailed>
    <app-customer *ngIf="view==='customer'"></app-customer>
  </div>
</div>`})
export class AppComponent{ view='summary'; showLogin=false; constructor(public auth:AuthService){} logout(){ this.auth.logout(); window.location.reload(); } adminAction(){ alert('admin action'); }}