import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import { DNS } from './DNS';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) {

  }
  user: User;


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getUsers() {
    return this._http.get('http://localhost:3000/api/users')
      .map(result => this.result = result.json().data);
  }

  getUser(name: String) {
    const url = `http://localhost:3000/api/users/${name}`;
    console.log(`${name}`);
    return this._http.get(url)
    .toPromise()
    .then(response => response.json().data)
    .catch(this.handleError);
  }

  getUser_id(_id: String) {
    const url = `http://localhost:3000/api/userss/${_id}`;
    console.log(this._http.get(url));
    return this._http.get(url);
  }

  insertUser(name: String) {
    console.log('hit insert');

    // Headers
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post('http://localhost:3000/api/addUser', {name: `${name}`}, options)
    .subscribe();
  }

  insertDNS(subDomain: String, primaryIP: String, remark: String) {
    // Headers
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post('http://localhost:3000/api/addDNS', {subdomain: `${subDomain}`, primaryip: `${primaryIP}`, remark: `${remark}`}, options)
    .subscribe();
  }

  getAllDNS() {
    return this._http.get('http://localhost:3000/api/getAllDNS')
    .map(result => this.result = result.json().data);
  }

  updateDNS(dns: DNS, subDomain: String, primaryIP: String, remark: String) {
    console.log('hit edit');
    console.log(dns.subdomain);
    console.log('IN DATA SERVICE')
    console.log(subDomain);
    console.log(primaryIP);
    console.log(remark);

    // Headers
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    this.deleteDNS(dns._id);
    this.insertDNS(subDomain, primaryIP, remark);
  }

  deleteDNS(_id: String) {
    // Headers
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Header': 'Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin'
     });
   const options = new RequestOptions({ headers: headers });

   return this._http.delete(`http://localhost:3000/api/deleteDNS/${_id}`, options)
   .subscribe();
  }

  delete(_id: String) {
    console.log('hit delete');
    console.log(_id);
    const headers = new Headers({
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
       'Access-Control-Allow-Credentials': 'true',
       'Access-Control-Allow-Header': 'Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin'
      });
    const options = new RequestOptions({ headers: headers });

    return this._http.delete(`http://localhost:3000/api/deleteUser/${_id}`, options)
    .subscribe();
  }

  edit(user: User) {
    console.log('hit edit');
    console.log(name);

    // Headers
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.put('http://localhost:3000/api/updateUser', {name: `${user.name}`, prev_name: `${user.prev_name}`}, options)
    .subscribe();
  }

  

}
