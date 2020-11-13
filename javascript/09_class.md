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

<br>

## 🔖 맴버변수

```js
class memA {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

<br>

맴버변수를 더 쉽게 정의하는 방법이 있다. runtime 환경을 체크해야 한다. (최신버전으로)

```js
class memB {
  name;
  age;
}

console.log(new memB()); //memB { name: undefined, age: undefined }
```

```js
class memC {
  // 초기값
  name = "no name";
  age = 0;

  // constructor를 통해 맴버변수 값을 변경해준다.
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

console.log(new memC("Beanie", 10));
```

<br>

## 🔖 맴버함수

```js
// 맴버함수
class funA {
  hello1() {
    console.log("hello1 Joy", this);
  }

  hello2 = () => {
    console.log("hello2 Joy", this);
  };
}

new funA().hello1(); //hello1 Joy funA { hello2: [Function: hello2] }
new funA().hello2(); // hello2 Joy funA { hello2: [Function: hello2] }
```

```js
class funB {
  name = "Joy";

  hello() {
    console.log("hello", this.name);
  }
}

new funB().hello();
```

<br>

## 🔖 js class의 getter, setter

```js
class Example {
  _name = "no name";

  get name() {
    return this._name + "@@@";
  }

  set name(value) {
    this._name = value + "!!!";
  }
}
```
```js
const ex = new Example();
console.log(ex); // Example { _name: 'no name' }

ex.name = "Beanie"; // setter 발동
console.log(ex); // Example { _name: 'Beanie!!!' }

console.log(ex.name); // Beanie!!!@@@ (getter 발동)
console.log(ex._name); // Beanie!!! (맴버변수만 출력)
```
맴버변수에 접근할 때 getter와 setter를 통해 접근(java와 같다.)

```js
// getter만 남긴다.
class Example2 {
  _name = "no name";

  get name() {
    return this._name + "@@@";
  }
}

const ex2 = new Example2();
console.log(ex2);
ex2.name = "Beanie"; // 이렇게 해도 맴버변수가 바뀌지 않는다.
```
readonly인 클래스 객체 생성

<br>

## 🔖 static 맴버변수, 함수

```js
class StaticEx {
  static age = 20;
  static hello() {
    console.log(StaticEx.age);
  }
}

console.log(StaticEx, StaticEx.age); // [Function: StaticEx] { age: 20 } 20
StaticEx.hello(); // 20
```
- static을 하면 메모리에 객체가 생성되기전에 올라간다.
- 클래스 단위로 맴버변수에 접근 가능

```js
class StaticEx2 {
  age = 20;
  static hello() {
    console.log(this.age);
  }
}

console.log(StaticEx2, StaticEx2.age); // [Function: StaticEx2] undefined
StaticEx2.hello(); // undefined
```
- 여기서는 age가 static이 아니기에 static 맴버함수인 hello()가 먼저 메모리에 올라온다.  
- hello()가 먼저 생성 > 여기 안에 있는 age는 undefined 상태

```js
class StaticEx3 {
  static name = "이 클래스는 StaticEx3가 아니다.";
}

console.log(StaticEx3);
// [Function: 이 클래스는 StaticEx3가 아니다.] { name: '이 클래스는 StaticEx3가 아니다.' }
```
- name을 static 변수로 지정하면 className이 된다.

<br>

## 🔖 상속(extends)

```js
class Parent {
    name = 'Lee';

    hello() {
        console.log('hello', this.name);
    };
}

class Child extends Parent {}

const p = new Parent();
const c = new Child();
console.log(p, c); // Parent { name: 'Lee' } Child { name: 'Lee' }

// 상속을 받은 메서드와 맴버변수 둘다 사용 가능
c.hello(); // hello Lee
c.name = 'Joy';
c.hello(); // hello Joy 
```

### 변수, 함수 추가 및 Overriding
```js
class Parent {
  name = 'Lee';

  hello() {
    console.log('hello', this.name);
  }
}

class Child extends Parent {
  age = 30;
  // function overriding
  hello() {
    console.log('hello', this.name, this.age);
  }
}

const p = new Parent();
const c = new Child();
```

### Super
```js
class Parent {
  name;

  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log('hello', this.name);
  }
}

class Child extends Parent {
  age;

  constructor(name, age) {
    super(name);
    this.age = age;
  }

  hello() {
    console.log('hello'. this.name, this.age);
  }
}

const p = new Parent('Mark');
const c = new Child('Beanie', 30);
console.log(p, c);
// Parent { name: 'Mark' } Child { name: 'Beanie', age: 30 }
```

### static 상속
```js
class Parent {
  static age = 20;
}

class Child extends Parent {}

console.log(Parent.age, Child.age); // static도 상속받는다. (class로)
```