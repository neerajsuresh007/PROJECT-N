
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SummaryComponent } from './components/summary.component';
import { DetailedComponent } from './components/detailed.component';
import { CustomerComponent } from './components/customer.component';
import { AuthInterceptor } from './auth.interceptor';
import { DataService } from './data.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, SummaryComponent, DetailedComponent, CustomerComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, FontAwesomeModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
