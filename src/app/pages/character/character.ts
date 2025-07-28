import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { CharacterServices } from '../../services/character.services';

@Component({
  selector: 'app-character',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './character.html',
  styleUrl: './character.css'
})
export class CharacterComponent {

  route = inject(ActivatedRoute);
  characterServices = inject(CharacterServices);

  characterId = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      tap((id) => this.characterServices.setCharacterId(id))
    )
  );

  characterQuery = this.characterServices.charactersQuery;

}
