import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getCharacters } from '../actions/getCharacters';

@Injectable({
  providedIn: 'root'
})
export class CharactersServices {

  // Se encarga de obtener los personajes
  charactersQuery = injectQuery(() => ({
    queryKey: ['characters'],
    queryFn: () => getCharacters()
  }))
}
