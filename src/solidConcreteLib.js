
export const MetodoCalculo = [
    { name: "Carmen Andrade", value: "CA" },
    { name: "Norma EHE-08", value: "EHE-08" },
    { name: "ACI-365", value: "ACI-365" },
]

export const TipoCemento = [
    { name: "Tipo A", q: { valor: 0.22, desviacion: 1.3 }, rcl: { valor: 1.9, desviacion: 1.3 } },
    { name: "Tipo B", q: { valor: 0.37, desviacion: 0.5 }, rcl: { valor: 1.5, desviacion: 0.5 } },
    { name: "Tipo C", q: { valor: 0.57, desviacion: 2.1 }, rcl: { valor: 3.0, desviacion: 2.1 } },
]
export const ExposicionPorClorurosParaFactorAmbiental = [
    { name: "XS1-a", fa: { valor: 5000, descripcion: "Lorem ipsum dolor sit amet" } },
    { name: "XS1-b", fa: { valor: 10000, descripcion: "Lorem ipsum dolor sit amet" } },
    { name: "XS2", fa: { valor: 17000, descripcion: "Lorem ipsum dolor sit amet" } },
    { name: "XS3", fa: { valor: 25000, descripcion: "Lorem ipsum dolor sit amet" } }
]

export const MetodoCalculoEHE = [
    "Hidratacion por carbonatacion",
    "Penetracion de cloruros",
    "Recubrimiento equivalente"
]

export const Kcorr = 26;
export const Pcorr = 0.01;
export const Ws = 1;

// TODO Docummnet function
export function CarmenAndradeTi(q, rcl, resistivity, cover, t, t0, fa) {
    return (Math.pow(cover, 2) * resistivity * Math.pow((t / t0), q) * rcl) / fa;
}

// TODO Docummnet function
export function CarmenAndradeTp(resistivity, t, t0, q) {
    return (Pcorr * resistivity * Math.pow((t / t0), q) * Ws) / (Kcorr * 0.00116);
}


