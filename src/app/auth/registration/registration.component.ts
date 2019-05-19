import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private userService: UsersService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.userService.createNewUsers(user)
      .subscribe((user: User) => {
        this.router.navigate(['/login']);
        alert('Теперь Вы можете войти!')
      });
  }

  forbiddenEmails(control: FormControl): Observable<any> {
    return this.userService.getUserByEmail(control.value)
      .pipe(
        map((user: User) => user ? {forbiddenEmail: true} : null)
      )
  }

}
