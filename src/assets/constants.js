export const UNITS = {
  "air_conditioner": "°C",
  "sensor": "°C",
  "light": "/255",
  "multimedia": "chaîne",
  "switch": "",
}

export function readText(device, status){
  return `The ${device} is ${status}.`
}