const TABLE_ERF = [
  { z: 0, erf: 0 },
  { z: 0.025, erf: 0.0282 },
  { z: 0.05, erf: 0.0564 },
  { z: 0.1, erf: 0.1125 },
  { z: 0.15, erf: 0.168 },
  { z: 0.2, erf: 0.2227 },
  { z: 0.25, erf: 0.2763 },
  { z: 0.3, erf: 0.3286 },
  { z: 0.35, erf: 0.3794 },
  { z: 0.4, erf: 0.4284 },
  { z: 0.45, erf: 0.4755 },
  { z: 0.5, erf: 0.5205 },
  { z: 0.55, erf: 0.5633 },
  { z: 0.6, erf: 0.6039 },
  { z: 0.65, erf: 0.642 },
  { z: 0.7, erf: 0.6778 },
  { z: 0.75, erf: 0.7112 },
  { z: 0.8, erf: 0.7421 },
  { z: 0.85, erf: 0.7707 },
  { z: 0.9, erf: 0.797 },
  { z: 0.95, erf: 0.8209 },
  { z: 1.0, erf: 0.8427 },
  { z: 1.1, erf: 0.8802 },
  { z: 1.2, erf: 0.9103 },
  { z: 1.3, erf: 0.934 },
  { z: 1.4, erf: 0.9523 },
  { z: 1.5, erf: 0.9661 },
  { z: 1.6, erf: 0.9763 },
  { z: 1.7, erf: 0.9838 },
  { z: 1.8, erf: 0.9891 },
  { z: 1.9, erf: 0.9928 },
  { z: 2.0, erf: 0.9953 },
  { z: 2.2, erf: 0.9981 },
  { z: 2.4, erf: 0.9993 },
  { z: 2.6, erf: 0.9998 },
  { z: 2.8, erf: 0.9999 },
];

export const SearchValue = (val) => {
  let bestDiference = 100000;
  let bestIndex = 0;
  for (let index = 0; index < TABLE_ERF.length; index++) {
    const element = Math.abs(TABLE_ERF[index].erf - val);
    if (element < bestDiference) {
      bestDiference = element;
      bestIndex = index;
    }
  }
  return TABLE_ERF[bestIndex].z;
};

export const CalculateD28 = (ac) => {
  return Math.pow(10, -11) * 12.5 * ac - 3 * Math.pow(10, -11);
};

export const CalculateTi = (d28, z, cover) => {
  return (
    Math.pow(cover, 4) /
    (16 * Math.pow(z, 4) * Math.pow(d28, 2) * 0.0767 * 31536000)
  );
};

export const CalcuateTp = 6;

export const CalculateTt = (d28,z,cover) => {
    return CalculateTi(d28,z,cover) + CalcuateTp;
}
