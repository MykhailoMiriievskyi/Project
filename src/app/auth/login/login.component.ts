import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ValidateEmail } from "../../shared/validators/validate-email";
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsersService
  ) {
  }



  ngOnInit() {
    this.form = new FormGroup ({
    'email': new FormControl(null, [Validators.required, ValidateEmail]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
     
   
    });
    console.log(this.form);
    
  }
  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
       
        if (user) {
          if (user.password === formData.password) {
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            //this.router.navigate([''])
          }
          else {
            alert('Пароль не верный!')
          }
        }
        else {
          alert('Такого пользователя не существует!')
        }

      });
  }

}
