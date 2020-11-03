# Data Type

## 🔖 Dynamic Typing

```js
let changable = 'beanie'; // 문자열 할당

changable = 10; // 숫자형으로 변경

changable = true; // boolean형으로 변경
```
- dynamic typing : 동적 타이핑, type이 바뀔 수 있음
- 변수가 가지는 고정 타입이 없다.
- 타입이 없는 것은 아니다.

<br>

## 🔖 Data Type

1. **기본타입(primitive type)**
   - boolean
   - Null
   - Undefined
   - Number
   - String
   - Symbol(ES6에 추가)
2. **객체타입(Objects)**

<br>

### ▶ Boolean

```js
true;
false; 

const isTrue = true;
const isFalse = false;

console.log(isTrue, typeof isTrue); // true boolean
console.log(isTrue, typeof isFalse); // false boolean
```

생성자를 통해서도 생성할 수 있다.
```js
const a = new Boolean(false); // 이런식으로 생성자를 통해 만들 수 있다.
console.log(a, typeof a); // [Boolean: false] object
```
이런식으로 사용하진 않는다. 조건식으로 사용할 때 primitive으로 접근해야지 object로 접근하면 안된다.  
다음과 같은 문제가 발생한다.

```js
const a = new Boolean(false);

if (a) {
    console.log(a);
}
```
if문 블럭 안에 있는 코드가 실행이 안되도록 false값을 지정했지만,  
a 자체가 object이기 때문에 true로 인식한다.

```js
const b = Boolean(-1);
console.log(b, typeof b); // [Boolean: false] object
```
- `0`: false
- `0외 숫자`: true
- `Boolean()` 처럼 boolean값을 생성하면 primitive 성격을 가지게 된다.

<br>

### ▶ Null

```js
const a1 = null;
console.log(a1, typeof a1); // null object
```
- `null`은 `object`임을 알 수 있다.
- `아예 값이 없는 상태`를 구분할 때 `null`을 사용

<br>

### ▶ Undefined

```js
let b1;

console.log(b1, typeof b1); // undefined undefined

b1 = undefined;

console.log(b1, typeof b1); // undefined undefined, 똑같다.

if (a1 == b1) {
    console.log(a1 == b1); // true
}

// 보통 비교할 때는 === 으로 비교한다. 
if (a1 === b1) {
    console.log(a1 === b1); // false
}
```

<br>

### ▶ Number

```js
const num = 37;
console.log(num, typeof num); // 37 number

const num2 = 96.7; 
console.log(num2, typeof num2); // 96.7 number

const num3 = NaN;
console.log(num3, typeof num3); // NaN number, 

const num4 = Number('beanie');
console.log(num4, typeof num4); // NaN number
```
- `NaN`: 숫자가 아니라는 것을 나타내는 number형 type
- number형은 사칙연산이 가능하다.

<br>

### ▶ String

```js
const s = 'beanie';
console.log(s, typeof s); // beanie string

const s2 = 'joy';

// 이렇게 합치는 것도 가능
const s3 = s + s2;
```
string에서도 합치는(+) 기능이 가능하다.

```js
const s4 = `${s} love ${s2}`;
console.log(s4, typeof s4); // beanie love joy string
```
`template string` (ES6부터 추가된 기능)

<br>

### ▶ Symbol
```js
const sym = Symbol();
const sym2 = Symbol(20);
const sym3 = Symbol('beanie');
const sym4 = Symbol('beanie');

console.log(sym2, typeof sym2); // Symbol(20) symbol
console.log(sym3 === sym4); // false
```
- symbol은 고유한 것으로 지칭할 때 사용한다.
- 값은 같아도 다른 것이 되어버린다.

<br>

## 🔖 배열(Array)

```js
let a = ['10', 10.5, false]
```
- 배열 정의: size 가변적, 데이터 요소의 타입이 동일하지 않아도 된다.
- `object` type으로 취급

<br>

### Stack 개념의 Array객체

```js
var nums = new Array();

nums.push(5);
var n1 = nums.pop();

nums.push(10);
var n1 = nums.pop();

nums.push(21);
var n1 = nums.pop();
```
stack 처럼 pop, push로 관리

### list 개념의 Array객체

```js
var nums = new Array();

nums[0] = 5;
alert(nums[0]);

nums[1] = 10;
alert(nums[1]);

nums[2] = 15;
alert(nums[2]);
```
index로 접근 가능

```js
var nums = new Array();

nums[2] = 15; // [empty x 2, 15] 이런식으로 나온다.
alert(nums);

alert(nums.length); // 3
```
중간에 값이 빠져있어도 empty값으로 들어간다.

### 배열 객체 초기화

```js
var nums = new Array();
var nums = new Array(5);
var nums = new Array(5, 10, 15);
var nums = new Array(5, 10, 15, "hello");
var nums = new Array(5, 10, 15, new Array(2, "hello", 3));
```
초기화에는 여러가지 방법이 존재

### slice 문법

```js
var nums = new Array(5, 10, 15, "hello");
nums.splice(2);
console.log(nums); // [5, 10]

var nums = new Array(5, 10, 15, "hello");
nums.splice(2, 1);
console.log(nums); // [5, 10, "hello"]

var nums = new Array(5, 10, 15, "hello");
nums.splice(2, 1, "good");
console.log(nums); // [5, 10, "good", "hello"]

var nums = new Array(5, 10, 15, "hello");
nums.splice(2, 0, "good"); // 중간에 삽입도 가능하다.
console.log(nums); // [5, 10, "good", 15, "hello"]
```

<br>

## 🔖 연산자

- 산술연산자
- 비교연산자: `==`, `===`, `!=`, `!==`, `>`, `>=`,..
  - `==`: 값만 비교(자동으로 형변환을 해준다.)
  - `===`: 값과 type까지 비교한다.
- 논리연산자: `&&`, `||`
- 단한연산자: `++`, `--`, `!`, `~`

