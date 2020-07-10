## 🔖 Hoisting

> 호이스팅(hoisting)은 ECMAScript® 2015 언어 명세 및 그 이전 표준 명세에서 사용된 적이 없는 용어입니다. 

- 아래에 있는 선언(만)을 끌어올리는 방식
- 해당 블록에서 사용할 변수를 미리 확인해서 정리하는 작업

#### 함수 먼저 선언
```js
function hello() {
    console.log('hello javascript!');
}

hello();
```

#### 함수 먼저 호출
```js
hello2();

function hello2(){
    console.log('hello javascript hoisting!');
}
```

#### var도 적용

```js
age = 6;
age++;
console.log(age);

var age;

// ReferenceError: Cannot access 'name' before initialization
console.log(name);

name = 'beanie';

console.log(name); // beanie

let name = 'joy'; // 여기서 joy 할당
```
- 여기서 알 수 있는 건 `var name`이라는 선언부만 위로 올라간다는 것이다.
- let은  에러 발생: hoisting 적용이 안된다고 할 수 있다.

<br>

## 🔖 참고

[hoisting link](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
