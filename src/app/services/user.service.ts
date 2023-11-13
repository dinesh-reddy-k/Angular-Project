import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import * as userData from '../../assets/users.json';

interface userFormat {
  email: string;
  username: string;
  password: string;
  ratedIds: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  userInfo: userFormat[] = userData;
  private userDetails = this.userInfo.map(user => user)
  currentEmail: string = 'default@gmail.com'

  private loadJsonFile(): Observable<any> {
    try {
      const jsonData = require('../../assets/users.json');
      return of(jsonData);
    } catch (error) {
      console.error('Error loading JSON file:', error);
      return of(null);
    }
  }

  getUser(): any{
    return this.userDetails
  }

  currentUser(email: string): void {
    this.currentEmail = email
  }

  checkUser(email: string, password:string): boolean{
    const isUserPresent: boolean = this.userDetails.some(user => user.email === email && user.password ===password);
    return isUserPresent
  }

  updateUser(newData: any): boolean {
    console.log('done', newData);
    if (this.userDetails.some(user => user.email === newData.email && user.username===newData.username)){
      console.log('Email or user name already existing')
      return false
    }
    else {
      this.userDetails.push(newData);
      console.log('Data Updated Sucessfully')
      return true
    }
  }

  updateRating(id: string, rate: number): void{
    const userIndex = this.userDetails.findIndex(user => user.email === this.currentEmail)
    if (userIndex === -1){
      const rateIndex = this.userDetails[userIndex].ratedIds.findIndex((rating: { id: string; }) => rating.id === id)
      if (rateIndex === -1){
        this.userDetails[userIndex].ratedIds[rateIndex].rate = rate;
      }
      else{
        this.userDetails[userIndex].ratedIds.push({id, rate})
      }
    }
    console.log('Rating Updated', this.userDetails)
  }
}