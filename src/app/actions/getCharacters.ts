// Se encarga de obtener los personajes de la API

import { environment } from "../../environments/environment.development";
import { sleep } from "../helpers/sleep";
import { ICharacters } from "../interfaces/ICharacters";

const URL_CHARACTERS = environment.apiUrlCharacters;

// Se encarga de obtener los personajes de la API y simular un delay con sleep de 2 segundos
export const getCharacters = async (): Promise<ICharacters> => {

    await sleep(1500);

    try{
    const response = await fetch(URL_CHARACTERS);
    if (!response.ok) {
        throw new Error('Failed to fetch characters');
    }
    const data: ICharacters = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}



