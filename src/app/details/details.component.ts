import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserService, HttpClient],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  [x: string]: any;
  @ViewChild('loginButton') loginButton: any;
  userData: any;

  ngOnInit(): void {}
  applyForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private userService: UserService, private router: Router) { }

  submitApplication() {
    Swal.fire('Thank you for signing up', 'please login using your email and password', 'success');
    const emailValue: string = this.applyForm.get('email')?.value ?? 'default@example.com';
    const passwordValue: string = this.applyForm.get('password')?.value?? 'testpassword';
    const usernameValue: string = this.applyForm.get('username')?.value?? 'testusername';
    const info: boolean = this.userService.updateUser({
      email: emailValue,
      password: passwordValue,
      username: usernameValue,
      ratedIds: {}
    });
    console.log('updated sucessfully')
    this.applyForm.reset();
    if (info){
      this.loginButton.nativeElement.click();
    }
    else{
      Swal.fire('User Existing', 'Email or user name already existing', 'error');
    }
  }

  LoginAuth() {
    const emailValue: string = this.loginForm.get('email')?.value ?? 'default@example.com';
    const passwordValue: string = this.loginForm.get('password')?.value?? 'testpassword';
    this.loginForm.reset();

    if (this.userService.checkUser(emailValue, passwordValue)) {
      Swal.fire('Thank you', 'you have logged in successfully', 'success');
      console.log(' Login sucessfull')
      this.router.navigate(['/search']);
    }
    else{
      Swal.fire({
        title: 'Your email or password is incorrect',
        text: 'Please Try Again ',
        icon: 'warning',
      })
    }
  }
}
