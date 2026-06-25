
/**
 * Converte um valor monetário em reais (R$) para centavos.
 * @param {string} amount O valor monetário em reais (ex: "R$ 10,50").
 * @returns O valor em centavos (ex: 1050).
 * 
 * @example
 * const priceInCents = convertRealtoCents("R$ 10,50");
 * console.log(priceInCents); // 1050
 */



export function convertRealtoCents(amount: string){
    const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    const priceInCents = Math.round(numericPrice * 100);
    return priceInCents;

}