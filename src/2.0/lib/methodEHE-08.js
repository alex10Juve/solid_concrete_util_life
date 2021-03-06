// START Equivalent cover
const SpeedCarbonationTable = [
  { value: "<= 2,0", lambda: 0.5 },
  { value: "<= 1,0", lambda: 1.0 },
  { value: "<= 0,7", lambda: 1.5 },
  { value: "<= 0,5", lambda: 2.0 },
];

const GeneralexpositionClass = [
  { value: "Normal humedad alta" },
  { value: "Normal humedad media" },
  { value: "Marina Aera" },
];

const SpeedChloridePenetration = [
  { value: "<= 3,4", lambda: 0.5 },
  { value: "<= 1,7", lambda: 1.0 },
  { value: "<= 1,1", lambda: 1.5 },
  { value: "<= 0,9", lambda: 2.0 },
];

const Capilarity = [
  { value: "<= 0,40", lambda: 0.5 },
  { value: "<= 0,20", lambda: 1.0 },
  { value: "<= 0,15", lambda: 1.5 },
  { value: "<= 0,10", lambda: 2.0 },
];
//END Equivalent cover

//START carbonatation
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
  
  // TODO documment function
  export function MetodoCarbonatacionTpEHE08(phi, d, vcorr) {
    return ((80 * d) / phi) * vcorr;
  }
  
  // TODO documment function
  export function MetodoCarbonatacionTiEHE08(camb, cair, a, b, fck, d) {
    var kc = camb * cair * a * Math.pow(fck + 8, b);
    return Math.pow(d / kc, 2);
  }
  //END carbonatation

  //Start chloride penetration
  export const TypeCementEHE08Chloride = [
    { typeCement: "Cemento Portland", ac40: 8.9, ac45: 10, ac50: 15.8, ac55: 19.7, ac60: 25 },
    { typeCement: "Cemento Portland + 28% cenizas volantes", ac40: 5.6, ac45: 6.9, ac50: 9.0, ac55: 10.9, ac60: 14.9 },
    { typeCement: "Cemento Portland + 65% escorias", ac40: 1.4, ac45: 1.9, ac50: 2.8, ac55: 3.0, ac60: 3.4 },
]

export const GeneralExpositionClass = [
    { type: "Marina area (d < 500m)", value: 0.14 },
    { type: "Marina area (500m < d < 5000m)", value: 0.07 },
    { type: "Marina sumergida ", value: 0.72 },
    { type: "Marina en zonas de marea ", value: 0.50 },
    { type: "Con cloruros de origen diferente al medio marino", value: 0.50 }
]

export const Cth = [
    { description: "Para estructuras de hormigon armado", value: 0.6 },
    { description: "Para estructuras de hormigon pretensado", value: 0.3 },
]

export const Ac = [
    "a/c = 0.40",
    "a/c = 0.45",
    "a/c = 0.50",
    "a/c = 0.55",
    "a/c = 0.60",
]
// TODO documment function
export function MetodoPenetracionClorurosTpEHE08(phi, d, vcorr) {
    return ((80 * d) / phi * vcorr);
}
// TODO documment function
export function MetodoPenetracionClorurosTiEHE08(cover,t,cb,cth,cs,dto){
    var kcl = 5615.7*(Math.sqrt((12*dto)*(Math.pow((0.0767/t,0.5)))))*(1-Math.sqrt((cth-cb)/(cs-cb)));
    return Math.pow((cover/kcl),2);
}
// END chloride penetration