# Promise

[Promise관련 MDN문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

ES6 부터 js의 표준 내장 객체로 추가되었다.  
ES6를 지원하는 브라우저나 Node.js 에서 전역에 있는 Promise를 확인할 수 있다.

```js
console.log(Promise);
```

<br>

## 🔖 생성자를 통한 Promise 객체생성

생성자를 통해서 프로미스 객체를 만들 수 있다.  
생성자의 인자로 executor라는 함수를 이용한다.

```js
new Promise(/* executor */ (resolve, reject) => {});
```
executor 함수는 resolve와 reject를 인자로 가진다.  
`(resolve, reject) => {...}`

resolve, reject는 함수다. `resolve()`, `reject()`  

<br>

```js
new Promise((resolve, reject) => {}); // pending 상태가 된다.
```
생성자를 통해 프로미스 객체를 만드는 순간 pending(대기) 상태라고 한다.

<br>

### resolve(fulfilled 상태), reject(rejected 상태)
```js
new Promise((resolve, reject) => {
  // ...
  // situation (비동기 상황)
  // 상황 종료 후
  resolve(); // fulfilled
});
```
executor함수 인자 중 하나인 resolve함수를 실행하면, fulfilled(이행) 상태가 된다.

```js
new Promise((resolve, reject) => {
  // ...
  reject(); // rejected 상태
});
```
executor함수 인자 중 하나인 reject함수를 실행하면, rejected(거부) 상태가 된다.

<br>

### 예시 적용

- resolve() 
```js
const p = new Promise((resolve, reject) => {
  /* pending */
  setTimeout(() => {
    resolve(); // fulfilled
  }, 1000); // setTimeout(): 뒤에 ms 설정 시간 이후에 인자로 넣은 함수 실행해주는 함수
});

// Promise 객체 생성때 resolve되어 fulfilled되면 then안에 함수인자가 실행
p.then(/* callback */ () => {
    console.log("1000ms후에 fulfilled 됩니다.");
  }
);
```
Promise 객체 생성때 resolve되어 fulfilled되면 then안에 함수인자가 실행

```js
function p() {
  return new Promise((resolve, reject) => {
    /* pending */
    setTimeout(() => {
      resolve(); // fulfilled
    }, 2000);
  });
}

p().then(() => {
  console.log("2000ms후에 fulfilled 됩니다.");
});
```
then을 설정하는 시점을 정확히하고, 함수의 실행과 동시에 프로미스 객체를 만들면서 pending이 시작하도록 하기 위해
프로미스 객체를 생성하면서 리턴하는 함수(p)를 만들어 함수(p) 실행과 동시에 then을 설정한다.