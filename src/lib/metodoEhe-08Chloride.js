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

export function MetodoPenetracionClorurosTpEHE08(phi, d, vcorr) {
    return ((80 * d) / phi * vcorr);
}

export function MetodoPenetracionClorurosTiEHE08(cover,t,cb,cth,cs,dto){
    var kcl = 5615.7*(Math.sqrt((12*dto)*(Math.pow((0.0767/t,0.5)))))*(1-Math.sqrt((cth-cb)/(cs-cb)));
    return Math.pow((cover/kcl),2);
}

