# Class

ES6부터 추가된 문법  
객체를 만들 수 있는 새로운 방법이다.  
  
js의 객체지향은 prototype기반으로 구현하고 있는데  
새로 추가된 class로 강력한 객체지향 사용법을 구현할 수 있다.  
  
Class문법은 새로운 객체지향 상속모델을 제공하는 것은 아니다.  
기존의 prototype 모델을 명료하고 깔끔하게 사용하기 위해 나온 것이다.  
(일종의 도우미 역할)  

<br>

## 🔖 선언적 방식

```js
Class A {}

console.log(new A()); // A {}

// class 표현식을 변수에 할당
const B = class {};
console.log(new B()); // B {}
```
<br>

```js
new C(); // 에러 발생 (ReferenceError: Cannot access 'C' before initialization)
class C {};
```
선언적 방식이지만 기존의 function과 다르게 hoisting이 발생하지 않는다.

<br>

## 🔖 생성자(constructor)

`constructor` > 생성자
함수를 통해서 객체를 만들 때 함수에 인자를 넣음으로써 외부의 데이터를 안으로 집어넣을 수 있게끔 할 수 있다.  
class에서도 이와 비슷한 기능이 있다.  

```js
class conA {}
console.log(new conA());

class conB {
  constructor() {
    console.log("constructor 실행");
  }
}

console.log(new conB()); //constructor 실행
```

```js
class conC {
  constructor(name, age) {
    console.log("constructor", name, age);
  }
}

console.log(new conC("Beanie", 20));
```
만약 생성자 안에 인자를 넣지 않으면 `undefined undefined`가 출력된다.