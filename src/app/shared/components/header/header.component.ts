import { Component } from '@angular/core';
import { HeaderService } from '../../../services/header.service';


@Component({
  selector: 'app-header',
   standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public headerService: HeaderService) {}

  toggleLink(event: Event) {
    event.preventDefault();
    this.headerService.toggle(); 
  }

  userName: string = '';
  userPhoto: string = 'assets/images/user.jpg';  

  ngOnInit() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.name || user.email || 'User'; 
      if (user.photo) {
        this.userPhoto = user.photo;  
      }
    }
  }

}
