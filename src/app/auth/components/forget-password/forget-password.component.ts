import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements  OnInit {
  email!: string
  passwordForm!: FormGroup
  userId!: any
  token!: any
  showCreatePassword: boolean = false

  constructor(
     private authService: AuthService,
     private toastr: ToastrService,
     private activeRouter: ActivatedRoute,
     private fb: FormBuilder,
     private router: Router
  ) {
    this.userId = this.activeRouter.snapshot.paramMap.get('userId');
    this.token = this.activeRouter.snapshot.paramMap.get('token');
   }

   ngOnInit(): void {
     if(this.userId && this.token){
       this.showCreatePassword = !this.showCreatePassword
      }
      this.initializeForm()
   }

  getCurrentUrl(): string {
    return window.location.href;
  }

  sendEmail(){
    this.authService.forgetPassword(this.email, this.getCurrentUrl()).subscribe((res: any) =>{
      this.toastr.success(res['message']);
    })
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  saveNewPassword(){
    const formData = this.passwordForm.value;
    if (formData.password !== formData.passwordConfirm) {
        this.toastr.error("Passwords do not match");
        return;
    }

    const data ={
      userId: this.userId,
      token: this.token,
    }
    const password = formData.password

    this.authService.resetPassword(data, password).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.router.navigate(['/login'])
    })
  }
}
