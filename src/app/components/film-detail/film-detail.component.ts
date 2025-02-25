import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-film-detail',
  imports: [CommonModule],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.css'
})
export class FilmDetailComponent {
  film:any;
  personajes:any[] = [];
  planetas: any[] =[];
  naves :any[] = [];

  constructor(private route:ActivatedRoute, private swapiService : SwapiService) {}
    
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0',10);
    console.log("ID recibido desde la URL: ", id);
    if(id){
      this.swapiService.getFilm(+id).subscribe(data => {
        console.log("Pelicula obtenida", data);
        this.film = data;

        forkJoin([ 
          ...this.swapiService.getEntities(data.characters),
          ...this.swapiService.getEntities(data.planets),
          ...this.swapiService.getEntities(data.starships)
        ]).subscribe(results => {
          this.personajes = results.slice(0, data.characters.length).sort((a,b) => a.name.localeCompare(b.name));
          this.planetas = results.slice(data.characters.length, data.characters.length + data.planets.length).sort((a, b) => a.name.localeCompare(b.name));
          this.naves = results.slice(data.characters.length + data.planets.length).sort((a, b) => a.name.localeCompare(b.name));
        });
      });
    }
  }

}
