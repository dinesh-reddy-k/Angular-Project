import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  data: any[] | undefined;

  constructor(private apiService: ApiServiceService, private fb: FormBuilder, private router: Router) {}
  params: any;

  ngOnInit(): void {}
  isSearch: boolean = false;
  applyFilters(name: string, city: string, type: string): void {
    this.isSearch = true;
    console.warn('test',this.params)
    this.apiService.getData(name, city, type).subscribe(data => {
      this.data = data;
    this.isSearch = true;
    console.log('data', this.data)
    });
  }
  navigateToNextPage(id: string) {
    this.router.navigate(['/info', id]);
  }
}
