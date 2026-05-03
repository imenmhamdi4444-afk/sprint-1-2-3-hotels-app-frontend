import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verif-email.html',
  styleUrl: './verif-email.css',
})
export class VerifEmailComponent implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';

  constructor(
    private route: ActivatedRoute,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.registredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Validation réussie ! Vous pouvez maintenant vous connecter.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        if (err.status === 400) {
           if (err.error.errorCode === "INVALID_TOKEN")
             this.err = "Code invalide !";
           else if (err.error.errorCode === "EXPIRED_TOKEN")
             this.err = "Code expiré !";
           else
             this.err = err.error.message;
        }
        console.log(err);
      },
    });
  }
}
