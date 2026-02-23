import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  readonly categories = signal<Categorie[]>([]);
  
  readonly nombreImages = computed(
    () => this.categories().reduce((acc, categorie) => acc + categorie.images.length, 0));

  http = inject(HttpClient);

  getAll() {
    return this.http
      .get<Categorie[]>(environment.urlServeur + '/categories')
      .pipe(tap((resultat) => this.categories.set(resultat)));
  }

  ajouterImage(url: string) {
    return this.http
      .post(environment.urlServeur + '/image', { url })
      .pipe(tap(() => this.getAll().subscribe()));
  }

  deplacerImage(indexCategorie: number, indexImage: number, monter: boolean = true) {
    const idCategorie = this.categories()[indexCategorie].id!;

    return this.http
      .patch(environment.urlServeur + '/image/' + idCategorie, { indexImage, monter })
      .pipe(tap(() => this.getAll().subscribe()));
  }

  supprimerImage(indexCategorie: number, indexImage: number) {
    const idCategorie = this.categories()[indexCategorie].id!;

    return this.http
      .delete(environment.urlServeur + '/image/' + idCategorie, { body: { indexImage } })
      .pipe(tap(() => this.getAll().subscribe()));
  }
}
