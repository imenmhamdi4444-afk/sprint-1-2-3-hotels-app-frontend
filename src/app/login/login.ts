import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
    imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  user = new User();
  erreur: number = 0;

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLoggedin(): void {
    console.log('[Login] attempting sign-in with user:', this.user);
    const isValidUser: Boolean = this.authService.SignIn(this.user);
    console.log('[Login] sign-in result:', isValidUser);
    
    if (isValidUser) {
      console.log('[Login] navigation to home');
      this.erreur = 0; // clear error on success
      this.router.navigate(['/hotels']);
    } else {
      console.log('[Login] invalid credentials');
      this.erreur = 1; // show error message
    }
  }


}