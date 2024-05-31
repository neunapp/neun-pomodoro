const listaFracesDevelopers = [
  'El software es como el sexo: es mejor cuando es gratis.',
  'La mejor forma de predecir el futuro es implementarlo.',
  'La tecnología sin ética es como un cuchillo en manos de un asesino.',
  'En la programación, como en la vida, a menudo los pequeños detalles hacen la gran diferencia.',
  'El software es como la entropía: difícil de atrapar, difícil de entender, fácil de perder.',
  'La calidad es más importante que la cantidad. Un home run es mucho mejor que dos dobles.',
  'El software está limitado solo por la imaginación de quienes lo construyen.',
  'La simplicidad es la máxima sofisticación.',
  'El software bien diseñado es como una poesía, cada línea tiene un propósito y una belleza intrínseca.',
  'La verdadera sabiduría está en reconocer la propia ignorancia.',
  'No hay viento favorable para el marinero que no sabe a qué puerto se dirige.',
  'La mente es como un paracaídas; solo funciona cuando está abierta.',
  'El software es como el sexo: es mejor cuando es gratis.',
]

export const getFrase = () => {
  const randomIndex = Math.floor(Math.random() * listaFracesDevelopers.length)
  return listaFracesDevelopers[randomIndex]
}