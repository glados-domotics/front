const makeSpeechText = (entities) => {
  const intro = "Bonjour, voici les objets connectés que j'ai trouvé dans votre maison : "

  const mainSpeech = entities.map(entity => {
    return `L'objet ${entity.name} est dans l'état ${entity.status}`
  }).join(". ")

  const outro = "Merci de votre attention, à bientôt !"

  return intro + mainSpeech + outro
}

export default makeSpeechText