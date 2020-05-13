# Loop (iteration)

> `for`, `while`

## 🔖 `for` Loop

```js
for (초기화; 반복 조건; iter마다 실행되는 코드) {
    반복할 코드;
}
```

```js
for (let i = 0, j = 2; i < 5; i++, j = j * j) {
    console.log('i: ', i, ' j: ', j);
}
```
복수의 변수를 초기화하고 조건을 걸 수 있다.

<br>

- `break`: 반복문을 즉시 종료, 종료하고 싶은 반복문 블럭 안에 break를 실행하면 된다.
- `continue`: 실행된 지점까지만 진행하고 다음 반복을 실행, 그 아래는 실행X

<br>

## 🔖 `While` Loop

#### while문
```js
while (조건) {
    - 조건이 거짓일 때 반복 중단
    - 참일 때는 계속 반복
}
```

#### do ~ while문
```js
do {
    조건이 거짓일 때 반복 중단
} while (조건);
```
- 처음에 조건의 참거짓 상관없이 일단 한번 실행한다.
- 반드시 한번은 실행된다.

<br>

## 🔖 무한 Loop

```js
for (; ;) {
    console.log('계속 반복');
    if (Math.random() * 100 > 90) {
        break;
    }
}

while (true) {
    console.log('계속 반복');
    if (Math.random() * 100 > 90) {
        break;
    }
}
```
- `for(; ;) {}`
- `while (true) {}`

<br>

## 🔖 `of`, `in`

- for of: iterable한 객체에 사용 가능, iterable한 객체는 배열 등이 있다.
- for in: 모든 프로퍼티에서 사용가능, 객체에서도 가능

```js
for (const i of [1, 2, 3]) {
    console.log(i);
} // 1 2 3 출력
```

<br>

의도치 않은 결과를 도출할 수 있다.

```js
Object.prototype.test = function () { };
for (const i in { a: 1, b: 2, c: 3 }) {
    console.log(i);
} // a b c test
```
- `in`은 모든 `property`를 가져와준다.
- Object prototype에 test라는 function을 선언
- 모든 객체는 Object prototype을 chaining(상속)받는다.
- 그래서 `a b c test`라는 결과가 출력, test도 property로 설정되어 있기 때문에 출력되는 것