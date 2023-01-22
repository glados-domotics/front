const INTL_OPTIONS = {
  notation: "compact",
  compactDisplay: "short",
  signDisplay: "never",
  roundingMode: "halfExpand",
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

export const ENTITY_PARAMS = {
  "air_conditioner": {
    numeric: true,
    unit: "°C",
    min: 14,
    max: 40,
    step: 0.1,
    format: (v) => new Intl.NumberFormat("fr-FR", INTL_OPTIONS).format(v) + "°C"
  },
  "sensor": {
    numeric: true,
    unit: "°C",
    min: 14,
    max: 40,
    step: 0.1,
    format: (v) => new Intl.NumberFormat("fr-FR", INTL_OPTIONS).format(v) + "°C"
  },
  "light": {
    numeric: true,
    // unit: "/255",
    unit: "",
    min: 0,
    max: 255,
    step: 1,
    format: (v) => v
  },
  "multimedia": {
    unit: "chaîne",
    numeric: false,
    format: (v) => v
  },
  "switch": {
    unit: "",
    numeric: false,
    format: (v) => v
  },
}

export function readText(device, status){
  return `The ${device} is ${status}.`
}

export const COLOR_GRADIENT = [
  "#"
]