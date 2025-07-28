// Se encarga de obtener los detalles de un personaje de la API

import { environment } from "../../environments/environment.development";
import { sleep } from "../helpers/sleep";
import { ICharacter } from "../interfaces/ICharacter";

const URL_CHARACTERS = environment.apiUrlCharacter;

// Se encarga de obtener los detalles de un personaje de la API y simular un delay con sleep de 2 segundos
export const getCharacter = async (id: string): Promise<ICharacter> => {

    await sleep(1500);

    try{
    const response = await fetch(`${URL_CHARACTERS}${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch character');
    }
    const data: ICharacter = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
}