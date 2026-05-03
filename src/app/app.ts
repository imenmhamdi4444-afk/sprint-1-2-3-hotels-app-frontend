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

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }



  onLogout(){
    this.authService.logout();

}

}