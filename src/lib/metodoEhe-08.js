export const Cenv = [
  { type: "Protegido de la lluvia", value: 1 },
  { type: "Expuesto a la lluvia", value: 0.5 },
];

export const Cair = [
  { type: "< 4.5%", value: 1 },
  { type: ">= 4.5%", value: 0.7 },
];

export const Coeffs = [
  { typeCement: "Cemento Portland", a: 1.8, b: -1.7 },
  { typeCement: "Cemento Portland + 28% cenizas volantes", a: 360, b: -1.2 },
  { typeCement: "Cemento Portland + 9% humo de silice", a: 400, b: -1.2 },
  { typeCement: "Cemento Portland + 65% escorias", a: 360, b: -1.2 },
];

export const Vcorr = [
  { expositionClass: "Normal-humedad alta", nomeclature: "IIa", value: 3 },
  { expositionClass: "Normal-humedad media", nomeclature: "IIb", value: 2 },
  { expositionClass: "Marina-aerea", nomeclature: "IIIa", value: 20 },
  { expositionClass: "Marina-sumergida", nomeclature: "IIIb", value: 4 },
  { expositionClass: "Marina-zonas de marea", nomeclature: "IIIc", value: 50 },
  {
    expositionClass: "Cloruros de orgines diferentes",
    nomeclature: "IV",
    value: 20,
  },
];

export function MetodoCarbonatacionTpEHE08(phi, d, vcorr) {
  return ((80 * d) / phi) * vcorr;
}

export function MetodoCarbonatacionTiEHE08(camb, cair, a, b, fck, d) {
  var kc = camb * cair * a * Math.pow(fck + 8, b);
  return Math.pow(d / kc, 2);
}
