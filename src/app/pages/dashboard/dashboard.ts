import { Component, inject } from '@angular/core';
import { CategorieService } from '../../services/categorie';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  categorieServices = inject(CategorieService);

}
