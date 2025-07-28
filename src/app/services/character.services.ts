// Se encarga de obtener los detalles de un personaje de la API
import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getCharacter } from '../actions/getCharacter';

@Injectable({
  providedIn: 'root'
})
export class CharacterServices {

  // Se encarga de obtener el id del personaje
  private characterId = signal<string| null>(null);

  // Se encarga de obtener el queryClient
  private queryClient = injectQueryClient();

  // Se encarga de establecer el id del personaje
  setCharacterId(characterId: string) {
    this.characterId.set(characterId);
  }

  // Se encarga de obtener los detalles del personaje
  charactersQuery = injectQuery(() => ({
    // Se encarga de obtener el id del personaje
    queryKey: ['characters', this.characterId()],
    // Se encarga de obtener los detalles del personaje
    queryFn: () => getCharacter(this.characterId()!),
    // Se encarga de verificar si el id del personaje existe
    enabled: !!this.characterId(),
    // Optimizaciones de cache
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos (antes cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: false
  }))

  // Se encarga de prefetchar el personaje
  prefetchCharacter(characterId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['characters', characterId],
      queryFn: () => getCharacter(characterId),
      staleTime: 1000 * 60 * 10, // 10 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos
    });
  }
}
