function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function $on(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

function create(type) {
  let elm = document.createElement(type);
  return elm;
}

function updateHLJS() {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}

var converter = new showdown.Converter({ tables: true });

function cordsToID(row, col) {
  return '' + String.fromCharCode(row + 64) + +col;
}

function IDToCords(ID) {
  return { col: ID.charCodeAt(0) - 64, row: +ID.slice(1) };
}

function fill(value, num) {
  // let temp = new Array(num);
  // for (let i = 0; i < num; i++) {
  //   temp[i] = value;
  // }
  // return temp;
  // console.log(value);
  return Array.from({ length: num }, (x) => (x = { content: '' }));
}

function textAreaAdjust(element) {
  element.style.height = '1px';
  element.style.height = element.scrollHeight + 'px';
}
function textAreaAdjustReset(element) {
  element.style.height = '1px';
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
getNextTrChild = function (node) {
  return node?.parentNode?.nextSibling?.childNodes[0] ?? node;
};

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

function rowIndexAsAlphabet(index) {
  return String.fromCharCode(index + 64 + 1);
}

document.addEventListener(
  'mousemove',
  function (ev) {
    qs('#hoverHolder').style.transform =
      'translateY(' + (ev.clientY + 15) + 'px)';
    qs('#hoverHolder').style.transform +=
      'translateX(' + (ev.clientX + 10) + 'px)';
  },
  false
);

async function GoogleAPIToRawTable(url) {
  let rawTable = [];
  await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      let rows = json.feed.entry;

      rows.forEach((row, i) => {
        let cells = [];
        data = Object.keys(row)
          .filter((column) => column.startsWith('gsx$'))
          .map((column) => column.slice(4))
          .forEach((x) => {
            const cell = {
              content: row['gsx$' + x].$t,
            };
            cells.push(cell);
          });
        rw = {
          cells: cells,
        };
        rawTable.push(rw);
        // console.log(rw);
      });
      console.log(rawTable);

      // console.log(rows);
    });

  return rawTable;
}

// $on(
//   qs('#table'),
//   'mousedown',
//   (e) => {
//     e = e || window.event;
//     pauseEvent(e);
//     console.log('down');
//     var td = e.target;
//     while (td !== this && !td.matches('td')) {
//       td = td.parentNode;
//     }
//     if (td === this) return;
//     console.log(td);
//   },
//   false
// );
// $on(
//   qs('#table'),
//   'mouseup',
//   (e) => {
//     e = e || window.event;
//     pauseEvent(e);
//     console.log('up');
//     var td = e.target;
//     while (td !== this && !td.matches('td')) {
//       td = td.parentNode;
//     }
//     if (td === this) return;
//     console.log(td);
//   },
//   false
// );

