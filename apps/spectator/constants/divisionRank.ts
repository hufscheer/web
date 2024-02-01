export const divisionMap = new Map();
const divisions = [
  {
    divisionId: 800,
    divisionName: '슈퍼챔피언스',
  },
  {
    divisionId: 900,
    divisionName: '챔피언스',
  },
  {
    divisionId: 1000,
    divisionName: '슈퍼챌린지',
  },
  {
    divisionId: 1100,
    divisionName: '챌린지1',
  },
  {
    divisionId: 1200,
    divisionName: '챌린지2',
  },
  {
    divisionId: 1300,
    divisionName: '챌린지3',
  },
  {
    divisionId: 2000,
    divisionName: '월드클래스1',
  },
  {
    divisionId: 2100,
    divisionName: '월드클래스2',
  },
  {
    divisionId: 2200,
    divisionName: '월드클래스3',
  },
  {
    divisionId: 2300,
    divisionName: '프로1',
  },
  {
    divisionId: 2400,
    divisionName: '프로2',
  },
  {
    divisionId: 2500,
    divisionName: '프로3',
  },
  {
    divisionId: 2600,
    divisionName: '세미프로1',
  },
  {
    divisionId: 2700,
    divisionName: '세미프로2',
  },
  {
    divisionId: 2800,
    divisionName: '세미프로3',
  },
  {
    divisionId: 2900,
    divisionName: '유망주1',
  },
  {
    divisionId: 3000,
    divisionName: '유망주2',
  },
  {
    divisionId: 3100,
    divisionName: '유망주3',
  },
];

divisions.map(division => {
  divisionMap.set(division.divisionId, division.divisionName);
});
