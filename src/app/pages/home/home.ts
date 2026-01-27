import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, FormsModule, CommonModule, MatSliderModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  urlImageSaisie = '';
  valeurSlider = 50;

  categories = signal<Categorie[]>([]);

  indexCategorieDestination: number | null = null;
  indexImageDestination: number | null = null;

  http = inject(HttpClient);

  ngOnInit() {
    this.refreshCategories();
    // const categoriesSauvegardeesJson = localStorage.getItem('sauvegarde');
    // if (categoriesSauvegardeesJson) {
    //   this.categories = JSON.parse(categoriesSauvegardeesJson);
    // } else {
    //   this.categories = [
    //     { titre: 'A', images: [] },
    //     { titre: 'B', images: [] },
    //     { titre: 'C', images: [] },
    //     { titre: 'D', images: [] },
    //   ];
    // }
  }

  refreshCategories() {
    this.http.get<Categorie[]>('http://localhost:3000/categories').subscribe((data) => {
      this.categories.set(data);
    });
  }

  // sauvegarder() {
  //   localStorage.setItem('sauvegarde', JSON.stringify(this.categories));
  // }

  ajouterImage() {
    if (this.urlImageSaisie !== '') {
      this.http
        .post('http://localhost:3000/image', {
          url: this.urlImageSaisie,
        })
        .subscribe((response) => {
          this.refreshCategories();
        });

      //gestion par le localstorage (a supprimer)
      //this.categories[0].images.push(this.urlImageSaisie);
      this.urlImageSaisie = '';
      // this.sauvegarder();

      this.indexCategorieDestination = 0;
      //this.indexImageDestination = this.categories[0].images.length - 1;
    }
  }
  deplacementImage(indexCategorie: number, indexImage: number, monter: boolean = true) {
    //on recupere l'url de l'image a deplacer
    // const urlImageAdeplacer = this.categories[indexCategorie].images[indexImage];

    //on calcule l'index de la categorie de destination
    this.indexCategorieDestination = indexCategorie + (monter ? -1 : 1);

    //on copie l'image dans la categorie du dessous
    // this.categories[this.indexCategorieDestination].images.push(urlImageAdeplacer);

    //on met a jour l'index de l'image de destination
    // this.indexImageDestination = this.categories[this.indexCategorieDestination].images.length - 1;

    //on supprime l'image de la categorie actuelle
    // this.categories[indexCategorie].images.splice(indexImage, 1);
    // this.sauvegarder();
  }

  supprimerImage(indexCategorie: number, indexImage: number) {
    //on supprime l'image de la categorie actuelle
    // this.categories[indexCategorie].images.splice(indexImage, 1);
    // this.sauvegarder();
    this.indexCategorieDestination = null;
    this.indexImageDestination = null;
  }
}
