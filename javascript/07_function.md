# function

1. named function
2. 익명 함수
3. 화살표 함수(람다식)

<br>

## 🔖 function 생성

<br>

### ▶ 선언적 function

```js
function hello1() {
    console.log('hello1');
}

console.log(hello1, typeof hello1);
```

- 출력 결과: `[Function: hello1] function` 
- `function`: 객체 중 하나, 표준 내장 객체

#### 매개변수 설정

```js
function hello2(name) {
    console.log('hello2', name);
}
```

#### return 값 설정

```js
function hello3(name) {
    return `hello3 ${name}`;
}

console.log(hello3('Beanie'));
```
- 출력 결과: `hello3 Beanie`

<br>

### ▶ 익명함수 변수 할당

```js
const hello4 = function () {
    console.log('hello4');
}
```

#### 매개변수 설정

```js
const hello5 = function (name) {
    console.log('hello2', name);
};
```

#### return 설정

```js
const hello6 = function (name) {
    return `hello6 ${name}`;
};
```

## 🔖 선언적 function, 익명함수 변수 할당의 차이점

### 선언적 function

```js
world1();

function world1() {
    console.log('world1');
}
```
- 선언적 function으로 만들어진 함수는 생성되기 전에 호출해도 실행된다.
- 이 방식으로 함수를 사용하면 javascript 특성상 함수를 메모리 상에 먼저 올려놓음

<br>

### 변수 할당(var)

```js
console.log(world2); // undefined
world2();

var world2 = function () {
    console.log('world2');
}
```
- 에러 발생: `TypeError: world2 is not a function`
- var는 hoisting이 일어나기에 맨위에 `var world2;`가 호출된 것과 같다.
- 선언은 했지만 할당이 뒤늦게 이루어지기에 `undefined`가 된 것이다.

<br>

### 변수 할당(const)

```js
world3();

const world3 = function () {
    console.log('world3');
}
```
- 에러 발생: `ReferenceError: Cannot access 'world3' before initialization`
- 아예 선언한 적이 없는 변수로 판단
- `const`는 hoisting이 발생하지 않기 때문

<br>

## 🔖 생성자 함수

<br>

### ▶ 생성자 함수로 function을 만드는 방법

```js
const hello = new Function();
```
- 형식: `new Function(인자1, 인자2, ..., 함수 body부분);`
- 생성자로 만드는 방식도 위에 먼저 함수를 호출하면 `ReferenceError가` 발생한다. (hoisting X)

```js
const sum = new Function('a', 'b', 'c', 'return a + b + c');

sum(1, 2, 3);
```

<br>

### ▶ function, new Function()의 차이점

```js
global.a = 0;

{
    const a = 1;

    const test = new Function('return a')

    console.log(test()); // 0
}
```
- `global.a` 선언, 할당이 없을 때: `ReferenceError: a is not defined`
- 바로 위에 있는 `const a = 1;`를 참조하지 않고 `global`을 참조한다.

```js
{
    const a = 2;

    const test = function () {
        return a;
    }

    console.log(test()); // 2
}
```
- test에 할당된 `return a;`는 바로 위의 a를 가리킨다.
- `function`은 `global`을 먼저 참조하지 않는다.

<br>

## 🔖 Arrow Function(화살표 함수)

```js
() => {
    함수 body부분
}
```

```js
// 선언적 방식으로 사용할 수 없고 항상 익명함수 방식으로 사용한다.
const wow1 = () => {
    console.log('wow1');
}

// 매개변수 설정
// 매개변수가 한 개일 때 괄호 생략 가능
const wow2 = name => {
    console.log('wow2', name);
}

const wow3 = (name, age) => {
    console.log('wow3', name, age);
}

wow1();
wow2('beanie');
wow3('beanie', 29);

// return값 설정
const wow4 = name => {
    return `wow4 ${name}`;
}
// 하나의 코드일 경우 이런 식으로 축약할 수 있다.
const wow4 = name => `wow4 ${name}`;
```

### 즉시 실행 함수

