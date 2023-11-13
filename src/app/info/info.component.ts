import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dataService: ApiServiceService, private userService: UserService) {}

  items: { [key: string]: any } = {};
  keys: any;
  stars: any[] = [1,2,3,4,5];
  IdRate: any;
  id: any;
  
  ngOnInit() {
    this.IdRate = 'No Rating';
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.dataService.getDataById(this.id).then((data: any) => {
        this.keys = Object.keys(data).filter(key => data[key] !== null);
        this.items = data;
      });
    });
  }
  rated(event: any): void {
    this.IdRate = event.target.value
    this.userService.updateRating(this.id,this.IdRate)
  }

}
