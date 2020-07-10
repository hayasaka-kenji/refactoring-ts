let a: boolean = true;
let b = false;

function func(a: number, b: number): number {
  return a + b;
}

// Array
let aa: string[] = ['a', 'b'];

// Object
// undefined
interface Hoge {
  a: number | null,
  b?: number
  // ...
}
let v:Hoge = { a: null, b: 20 };
