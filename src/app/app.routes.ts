import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/characters/characters').then(m => m.CharactersComponent)
    },
    {
        path: 'character/:id',
        loadComponent: () => import('./pages/character/character').then(m => m.CharacterComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
