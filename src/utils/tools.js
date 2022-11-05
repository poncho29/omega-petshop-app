export const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export const formatterPeso = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
})