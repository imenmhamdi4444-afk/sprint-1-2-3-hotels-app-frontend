import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err: any;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private authService: Auth, 
              private router: Router/*,
              private toastr: ToastrService*/) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    if (this.myForm.invalid) return;
    this.loading = true;

    const userToRegister = {
      username: this.myForm.value.username,
      email: this.myForm.value.email,
      password: this.myForm.value.password
    };

    this.authService.registerUser(userToRegister as any).subscribe({
      next: (res) => {
        this.loading = false;
        alert("Inscription réussie ! Veuillez confirmer votre email.");
        this.router.navigate(["/verifEmail"]);
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 400) {
          this.err = err.error.message || "Email déjà existant !";
        } else {
          this.err = "Une erreur est survenue. Veuillez réessayer.";
        }
      }
    });
  }
}
