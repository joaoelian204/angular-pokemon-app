// Se encarga de simular un delay en la respuesta de la API
export const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}