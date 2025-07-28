import { Component, inject } from '@angular/core';
import { CharacterDatail } from '../../components/character-datail/character-datail';
import { CharactersServices } from '../../services/characters.services';

@Component({
  selector: 'app-characters',
  imports: [CharacterDatail],
  templateUrl: './characters.html',
  styleUrl: './characters.css'
})
export class CharactersComponent {

  charactersServices = inject(CharactersServices);

  get characters() {
    return this.charactersServices.charactersQuery;
  }

}
