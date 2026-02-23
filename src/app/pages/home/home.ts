import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification';
import { CategorieService } from '../../services/categorie';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, FormsModule, CommonModule, MatSliderModule, MatSnackBarModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  urlImageSaisie = '';
  valeurSlider = 50;

  indexCategorieDestination: number | null = null;
  indexImageDestination: number | null = null;

  categorieService = inject(CategorieService);
  notification = inject(NotificationService);

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
    this.categorieService.getAll().subscribe();

    //quand c'est fini je veux afficher une notification
  }

  // sauvegarder() {
  //   localStorage.setItem('sauvegarde', JSON.stringify(this.categories));
  // }

  ajouterImage() {
    if (this.urlImageSaisie !== '') {
      this.categorieService.ajouterImage(this.urlImageSaisie).subscribe({
        next: (response) => {
          this.notification.valid("L'image a bien été ajoutée");
        },
        error: (erreur) => {

          if(erreur.status === 400) {
            this.notification.error("L'url est invalide");
            return;
          } else if(erreur.status === 409) {
            this.notification.warning("Cette image existe déjà");
          } else {
            this.notification.error("Impossible d'ajouter l'image");
          }
        },
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

    this.categorieService.deplacerImage(indexCategorie, indexImage, monter).subscribe({
      next: (response) => {
        this.notification.valid("l'image a bien été déplacée");
      },
      error: (erreur) => {
        this.notification.error("impossible de déplacer l'image");
      },
    });

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

    this.categorieService
      .supprimerImage(indexCategorie, indexImage)
      .subscribe({
        next: (response) => {
          this.notification.valid("l'image a bien été supprimée");
        },
        error: (erreur) => {
          this.notification.error("impossible de supprimer l'image");
        },
      });

    this.indexCategorieDestination = null;
    this.indexImageDestination = null;
  }
}
