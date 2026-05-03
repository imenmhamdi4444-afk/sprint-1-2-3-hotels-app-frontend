import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
    imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  user = new User();
  erreur: number = 0;
  message: string = "login ou mot de passe erronés..";

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLoggedin(): void {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/hotels']);
      },
      error: (err: any) => {
        this.erreur = 1;
        if (err.error && err.error.errorCause === 'disabled') {
          this.message = "Utilisateur désactivé, Veuillez confirmer votre email !";
        }
      }
    });
  }



}