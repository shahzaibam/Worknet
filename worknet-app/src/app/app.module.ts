import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ClockingComponent} from "./components/clocking/clocking.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ClockingButtonsComponent } from './components/clocking-buttons/clocking-buttons.component';
import { ClockingRecordsComponent } from './components/clocking-records/clocking-records.component';
import { LoginEmployeeComponent } from './components/login-employee/login-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockingComponent,
    ClockingButtonsComponent,
    ClockingRecordsComponent,
    LoginEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
