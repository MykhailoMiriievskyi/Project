import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { map, tap } from "rxjs/operators";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<User[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(
        tap((users: User[]) => console.log(users)),
        map((users: User[]) => users[0]),
        tap((user: User) => console.log(user))
      );
  }

  createNewUsers(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:3000/users", user);
  }
}
