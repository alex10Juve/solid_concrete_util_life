export const ExposicionPorClorurosParaFactorAmbiental = [
  {
    name: "XS1-a",
    fa: { value: 5000, description: "Lorem ipsum dolor sit amet" },
  },
  {
    name: "XS1-b",
    fa: { value: 10000, description: "Lorem ipsum dolor sit amet" },
  },
  {
    name: "XS2",
    fa: { value: 17000, description: "Lorem ipsum dolor sit amet" },
  },
  {
    name: "XS3",
    fa: { value: 25000, description: "Lorem ipsum dolor sit amet" },
  },
];

export const TipoCemento = [
  {
    name: "Tipo A",
    q: { value: 0.22, desviation: 1.3 },
    rcl: { value: 1.9, desviation: 1.3 },
  },
  {
    name: "Tipo B",
    q: { value: 0.37, desviation: 0.5 },
    rcl: { value: 1.5, desviation: 0.5 },
  },
  {
    name: "Tipo C",
    q: { value: 0.57, desviation: 2.1 },
    rcl: { value: 3.0, desviation: 2.1 },
  },
];

const Pcorr = 0.01;

const Kcorr = 26;

const Ws = 1;

//TODO document function
export function CalculateTp(resistivity, t, t0, q) {
  return (Pcorr * resistivity * Math.pow(t / t0, q) * Ws) / (Kcorr * 0.00116);
}

//TODO document function
export function CalculateTi(cover,resistivity,t,t0,q,rcl,fa){
  return (Math.pow(cover,2)*resistivity*Math.pow((t/t0),q)*rcl)/(fa);
}
