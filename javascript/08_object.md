# Object

함수, 클래스(틀) / 객체, 개체, object(instance라고도 부른다.)  
객체는 속성과 기능을 가지는 현실세계의 유형, 무형의 개체

<br>

객체 정의 방법
1. 함수를 이용한 정의 방법(function name() {})
2. JSON: 데이터 전송시 경량화된 객체로 정의할 수 있다.
3. class: ECMAScript 6부터 

<br>

## 🔖 생성자 함수로 객체 만들기

```js
function ObjectName() {} => new ObjectName();
```

<br>

### ▶ 기본적 객체 생성

```js
function A() { }

const a = new A();
console.log(a, typeof a); // A {} object
```
- function 키워드를 이용한 객체 생성

```js
console.log(A());
```
- **이렇게 함수 호출하듯이 Object를 호출할 수 있다.**
- `function A`의 return 값을 호출
- 지금은 객체 A안에 아무것도 구현하지 않았기에 `undefined`를 반환

<br>

### ▶ 생성과 데이터 주입

```js
function B(name, age) {
    console.log(name, age); // undefined undefined
} 

const b = new B('Beanie', 20);
console.log(B()); // undefined
```
- B()를 호출하는 순간 안에 `console.log(name, age);` 가 실행된다. 그래서 `undefined undefined`가 출력(name, age 설정 전이기 때문)
- B function 내부에 return을 설정한 것이 없기에 B()는 undefined 반환

<br>

### ▶ 객체에 속성 추가하기(property)

```js
function Person() {
    this.name = 'Beanie';
}

const p = new Person();
console.log(p); // Person { name: 'Beanie' }

// 함수를 속성으로 넣기
function Hello() {
    this.hello = function () {
        console.log('hello');
    }
}

new Hello().hello();
```

<br>

## 🔖 Object로 객체 만들기(권장 방법X)

```js
new Object();
```
- 객체를 생성해준다.

```js
const obj = new Object();
console.log(obj, typeof obj); // {} object
```
- 빈 객체를 생성해준다.

```js
const obj2 = new Object(true);
console.log(obj2, typeof obj2); // [Boolean: true] object
```
- Boolean이라는 생성자를 이용해서 true라는 값을 가진 object형의 객체가 나온다.
- **`if`같은 조건식에 이를 사용하면 안된다.** `false`라고 주입시켜도 object형이기 때문에 true로 인식한다.

```js
const obj3 = new Object({ name: 'Joy' });
console.log(obj3, typeof obj3); // { name: 'Joy' } object
```
- literal이라고도 한다. 문자 그대로 작성한 객체라고 한다.

<br>

## 🔖 prototype chain

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
    // this.hello = function() {
    //     console.log('hello', this.name, this.age);
    // };
}

Person.prototype.hello = function () {
    console.log('hello', this.name, this.age);
}

const p = new Person('Beanie', 20);

p.hello(); // hello Beanie 20
```

```js
console.log(p.toString()); // [object Object]
console.log(Person.prototype); // Person { hello: [Function] }
console.log(Person.prototype.toString); // [Function: toString]
console.log(Person.prototype.constructor); // [Function: Person] -> Person function 자체를 의미한다.
console.log(Person.hello); // undefined -> 객체를 생성해야 그 안에 함수를 실행할 수 있다.
```
- prototype은 일반적인 객체 생성후 hello function을 할당하는 것과 다른 것이다.

```js
console.log(Person.prototype.hello); // [Function] 
```
- 위에서 `prototype.hello`에 `function`을 할당해준 것이다.
- 이렇게 해도 위에서 `p.hello();`도 정상적으로 실행된다.

```js
console.log(Object.prototype); // {}
console.log(Object.prototype.toString); // [Function: toString]
console.log(Object.prototype.constructor); // [Function: Object] 
```
- Object라 하는 기초 객체의 생성 함수
- java에서 모든 class의 부모 격인 Object에서 toString 메서드가 있는 것과 비슷하다.

```js
console.log(p instanceof Person); // true
console.log(p instanceof Object); // true
```
> 결국 Person은 Object로부터 prototype chain을 받아온 후에 직접 설정한 property와 function이 들어가게 된다.

<br>

## 🔖 prototype을 이용한 객체 확장

> java의 상속과 비슷하다.

```js
function Person() { }

Person.prototype.hello = function () {
    console.log('hello');
}

function Korean(region) {
    this.region = region;
    this.where = function () {
        console.log('where', this.region);
    };
}

Korean.prototype = Person.prototype;

const k = new Korean('Seoul');
// 둘다 호출 된다.
k.hello();
k.where();
```
- Object -> Person -> Korean을 chaining 한 것으로 보면 된다.(상속 같은 개념)
- 그 전달은 prototype을 통해서 전달한다.(prototype chain)

```js
// 전부 true
console.log(k instanceof Korean);
console.log(k instanceof Person2);
console.log(k instanceof Object);
```

> `A : prototype` prototype을 가지고 해당 객체의 내용을 추가/확장
> `B : B.prototype = A.prototype`(A의 prototype을 chaining), prototype에서 내용 추가/확장

<br>

## 🔖 객체 리터럴

```js
const objLiteral = {};
console.log(objLiteral, typeof objLiteral); // {} object

const objLiteral2 = {
    name: 'Beanie'
};

console.log(objLiteral2, typeof objLiteral2); // { name: 'Beanie' } object
```
