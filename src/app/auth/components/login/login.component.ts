import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if('token' in localStorage){
      this.router.navigate(['dashboard'])
    }
      this.initLoginForm()
  }

  initLoginForm():void{
    this.loginForm = this.fb.group({
      email:['rayenn38@gmail.com' , [Validators.required , Validators.email] ],
      password:['rayen@570' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
      role:['admin']
    })
  }

  login() {

    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token' , res.token);
        this.toaster.success("Login Successfully", "Success");
        this.router.navigate(['products']);
      }
    );
  }

}
