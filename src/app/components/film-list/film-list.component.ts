import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film-list',
  imports: [RouterModule,CommonModule,],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {
  films: any[] = [];

  constructor (private swapiService: SwapiService) {}
  ngOnInit(): void {
    this.swapiService.getFilms().subscribe(data => {
      this.films = data.results.sort((a: { release_date: string }, b: { release_date: string }) => a.release_date.localeCompare(b.release_date));
    })
  }

}