let blankTable = [
  {
    cells: [
      { content: ' ', node: {} },
      { content: 'A', node: {} },
      { content: 'B', node: {} },
      { content: 'C', node: {} },
      { content: 'D', node: {} },
      { content: 'E', node: {} },
      { content: 'F', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '1', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '2', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '3', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '4', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '5', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '6', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '7', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
];

let rawDataFromGoogle = [
  {
    cells: [
      { content: ' ', node: {} },
      { content: 'A', node: {} },
      { content: 'B', node: {} },
      { content: 'C', node: {} },
      { content: 'D', node: {} },
      { content: 'E', node: {} },
      { content: 'F', node: {} },
      { content: 'G', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '1', node: {} },
      { content: '#####Category', node: {} },
      { content: '#####Function', node: {} },
      { content: '#####Arguments', node: {} },
      { content: '#####Description', node: {} },
      { content: '#####Returns', node: {} },
      { content: '#####Else', node: {} },
      { content: '#####Inplace', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '2', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`push`', node: {} },
      { content: '...items', node: {} },
      { content: 'adds `items` to end', node: {} },
      { content: 'new `length`', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    doc: '#push',
    node: {},
  },
  {
    cells: [
      { content: '3', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`pop`', node: {} },
      { content: ' ', node: {} },
      { content: 'extracts an `item` from end', node: {} },
      { content: 'extracted `item` from _end_', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '4', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`shift`', node: {}, hover: 'aaaa' },
      { content: ' ', node: {} },
      { content: 'extracts an `item` from beginning', node: {} },
      { content: 'extracted `item` from _start_', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '5', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`unshift`', node: {}, hover: '`unshift`' },
      { content: '...items', node: {} },
      { content: 'adds `items` to beginning', node: {} },
      { content: '`new array` with _added_ items', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '6', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`splice`', node: {}, hover: '`splice`' },
      { content: 'pos, deleteCount, ...items', node: {} },
      {
        content:
          'at index `pos` deletes `deleteCount` elements and inserts `items`',
        node: {},
      },
      { content: '`new array` with _deleted_ items', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '7', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`slice`', node: {}, hover: '`slice`sdsds' },
      { content: 'start, end', node: {} },
      {
        content:
          'creates new array, copies elements from index `start` till `end ` (not inclusive) into it',
        node: {},
      },
      { content: '`new array` with _extracted_ items', node: {} },
      { content: ' ', node: {} },
      { content: '  ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '8', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`concat`', node: {}, hover: '`concat`33333333333' },
      { content: '...items', node: {} },
      {
        content:
          'creates new array, copies current and adds `items` (if array then elements)',
        node: {},
      },
      { content: '`new array` with _combined_ items', node: {} },
      { content: ' ', node: {} },
      { content: 'yes', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '9', node: {} },
      { content: 'search', node: {} },
      { content: '`indexOf`', node: {}, hover: '`indexOf`123114' },
      { content: 'item, pos', node: {} },
      { content: 'look for `item` starting from `pos`', node: {} },
      { content: '`index`', node: {} },
      { content: '`-1`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '10', node: {} },
      { content: 'search', node: {} },
      { content: '`includes`', node: {}, hover: '`includes`232323232' },
      { content: 'value, pos to begin search', node: {} },
      { content: 'boolean result if `value` in array', node: {} },
      { content: '`true` (===)', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '11', node: {} },
      { content: 'search', node: {} },
      { content: '`find`', node: {}, hover: '`find`dfdfd' },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'filter elements through the function, return **first** values that make it return true.',
        node: {},
      },
      { content: '_searched_ `item`', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '12', node: {} },
      { content: 'search', node: {}, hover: 'SEARCH' },
      { content: '`filter`', node: {}, hover: '`filter`' },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'filter elements through the function, return **all** values that make it return true.',
        node: {},
      },
      { content: '`new array` with _searched_ `items` ', node: {} },
      { content: '`[]`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '13', node: {} },
      { content: 'search', node: {}, hover: '11111' },
      {
        content: '`findIndex`',
        node: {},
        hover:
          '```js\nconst array1 = [5, 12, 8, 130, 44];\n\nconst isLargeNumber = (element) => element > 13;\n\nconsole.log(array1.findIndex(isLargeNumber));\n// expected output: 3\n```',
      },
      { content: 'func', node: {} },
      {
        content: 'is like find, but returns the index instead of a value.',
        node: {},
      },
      { content: '`index` of _found_ `item`', node: {} },
      { content: '`-1`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '14', node: {} },
      { content: 'iterate', node: {}, hover: 'ITERATE' },
      {
        content: '`forEach`',
        node: {},
        hover:
          '```js\nconst array1 = [\'a\', \'b\', \'c\'];\n\narray1.forEach(element => console.log(element));\n\n// expected output: "a"\n// expected output: "b"\n// expected output: "c"\n```',
      },
      { content: 'func(item, index, array)', node: {} },
      { content: 'calls func for every element,', node: {} },
      { content: '`undefined`', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '15', node: {} },
      { content: 'transform', node: {} },
      { content: '`map`', node: {}, hover: '`map`defsdfsdf' },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'creates a new array from results of calling func for every element.',
        node: {},
      },
      { content: '`new array` with _transformed_ `items`', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '16', node: {} },
      { content: 'transform', node: {}, hover: 'transform' },
      { content: '`sort`', node: {}, hover: '212121' },
      { content: 'func(a, b)', node: {} },
      { content: 'sorts the array in-place', node: {} },
      { content: '`array` reference, _sorted_', node: {} },
      { content: ' ', node: {} },
      { content: 'yes', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '17', node: {} },
      { content: 'transform', node: {}, hover: 'transform' },
      { content: '`reverse`', node: {}, hover: '`reverse`' },
      { content: ' ', node: {} },
      { content: 'reverses the array in-place', node: {} },
      { content: '`array` reference, _reversed_', node: {} },
      { content: ' ', node: {} },
      { content: 'yes', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '18', node: {} },
      { content: 'transform', node: {} },
      { content: '`split`', node: {}, hover: '`split`eeeeeeeeeeeeee' },
      { content: 'delimiter, limit on arr length', node: {} },
      { content: 'converts a string to array', node: {} },
      { content: '`new array` of _split_ strings ', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '19', node: {} },
      { content: 'transform', node: {} },
      { content: '`join`', node: {}, hover: '`join`sss' },
      { content: 'delimiter, limit on arr length', node: {} },
      { content: 'converts an array to string', node: {} },
      { content: '`string` of _joined_ arrays', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '20', node: {} },
      { content: 'transform', node: {}, hover: 'transform' },
      { content: '`reduce`', node: {}, hover: '`reduce`' },
      { content: 'func(accumulator, item, index, array), initial', node: {} },
      {
        content:
          'calculate a value by calling `func` on `items` and passing `accumulator` between the calls',
        node: {},
      },
      { content: 'result from reduction (single val)', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '21', node: {} },
      { content: 'check', node: {}, hover: 'check' },
      {
        content: '`Array.isArray`',
        node: {},
        hover:
          "```js\nArray.isArray([1, 2, 3]);  // true\nArray.isArray({foo: 123}); // false\nArray.isArray('foobar');   // false\nArray.isArray(undefined);  // false\n```",
      },
      { content: 'array', node: {} },
      { content: 'checks array for being an Array.', node: {} },
      { content: '`true` (===)', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '22', node: {} },
      { content: 'check', node: {}, hover: 'check' },
      { content: '`some`', node: {}, hover: '`some`3333' },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'This method behaves like `||`. If fn a truthy val, iteration stopped. `true` is returned.',
        node: {},
      },
      { content: '`true`, if func truthy for atleast 1 item', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '23', node: {} },
      { content: 'check', node: {}, hover: 'check' },
      { content: '`every`', node: {}, hover: '2222222' },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'This method behaves like `&&`. If fn a falsy val, iteration stopped. `false` is returned. ',
        node: {},
      },
      { content: '`true`, if func truthy for all items', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
];
// let url =
//   'https://spreadsheets.google.com/feeds/list/1-6OxruL0meb2Y6XiEfUKIEnRrrzTITNcRO6q3SCoaMM/od6/public/values?alt=json';
// let loc = await GoogleAPIToRawTable(url);
let arrays = [
  {
    cells: [
      { content: ' ', node: {}, hover: 'dddddddddddddd' },
      { content: 'A', node: {} },
      { content: 'B', node: {} },
      { content: 'C', node: {} },
      { content: 'D', node: {} },
      { content: 'E', node: {} },
      { content: 'F', node: {} },
      { content: 'G', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '1', node: {} },
      { content: '#####Category', node: {} },
      { content: '#####Function', node: {} },
      { content: '#####Arguments', node: {} },
      { content: '#####Description', node: {} },
      { content: '#####Returns', node: {} },
      { content: '#####Else', node: {} },
      { content: '#####Inplace', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '2', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`push`', node: {} },
      { content: '...items', node: {} },
      { content: 'adds `items` to end', node: {} },
      { content: 'new `length`', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    doc: '#push',
    node: {},
  },
  {
    cells: [
      { content: '3', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`pop`', node: {} },
      { content: ' ', node: {} },
      { content: 'extracts an `item` from end', node: {} },
      { content: 'extracted `item` from _end_', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
    doc:
      '# push\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis deserunt magni. Dolore culpa vero sit dolores fugiat et aspernatur exercitationem expedita placeat voluptates ut, ea quidem ipsum facere doloremque itaque suscipit? Iusto, minima. Facere distinctio magni quibusdam itaque minima rerum vitae dignissimos error et quaerat? Asperiores laborum aspernatur debitis.\n\n- Sint dolorem aut.\n- Dicta consectetur iure.\n- Quia non ipsum hic voluptatibus exercitationem.\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis deserunt magni. Dolore culpa vero sit dolores fugiat et aspernatur exercitationem expedita placeat voluptates ut, ea quidem ipsum facere doloremque itaque suscipit? Iusto, minima. Facere distinctio magni quibusdam itaque minima rerum vitae dignissimos error et quaerat? Asperiores laborum aspernatur debitis.\n\n- Sint dolorem aut.\n- Dicta consectetur iure.\n- Quia non ipsum hic voluptatibus exercitationem.\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis deserunt magni. Dolore culpa vero sit dolores fugiat et aspernatur exercitationem expedita placeat voluptates ut, ea quidem ipsum facere doloremque itaque suscipit? Iusto, minima. Facere distinctio magni quibusdam itaque minima rerum vitae dignissimos error et quaerat? Asperiores laborum aspernatur debitis.\n\n- Sint dolorem aut.\n- Dicta consectetur iure.\n- Quia non ipsum hic voluptatibus exercitationem.\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis deserunt magni. Dolore culpa vero sit dolores fugiat et aspernatur exercitationem expedita placeat voluptates ut, ea quidem ipsum facere doloremque itaque suscipit? Iusto, minima. Facere distinctio magni quibusdam itaque minima rerum vitae dignissimos error et quaerat? Asperiores laborum aspernatur debitis.\n\n- Sint dolorem aut.\n- Dicta consectetur iure.\n- Quia non ipsum hic voluptatibus exercitationem.\n',
  },
  {
    cells: [
      { content: '4', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`shift`', node: {} },
      { content: ' ', node: {} },
      { content: 'extracts an `item` from beginning', node: {} },
      { content: 'extracted `item` from _start_', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '5', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`unshift`', node: {} },
      { content: '...items', node: {} },
      { content: 'adds `items` to beginning', node: {} },
      { content: '`new array` with _added_ items', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '6', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`splice`', node: {} },
      { content: 'pos, deleteCount, ...items', node: {} },
      {
        content:
          'at index `pos` deletes `deleteCount` elements and inserts `items`',
        node: {},
      },
      { content: '`new array` with _deleted_ items', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '7', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`slice`', node: {} },
      { content: 'start, end', node: {} },
      {
        content:
          'creates new array, copies elements from index `start` till `end ` (not inclusive) into it',
        node: {},
      },
      { content: '`new array` with _extracted_ items', node: {} },
      { content: ' ', node: {} },
      { content: '  ', node: {} },
    ],
    node: {},
    doc:
      "# slice\n\n```js\narr.slice([start], [end]);\n```\n\nIt returns a new array copying to it all items from index `start` to `end` (not including `end`). Both `start` and `end` can be negative, in that case position from array end is assumed.\n\n```js\nlet arr = ['Alpha', 'Bravo', 'Charlie', 'Delta'];\n\nalert(arr.slice(1, 3));\n// Bravo,Charlie (copy from 1 to 3)\nalert(arr.slice(-2));\n// Charlie,Delta (copy from -2 till the end)\n```\n\nWe can also call it without arguments: `arr.slice()` creates a copy of `arr`. That’s often used to **obtain a copy** for further transformations that should _not affect_ the _original array_.\n",
  },
  {
    cells: [
      { content: '8', node: {} },
      { content: 'add/remove', node: {} },
      { content: '`concat`', node: {} },
      { content: '...items', node: {} },
      {
        content:
          'creates new array, copies current and adds `items` (if array then elements)',
        node: {},
      },
      { content: '`new array` with _combined_ items', node: {} },
      { content: ' ', node: {} },
      { content: 'yes', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '9', node: {} },
      { content: 'search', node: {} },
      { content: '`indexOf`', node: {} },
      { content: 'item, pos', node: {} },
      { content: 'look for `item` starting from `pos`', node: {} },
      { content: '`index`', node: {} },
      { content: '`-1`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '10', node: {} },
      { content: 'search', node: {} },
      { content: '`includes`', node: {} },
      { content: 'value, pos to begin search', node: {} },
      { content: 'boolean result if `value` in array', node: {} },
      { content: '`true` (===)', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '11', node: {} },
      { content: 'search', node: {} },
      { content: '`find`', node: {} },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'filter elements through the function, return **first** values that make it return true.',
        node: {},
      },
      { content: '_searched_ `item`', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '12', node: {} },
      { content: 'search', node: {} },
      { content: '`filter`', node: {} },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'filter elements through the function, return **all** values that make it return true.',
        node: {},
      },
      { content: '`new array` with _searched_ `items` ', node: {} },
      { content: '`[]`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '13', node: {} },
      { content: 'search', node: {} },
      {
        content: '`findIndex`',
        node: {},
        hover:
          '```js\nconst array1 = [5, 12, 8, 130, 44];\n\nconst isLargeNumber = (element) => element > 13;\n\nconsole.log(array1.findIndex(isLargeNumber));\n// expected output: 3\n```',
      },
      { content: 'func', node: {} },
      {
        content: 'is like find, but returns the index instead of a value.',
        node: {},
      },
      { content: '`index` of _found_ `item`', node: {} },
      { content: '`-1`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '14', node: {} },
      { content: 'iterate', node: {} },
      {
        content: '`forEach`',
        node: {},
        hover:
          '```js\nconst array1 = [\'a\', \'b\', \'c\'];\n\narray1.forEach(element => console.log(element));\n\n// expected output: "a"\n// expected output: "b"\n// expected output: "c"\n```',
      },
      { content: 'func(item, index, array)', node: {} },
      { content: 'calls func for every element,', node: {} },
      { content: '`undefined`', node: {} },
      { content: '`undefined`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '15', node: {} },
      { content: 'transform', node: {} },
      { content: '`map`', node: {} },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'creates a new array from results of calling func for every element.',
        node: {},
      },
      { content: '`new array` with _transformed_ `items`', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '16', node: {} },
      { content: 'transform', node: {} },
      { content: '`sort`', node: {} },
      { content: 'func(a, b)', node: {} },
      { content: 'sorts the array in-place', node: {} },
      { content: '`array` reference, _sorted_', node: {} },
      { content: ' ', node: {} },
      { content: 'yes', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '17', node: {} },
      { content: 'transform', node: {} },
      { content: '`reverse`', node: {} },
      { content: ' ', node: {} },
      { content: 'reverses the array in-place', node: {} },
      { content: '`array` reference, _reversed_', node: {} },
      { content: ' ', node: {} },
      { content: 'yes', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '18', node: {} },
      { content: 'transform', node: {} },
      { content: '`split`', node: {} },
      { content: 'delimiter, limit on arr length', node: {} },
      { content: 'converts a string to array', node: {} },
      { content: '`new array` of _split_ strings ', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '19', node: {} },
      { content: 'transform', node: {} },
      { content: '`join`', node: {} },
      { content: 'delimiter, limit on arr length', node: {} },
      { content: 'converts an array to string', node: {} },
      { content: '`string` of _joined_ arrays', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '20', node: {} },
      { content: 'transform', node: {} },
      { content: '`reduce`', node: {} },
      { content: 'func(accumulator, item, index, array), initial', node: {} },
      {
        content:
          'calculate a value by calling `func` on `items` and passing `accumulator` between the calls',
        node: {},
      },
      { content: 'result from reduction (single val)', node: {} },
      { content: ' ', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '21', node: {} },
      { content: 'check', node: {} },
      {
        content: '`Array.isArray`',
        node: {},
        hover:
          "```js\nArray.isArray([1, 2, 3]);  // true\nArray.isArray({foo: 123}); // false\nArray.isArray('foobar');   // false\nArray.isArray(undefined);  // false\n```",
      },
      { content: 'array', node: {} },
      { content: 'checks array for being an Array.', node: {} },
      { content: '`true` (===)', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '22', node: {} },
      { content: 'check', node: {} },
      { content: '`some`', node: {} },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'This method behaves like `||`. If fn a truthy val, iteration stopped. `true` is returned.',
        node: {},
      },
      { content: '`true`, if func truthy for atleast 1 item', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '23', node: {} },
      { content: 'check', node: {} },
      { content: '`every`', node: {} },
      { content: 'func(item, index, array), thisArg', node: {} },
      {
        content:
          'This method behaves like `&&`. If fn a falsy val, iteration stopped. `false` is returned. ',
        node: {},
      },
      { content: '`true`, if func truthy for all items', node: {} },
      { content: '`false`', node: {} },
      { content: ' ', node: {} },
    ],
    node: {},
  },
  {
    cells: [
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      {
        content: 'made by someone0815 [Github](https://github.com/someone0815)',
        node: {},
      },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
      { content: '', node: {} },
    ],
    node: {},
  },
];