```js
let result = (() => "화살표 함수")();
console.log(result);

(() => {console.log("화살표 함수2");})();
```
- `(함수 형태)();`: 바로 함수를 실행한 결과를 나타낸다.

<br>

## 🔖 생성자 함수를 이용한 새로운 객체 만드는 방법

```js
function Person(name, age) {
    // this라는 객체가 생성된다.
    console.log(this); // Person {}
    this.name = name;
    this.age = age;
}

const p = new Person('beanie', 29);
const p2 = new Person('joy', 26);
```
- p, p2라는 서로 다른 Person 객체가 생성

```js
const Cat = (name, age) => {
    console.log(this); // this(객체)가 존재X
    this.name = name;
    this.age = age;
}

const c = new Cat('냐옹', 1); // error
```
- **주의할 점**: arrow function은 객체를 생성해내지 않는다.
- 에러 발생: `TypeError: Cat is not a constructor`
- 그리고 모든 생성자 함수로 사용되는 함수는 `function` keyword를 사용한다.

<br>

## 🔖 함수 안에 함수

```js
function plus(base) {
    return function (num) {
        return base + num;
    }
}

const plus5 = plus(5);
console.log(plus5(10)); // 15

const plus7 = plus(7);
console.log(plus7(10)); // 17
```
- 이런 식으로 함수 안에 함수를 선언할 수 있다.
- `plus(5)`를 변수에 할당해줌으로써 base는 5로 고정이 된다.

<br>

### 함수를 호출할 때 인자로 함수를 사용(callback 함수)

```js
function helloCall(callback) {
    console.log('hello');
    callback();
}

helloCall(function() {
    console.log('callback');
});
```
- `hello callback` 출력

<br>

## 🔖 함수적 프로그래밍 특성

- 함수를 변수에 저장
- 함수의 인수로 함수를 전달 (화살표 함수를 함수의 인수로 전달하기 유용하다.)
- (함수를 일급 객체로 취급하기 때문에) 함수 내부에 함수를 정의할 수 있다.
- 함수에서 함수 정의를 반환할 수 있다.
- 자바스크립트에서 모든 함수는 **가변 파라미터**를 가지는 함수다.

```js
function sumAll(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

sumAll(1, 2, 3); // 1 2 3
sumAll(1, 2); // 1 2 undefined
sumAll(1, 2, 3, 4); // 1 2 3

console.dir(sumAll);
```

<br>

```js
function sum() {
    console.log(arguments.length); // 0 (인자를 넣어주면 개수 만큼 결과값 도출)
    let result = 0;
    for (let numb of arguments) {
        result += numb;
    }
    return result;
}

console.log(sum()); // 0
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // 55
```
- javascript는 가변 파라미터를 가진다.

<br>

```js
function createArray() {
    // 인수가 없으면 빈 배열을 생성해서 return
    // 인수가 하나면 초기 size의 배열을 생성해서 return
    // 인수가 하나 이상이면 인수들을 배열의 요소로 저장해서 return
}
```

## 🔖 표준 내장 함수

### parseInt(), parseFloat()

```js
let inputA = "52"
let inputB = "52.153"
let inputC = "1202등"

console.log(parseInt(inputA));

console.log(parseInt(inputB)); // 52
console.log(parseFloat(inputB)); // 52.153

console.log(parseInt(inputA)); // 1202
```

<br>

### setTimeout(), setInterval(), clearInterval()

```js
// 1초 후에 실행
setTimeout(function() {
    console.log("1초가 지났습니다.");
}, 1000);

// 1초마다 실행
setInterval(function() {
    console.log("1초가 지났습니다.");
}, 1000);
```
- `setInterval()`의 종료는 `ctrl + c`
- 혹은 `clearInterval()` 사용해서 종료시킬 수 있다.

```js
let interval = setInterval(function() {
    console.log("1초가 지났습니다.");
}, 1000);

setTimeout(function() {
    // 타이머 제거
    clearInterval(interval);
}, 3000) // 3초 후에 해당 interval 실행을 종료
```