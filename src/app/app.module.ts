import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { DataService } from './data.service';
import { FilterPipe }from './filter.pipe';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent} from './landing.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataTableModule, SharedModule, DialogModule } from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
     SharedModule,
      DataTableModule,
     BrowserAnimationsModule,
     DialogModule,
     ButtonModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
