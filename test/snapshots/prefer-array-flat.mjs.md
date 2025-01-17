# Snapshot report for `test/prefer-array-flat.mjs`

The actual snapshot is saved in `prefer-array-flat.mjs.snap`.

Generated by [AVA](https://avajs.dev).

## Invalid #1
      1 | array.flatMap(x => x)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | array.flatMap(x => x)␊
        | ^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array#flatMap()\` to flatten an array.␊
    `

## Invalid #1
      1 | array.reduce((a, b) => a.concat(b), [])

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | array.reduce((a, b) => a.concat(b), [])␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array#reduce()\` to flatten an array.␊
    `

## Invalid #1
      1 | array.reduce((a, b) => [...a, ...b], [])

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | array.reduce((a, b) => [...a, ...b], [])␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array#reduce()\` to flatten an array.␊
    `

## Invalid #2
      1 | array.reduce((a, b) => [...a, ...b,], [])

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | array.reduce((a, b) => [...a, ...b,], [])␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array#reduce()\` to flatten an array.␊
    `

## Invalid #1
      1 | [].concat(array)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | [].concat(array)␊
        | ^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`[].concat()\` to flatten an array.␊
    `

## Invalid #1
      1 | [].concat(...array)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | [].concat(...array)␊
        | ^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`[].concat()\` to flatten an array.␊
    `

## Invalid #1
      1 | [].concat.apply([], array)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | [].concat.apply([], array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array.prototype.concat()\` to flatten an array.␊
    `

## Invalid #1
      1 | Array.prototype.concat.apply([], array)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | Array.prototype.concat.apply([], array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array.prototype.concat()\` to flatten an array.␊
    `

## Invalid #1
      1 | _.flatten(array)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | _.flatten(array)␊
        | ^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`_.flatten()\` to flatten an array.␊
    `

## Invalid #2
      1 | lodash.flatten(array)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | lodash.flatten(array)␊
        | ^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`lodash.flatten()\` to flatten an array.␊
    `

## Invalid #3
      1 | underscore.flatten(array)

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | underscore.flatten(array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`underscore.flatten()\` to flatten an array.␊
    `

## Invalid #1
      1 | flat(array)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | flat(array)␊
        | ^^^^^^^^^^^ Prefer \`Array#flat()\` over \`flat()\` to flatten an array.␊
    `

## Invalid #2
      1 | flat(array,)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | flat(array,)␊
        | ^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`flat()\` to flatten an array.␊
    `

## Invalid #3
      1 | utils.flat(array)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | utils.flat(array)␊
        | ^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`utils.flat()\` to flatten an array.␊
    `

## Invalid #4
      1 | globalThis.lodash.flatten(array)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | globalThis.lodash.flatten(array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`globalThis.lodash.flatten()\` to flatten an array.␊
    `

## Invalid #5
      1 | flat(array).map(array => utils.flat(array))

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | array.flat().map(array => array.flat())␊
    `

> Error 1/2

    `␊
    > 1 | flat(array).map(array => utils.flat(array))␊
        | ^^^^^^^^^^^ Prefer \`Array#flat()\` over \`flat()\` to flatten an array.␊
    `

> Error 2/2

    `␊
    > 1 | flat(array).map(array => utils.flat(array))␊
        |                          ^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`utils.flat()\` to flatten an array.␊
    `

## Invalid #6
      1 | import {flatten as flat} from 'lodash-es';
      2 | const foo = flat(bar);

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | import {flatten as flat} from 'lodash-es';␊
      2 | const foo = bar.flat();␊
    `

> Error 1/1

    `␊
      1 | import {flatten as flat} from 'lodash-es';␊
    > 2 | const foo = flat(bar);␊
        |             ^^^^^^^^^ Prefer \`Array#flat()\` over \`flat()\` to flatten an array.␊
    `

## Invalid #7
      1 | _.flatten(array).length

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | array.flat().length␊
    `

> Error 1/1

    `␊
    > 1 | _.flatten(array).length␊
        | ^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`_.flatten()\` to flatten an array.␊
    `

## Invalid #8
      1 | Array.prototype.concat.apply([], array)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "flat",␊
          "utils.flat",␊
          "globalThis.lodash.flatten"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | Array.prototype.concat.apply([], array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array.prototype.concat()\` to flatten an array.␊
    `

## Invalid #1
      1 | flat1(x)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "",␊
          " ",␊
          " flat1 ",␊
          "utils..flat2",␊
          "utils . flat3",␊
          "utils.fl at4",␊
          "utils.flat5  ",␊
          "  utils.flat6"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | x.flat()␊
    `

> Error 1/1

    `␊
    > 1 | flat1(x)␊
        | ^^^^^^^^ Prefer \`Array#flat()\` over \`flat1()\` to flatten an array.␊
    `

## Invalid #2
      1 | utils.flat5(x)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "",␊
          " ",␊
          " flat1 ",␊
          "utils..flat2",␊
          "utils . flat3",␊
          "utils.fl at4",␊
          "utils.flat5  ",␊
          "  utils.flat6"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | x.flat()␊
    `

> Error 1/1

    `␊
    > 1 | utils.flat5(x)␊
        | ^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`utils.flat5()\` to flatten an array.␊
    `

## Invalid #3
      1 | utils.flat6(x)

> Options

    `␊
    [␊
      {␊
        "functions": [␊
          "",␊
          " ",␊
          " flat1 ",␊
          "utils..flat2",␊
          "utils . flat3",␊
          "utils.fl at4",␊
          "utils.flat5  ",␊
          "  utils.flat6"␊
        ]␊
      }␊
    ]␊
    `

> Output

    `␊
      1 | x.flat()␊
    `

> Error 1/1

    `␊
    > 1 | utils.flat6(x)␊
        | ^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`utils.flat6()\` to flatten an array.␊
    `

## Invalid #1
      1 | before()
      2 | Array.prototype.concat.apply([], [array].concat(array))

> Output

    `␊
      1 | before()␊
      2 | ;[array].concat(array).flat()␊
    `

> Error 1/1

    `␊
      1 | before()␊
    > 2 | Array.prototype.concat.apply([], [array].concat(array))␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array.prototype.concat()\` to flatten an array.␊
    `

## Invalid #2
      1 | Array.prototype.concat.apply([], (0, array))

> Output

    `␊
      1 | (0, array).flat()␊
    `

> Error 1/1

    `␊
    > 1 | Array.prototype.concat.apply([], (0, array))␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`Array.prototype.concat()\` to flatten an array.␊
    `

## Invalid #3
      1 | async function a() { return [].concat(await getArray()); }

> Output

    `␊
      1 | async function a() { return (await getArray()).flat(); }␊
    `

> Error 1/1

    `␊
    > 1 | async function a() { return [].concat(await getArray()); }␊
        |                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`[].concat()\` to flatten an array.␊
    `

## Invalid #4
      1 | [].concat(some./**/array)

> Output

    `␊
      1 | some./**/array.flat()␊
    `

> Error 1/1

    `␊
    > 1 | [].concat(some./**/array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`[].concat()\` to flatten an array.␊
    `

## Invalid #5
      1 | [/**/].concat(some./**/array)

> Error 1/1

    `␊
    > 1 | [/**/].concat(some./**/array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`[].concat()\` to flatten an array.␊
    `

## Invalid #6
      1 | [/**/].concat(some.array)

> Error 1/1

    `␊
    > 1 | [/**/].concat(some.array)␊
        | ^^^^^^^^^^^^^^^^^^^^^^^^^ Prefer \`Array#flat()\` over \`[].concat()\` to flatten an array.␊
    `
