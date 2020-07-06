# Condition

> `if`, `switch`

## 🔖 Conditional Statement

> 표현식이 참으로 평가될 때 실행되는 블럭

```js
const n = 12;

if (n % 3 === 0) {
    console.log('3의 배수');
} else if (n % 4 == 0) {
    console.log('4의 배수');
} else {
    console.log('3의 배수, 4의 배수 둘다 아니다.');
}
```
- 블럭에 코드가 한줄이면, 중괄호(`{}`) 생략 가능
- 12가 3, 4의 배수더라도 맨 위에 코드만 실행('3의 배수' 출력)
- if문은 위에서부터 statement가 참에 해당하면 해당 코드를 실행하고 끝
- java와 같이 `if` ~ `else if` ~ `else`로 구성
<br>

### ▶ 표현식이 거짓(`false`)인 경우(Falsy한 값)
- `false`
- `0`
- `null`
- `undefined`
- `NaN`
- 빈 문자열(`''`)

### ▶ 표현식이 참(`true`)인 경우(Truthy한 값)
- Falsy의 반대
- `true`
- `5`, `7`, `8`, ... NaN이 아닌 Number형 데이터
- `'beanie'` (빈문자열 아닌 문자열)
- `{}` (`object`)
- `[]` (`array`)
- `object`와 `array`는 비어있는 것도 true로 평가

<br>

## 🔖 Conditional Statement 관련 기호

- `&&`, `||`, `!`를 이용해 조건식(Statement) 구성 가능
- `&&`: and 연산자
- `||`: or 연산자
- `!`: 반대 값으로 뒤집는 역할

## 🔖 삼항 연산자를 이용한 조건부 실행

> [조건식] ? [true일 때 실행되는 표현식] : [false일 때 실행되는 표현식]

중괄호를 사용할 수 없는 문법, 하나의 표현식만 가능하다.

```js
let numb = 5;

console.log(n % 5 == 0 ? '5의 배수' : '5의 배수가 아님');

// 이렇게 변수로 지정할 수도 있다.
const message = n % 5 == 0 ? '5의 배수' : '5의 배수가 아님';
console.log(message);
```

## 🔖 Switch 문

- switch 뒤 괄호 안에 있는 값이 무엇인지 중괄호 안에 있는 코드들을 비교해서 실행
- `default`: 뒤 문장은 항상 참으로 실행되는 블럭

```js
let numb2 = 5;
switch (numb2) {
    default:
        console.log(numb2);
}

switch (numb2 % 5) {
    case 0: {
        console.log('5의 배수');
        break;
    }
    default:
        console.log(numb2);
}

```
java와 같이 각 case문에 `break` 설정을 하지않으면 그 밑에 case나 default도 실행된다.

<br>

```js
let b = 89 // 내 점수
let grade;
switch(true) {
    case b >= 90: grade = 'A'; break;
    case b >= 80: grade = 'B'; break;
    case b >= 70: grade = 'C'; break;
    case b >= 60: grade = 'D'; break;
    default: grade = 'F';
}
```
이런 식으로도 사용할 수 있다.
<br>

```js
switch (numb2 % 5) {
    case 0: {
        console.log('5의 배수');
        break;
    }

    case 1:
    case 2:
    case 3:
    case 4:
        console.log('5의 배수가 아니다.');

    default:
        console.log(numb2);
}
```
- `break`를 이용해 case를 잘 구성해야 한다.
- `break`가 없으면 밑으로 쭉 실행된다고 생각하면 된다.