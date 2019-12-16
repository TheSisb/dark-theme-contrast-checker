const {hex, score} = require('wcag-contrast');

// console.log(score(hex('#fff', '#000')));

const GREYS = [
  '#f4f4f6',
  '#E1E3EA',
  '#cacdd8',
  '#aeb2c1',
  '#8891aa',
  '#606b85',
  '#4b5671',
  '#394762',
  '#1f304c',
  '#121c2d'
];

const Accents = {
  RED: [
    '#feecec',
    '#fccfcf',
    '#f6b1b1',
    '#f58a8a',
    '#eb5656',
    '#d61f1f',
    '#ad1111',
    '#750c0c',
    '#4a0b0b',
    '#310c0c'
  ],
  BLUE: [
    '#ebf4ff',
    '#cce4ff',
    '#99cdff',
    '#66b3ff',
    '#008cff',
    '#0263e0',
    '#043cb5',
    '#001489',
    '#030b5d',
    '#06033a'
  ]
};

const LIGHT_THEME = GREYS.slice(0, 5);
const DARK_THEME = GREYS.slice(5, 10);

function getPassesForTheme(theme) {
  /*
    Text 7:1 BG == AAA
    Text 4.5:1 BG == AA
    Other A 3:1 Other B == AA
    */
  const results = {
    HIGH: 0,
    MID: 0,
    LOW: 0,
    FAIL: 0
  };

  function resultUpdater(themeColor, color) {
    const ratio = hex(themeColor, color);
    // console.log(ratio, themeColor, color);
    if (ratio > 7) {
      results.HIGH = results.HIGH + 1;
    } else if (ratio > 4.5) {
      results.MID = results.MID + 1;
    } else if (ratio > 3) {
      results.LOW = results.LOW + 1;
    } else {
      results.FAIL = results.FAIL + 1;
    }
  }
  // console.log(theme);
  theme.forEach(themeColor => {
    Accents.RED.forEach(color => resultUpdater(themeColor, color));
    Accents.BLUE.forEach(color => resultUpdater(themeColor, color));
  });

  return results;
}

/*
[ '#f4f4f6', '#E1E3EA', '#cacdd8', '#aeb2c1', '#8891aa' ]
{ HIGH: 24, MID: 13, LOW: 9, FAIL: 54 }
[ '#606b85', '#4b5671', '#394762', '#1f304c', '#121c2d' ]
{ HIGH: 17, MID: 13, LOW: 17, FAIL: 53 }
*/

console.log(getPassesForTheme(LIGHT_THEME));
console.log(getPassesForTheme(DARK_THEME));
