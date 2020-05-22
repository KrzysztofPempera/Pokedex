import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokedex, Types } from '../pokemon.models';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  pokedex: Pokedex;
  types: Types;
  query = '?offset=0&limit=40';
  newQuery: string;
  pokemonId = 1;
  pageNumber = 1;
  pageChange = [-1,1];

  public isCollapsed = true;

  constructor(private pokeService: PokedexService) { }

  ngOnInit(): void {
    this.getPokedex(this.query);
    this.getTypes();
  }

  nextPage() {
    this.newQuery = this.pokedex.next.slice(33);
    this.getPokedex(this.newQuery, this.pageChange[1]);
  }
  previousPage() {
    this.newQuery = this.pokedex.previous.slice(33);
    this.getPokedex(this.newQuery, this.pageChange[0]);
  }

  getTypes() {
    this.pokeService.getTypes().subscribe(data =>{
      this.types = data;
      this.types.results.pop();
      this.types.results.pop();
    });
  }

  getPokedex(query: string, pageChange?: number) {
    this.pokeService.getPokedex(query).subscribe(data =>{
      this.pokedex = data;
      if (pageChange){
        this.pageNumber += pageChange;
      }
    });
  }
}
