import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DataService } from'./data.service';
import { FilterPipe }from './filter.pipe';
@Component({
  selector: 'app-root',
  template : ' <landing-root></landing-root>'
})
export class AppComponent {
  title = 'app';

  constructor(private _http:Http, private dataService: DataService){}



}
