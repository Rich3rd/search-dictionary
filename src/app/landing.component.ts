import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { RouterModule }   from '@angular/router';
import { DataService } from './data.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from './user';
import { DNS } from './DNS';

import { FilterPipe }from './filter.pipe';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {DataTableModule, SharedModule, DialogModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';


@Component({
  selector: 'landing-root',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})



export class LandingComponent implements OnInit{
  users: User[];
  allDNS: DNS[];
  selectedDNS: DNS;
  cols: any[];
  dialogVisible: boolean;
  disabled: boolean = true;

  ngOnInit() {
    this.getAllDNS();

    this.cols = [
        {field: 'subdomain', header: 'Subdomain'},
        {field: 'primaryip', header: 'Primary IP'},
        {field: 'remark', header: 'Remark'}
    ];
}

  constructor(private _dataService: DataService) {
    //this.getAllDNS();
  }

  // insert DNS
  public insertDNS(subDomain: String, primaryIP: String, remark: String ){
    this._dataService.insertDNS(subDomain, primaryIP, remark);
    this.getAllDNS();
  }

  // get all DNS
  public getAllDNS() {
    this._dataService.getAllDNS()
    .subscribe(allDNS => this.allDNS = allDNS);
  }

  public updateDNS(dns: DNS, subDomain: String, primaryIP: String, remark: String): void {
    this._dataService
      .updateDNS(dns, subDomain, primaryIP, remark);
  }

  public delete(user: User): void {
    console.log(user._id);
    this._dataService
      .delete(user._id);
  }

  public deleteDNS(dns: DNS): void {
    this._dataService
    .deleteDNS(dns._id);
  }

  public getUser(name: String): void {
    console.log('get user at landing component  : ' + name);
    this._dataService
      .getUser(name);
  }

  onSelect(dns: DNS) {
    this.selectedDNS = dns;
    this.dialogVisible = true;
    /*
    this.selectedDNS.prev_subdomain = dns.subdomain;
    this.selectedDNS.prev_primaryip = dns.primaryip;
    this.selectedDNS.prev_remark = dns.remark;
    */
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
}
}

