import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "../../shared/components/header/header.component"; 
import { HeaderService } from '../../services/header.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent  {
 
 userName: string = '';

 isUnactive = false;

  constructor(private headerService: HeaderService) {}

   ngOnInit() {
      this.headerService.isUnactive$.subscribe(state => {
        this.isUnactive = state;
      });
      
      const userData = sessionStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.userName = user.name || user.email || 'User'; 
        
      }
  }

  

}
