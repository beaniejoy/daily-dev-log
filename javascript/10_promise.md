# Promise

[Promise관련 MDN문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

ES6 부터 js의 표준 내장 객체로 추가되었다.  
ES6를 지원하는 브라우저나 Node.js 에서 전역에 있는 Promise를 확인할 수 있다.

<br>

## 🔖 생성자를 통한 Promise 객체생성

```js
console.log(Promise);
```

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
생성자를 통해 프로미스 객체를 만드는 순간 **pending(대기)** 상태라고 한다.

<br>

## 🔖 `resolve`, `reject`

- `resolve`
```js
new Promise((resolve, reject) => {
  // ...
  // situation (비동기 상황)
  // 상황 종료 후
  resolve(); // fulfilled
});
```
executor함수 인자 중 하나인 resolve함수를 실행하면, fulfilled(이행) 상태가 된다.

- `reject`
```js
new Promise((resolve, reject) => {
  // ...
  reject(); // rejected 상태
});
```
executor함수 인자 중 하나인 reject함수를 실행하면, rejected(거부) 상태가 된다.

<br>

### `resolve` 적용 (fulfilled)

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
Promise 객체 생성때 resolve되어 fulfilled되면 **`then`안에 함수인자가 실행**

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

### `reject` 적용 (rejected)

```js
function p() {
  return new Promise((resolve, reject) => {
    /* pending */
    setTimeout(() => {
      reject(); // rejected
    }, 2000);
  });
}

p()
  .then(() => {
    console.log("2000ms후에 fulfilled 됩니다. 22");
  })
  .catch(() => {
    console.log("2000ms후에 rejected 됩니다.");
  });
```
Promise 객체가 rejected되는 시점에 **`catch`**안에 설정한 callback함수가 실행된다.

<br>

## 🔖 인자 전달

executor의 `resolve`함수를 실행할 때 인자를 넣어 실행하면, `then`의 callback 함수의 인자로 받을 수 있다.
```js
    resolve('hello');
    then((message) => {...})
```
결과를 전달하는 용도로 사용된다.

- `resolve`

```js
function p() {
  return new Promise((resolve, reject) => {
    /* pending */
    setTimeout(() => {
      resolve("hello Joy Fulfilled");
    }, 2000);
  });
}

p()
  .then((message) => {
    console.log("2000ms후에 fulfilled 됩니다.", message);
  })
  .catch(() => {
    console.log("2000ms후에 rejected 됩니다.");
  });
```
`resolve()`안에 넣은 인자가 `then`의 callback함수의 인자로 전달이 된다.

- `reject`

```js
function p() {
  return new Promise((resolve, reject) => {
    /* pending */
    setTimeout(() => {
      reject(new Error("Rejected Error Object"));
    }, 2000);
  });
}

p()
  .then((message) => {
    console.log("2000ms후에 fulfilled 됩니다.", message);
  })
  .catch((error) => {
    console.log("2000ms후에 rejected 됩니다.", error);
  });
```
보통 `reject` 함수를 실행하며 rejected 되는 이유를 넘긴다.  
표준 내장 객체인 `Error` 생성자를 이용해 `Error` 객체를 만든다.

<br>

## 🔖 `finally`

```js
function p() {
  return new Promise((resolve, reject) => {
    /* pending */
    setTimeout(() => {
      resolve(new Error("Rejected Error Object"));
    }, 2000);
  });
}

p()
  .then((message) => {
    console.log("2000ms후에 fulfilled 됩니다.", message);
  })
  .catch((error) => {
    console.log("2000ms후에 rejected 됩니다.", error);
  })
  .finally(() => {
    console.log("finally end");
  });
```
fulfilled or rejected 된 후에 최종적으로 실행할 것이 있다면
`finally()`를 설정, 함수를 인자로 넣는다.

<br>

## 🔖 chaining

callback hell
```js
function pChain() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

pChain()
  .then(() => {
    return pChain();
  })
  .then(() => pChain())
  .then(pChain)
  .then(() => {
    console.log("8000ms후에 chaining이 완료됩니다.");
  });
```
`then` 함수에서 다시 Promise 객체를 리턴하는 방법을 통해 chaining하면, 비동기 작업을 순차적으로 아래로 표현할 수 있다.  
위와 같이 `then`에 함수를 넣는 방식이 다양하다.

<br>

## 🔖 `Promise.resolve` / `Promise.reject`

value가 프로미스 객체인지 아닌지 알 수 없는 경우, 사용하면 연결된 `then` 메서드를 실행한다.

- value가 프로미스 객체면 > resolve된 then메서드 실행
- value가 프로미스 객체X > value를 인자로 보내면서 then 메서드를 실행

###  `Promise.resolve`

```js
Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise");
    }, 3000);
  })
).then((data) => {
  console.log("프로미스 객체인 경우, resolve된 결과를 받아 then이 실행", data);
});

// 위보다 먼저 실행된다.
Promise.resolve("Direct").then((data) => {
  console.log("프로미스 객체가 아닌 경우", data);
});
```
어떤 변수가 Promise인지 아닌지 알고 싶을 때 위와 같이 실행해보면 된다.

### `Promise.reject`

```js
Promise.reject(new Error("reason"))
  .then((error) => {})
  .catch((error) => {
    console.log(error);
  });
```
`Promise.reject` 를 사용하면, `catch`로 연결된 rejected상태로 변경
