export function htmlToPlain(html) {

  const tempDivElement = document.createElement('div')

  tempDivElement.innerHTML = html

  // return tempDivElement.textContent || tempDivElement.innerText || ''
  return tempDivElement.innerText.replace(/\.([A-ZА-Я])/g, (match) => '. ' + match.slice(1)) || ''
}
