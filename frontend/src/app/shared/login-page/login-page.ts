import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Inputg } from "../components/inputg/inputg";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  imports: [NgOptimizedImage, Inputg, ReactiveFormsModule ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export default class LoginPage {
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(event?: Event) {
   if (this.loginForm.invalid) {
    console.log('Form is invalid');
    return;
  }

  const { username, password } = this.loginForm.value;

  console.log(username, password);
  }

  
}

