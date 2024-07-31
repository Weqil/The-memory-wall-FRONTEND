import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService){}
  public authForm!: FormGroup


  clickTest() {
    this.authService.getUser().pipe().subscribe((res: any) => {
    })
  }
  login(){
    this.authService.authUser(this.authForm.value).pipe().subscribe({
      next: (res:any) => {
      },
      error: (err:any) => {
      }
     })
  
  }

  ngOnInit(): void {
    this.authForm =  new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
    })
  }
  
}
