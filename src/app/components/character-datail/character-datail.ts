import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Result } from '../../interfaces/ICharacters';
import { CharacterServices } from '../../services/character.services';

@Component({
  selector: 'app-character-datail',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './character-datail.html',
  styleUrl: './character-datail.css'
})
export class CharacterDatail implements OnInit {

  characters = input.required<Result[]>();
  characterServices = inject(CharacterServices);

  // Signals para funcionalidades
  searchTerm = signal<string>('');
  favorites = signal<Set<string>>(new Set());

  // Computed signal para Pokémon filtrados
  filteredCharacters = computed(() => {
    const term = this.searchTerm();
    const allCharacters = this.characters();
    
    if (!term) {
      return allCharacters;
    } else {
      return allCharacters.filter(char => 
        char.name.toLowerCase().includes(term) ||
        this.getPokemonId(char).includes(term)
      );
    }
  });

  prefetchData(item: Result) {
    // Extraer el ID del Pokémon de la URL
    const urlParts = item.url.split('/');
    const pokemonId = urlParts[urlParts.length - 2]; // El ID está antes del último slash
    this.characterServices.prefetchCharacter(pokemonId);
  }

  getPokemonImage(item: Result): string {
    const urlParts = item.url.split('/');
    const pokemonId = urlParts[urlParts.length - 2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  getPokemonId(item: Result): string {
    const urlParts = item.url.split('/');
    return urlParts[urlParts.length - 2];
  }

  // Función de búsqueda
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value.toLowerCase());
  }

  // Funcionalidad de favoritos
  toggleFavorite(item: Result) {
    const currentFavorites = this.favorites();
    const pokemonId = this.getPokemonId(item);
    
    if (currentFavorites.has(pokemonId)) {
      currentFavorites.delete(pokemonId);
    } else {
      currentFavorites.add(pokemonId);
    }
    
    this.favorites.set(new Set(currentFavorites));
    
    // Guardar en localStorage
    localStorage.setItem('pokemon-favorites', JSON.stringify(Array.from(currentFavorites)));
  }

  isFavorite(item: Result): boolean {
    const pokemonId = this.getPokemonId(item);
    return this.favorites().has(pokemonId);
  }

  // Cargar favoritos desde localStorage
  ngOnInit() {
    const savedFavorites = localStorage.getItem('pokemon-favorites');
    if (savedFavorites) {
      this.favorites.set(new Set(JSON.parse(savedFavorites)));
    }
  }
}
