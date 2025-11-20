import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from './services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true, // Add this for clarity
  imports: [RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
})
export class App {
  title = 'HotelManagementApp';
  constructor( public authService: Auth, private router: Router ) {}

  ngOnInit () {
let isloggedin: string;
let loggedUser:string;
isloggedin = localStorage.getItem('isloggedIn') !;
loggedUser = localStorage.getItem('loggedUser') !;
if (isloggedin!="true" || !loggedUser)
this.router.navigate(['/login']);
else
this.authService.setLoggedUserFromLocalStorage(loggedUser);
}


  onLogout(){
    this.authService.logout();

}

}