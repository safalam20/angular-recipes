import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  isLoggedIn : boolean=this.authService.isLoggedIn();

  constructor(private authService : AuthService, private router : Router) { }

 

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('').then(() => {
    window.location.reload();
    })
    }

}
