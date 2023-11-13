import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'https://api.openbrewerydb.org/v1/breweries'

  constructor() { }

  getData(name: string, city: string, type: string): Observable<any> {
    this.apiUrl = 'https://api.openbrewerydb.org/v1/breweries'
    let isPresent:boolean = true;
    if (name!=='') {
      this.apiUrl = this.apiUrl + '?by_name=' + name;
      isPresent = false;
    }
    if (type!=='') {
      if (isPresent) {
        this.apiUrl = this.apiUrl + '?by_type=' + type;
      } else {
        this.apiUrl = this.apiUrl + '&by_type=' + type;
      }
      isPresent = false;
    }
    if (city!=='') {
      if (isPresent) {
        this.apiUrl = this.apiUrl + '?by_city=' + city;
      } else {
        this.apiUrl = this.apiUrl + '&by_city=' + city;
      }
      isPresent = false
    }
    return from(
      fetch(this.apiUrl).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    );
  }

  getDataById(id: string): Promise<any>{
    this.apiUrl = 'https://api.openbrewerydb.org/v1/breweries'
    console.log(this.apiUrl+'/'+id)
    return fetch(this.apiUrl+'/'+id)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching brewery data:', error);
      throw error;
    });
  }
}
