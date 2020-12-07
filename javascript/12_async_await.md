# async, await

<br>

## 🔖 `async`, `await`의 기본 사용법

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

// Promise 객체를 이용해서 비동기 로직을 수행할 때
p(1000).then((ms) => {
  console.log(`${ms}ms 후에 실행됨`);
});

// SyntaxError: await is only valid in async function
const ms = await p(1000);
```
- `await`는 `async` function 안에서 실행해야 한다.

```js
(async function main() {
  const ms = await p(1000);
  console.log(`${ms}ms 후에 실행됨`);
})();
```
- `async`를 지정하면 해당 main function 안에 있는 코드가 실행완료 될 때까지 프로그램이 종료가 되지 않는다.
- 비동기적인 처리가 끝날 때까지 다음 줄로 안넘어간다. (`await`)
- 이렇게 하면 위에 아래로 흐르는 코드 흐름으로 표현할 수 있게 된다.

<br>

## 🔖 `reject()` > `try` ~ `catch`

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("p1 reject"));
    }, ms);
  });
}

// reject되면 catch로 간다.
(async function main() {
  try {
    const ms = await p(1000);
    console.log(`${ms}ms 후에 실행됨`);
  } catch (error) {
    console.log(error);
  }
})();
```
`Promise` 객체가 rejected된 경우의 처리를 위해 `try` ~ `catch`를 이용한다.

<br>

## 🔖 `async` function 특징

```js
async function asyncP() {
  return "Joy";
}

(async function main() {
  try {
    // Promise.resolve를 통해 resolve된다.
    const name = await asyncP();
    console.log(name);
  } catch (error) {
    console.log(error);
  }
})();
```
`async` function 에서 return 되는 값은 `Promise.resolve` 함수로 감싸서 리턴된다.

<br>

## 🔖 `async` function 내 `await` 사용

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

// async 안에 또 await를 넣어줄 수 있다.
async function asyncP() {
  const ms = await p(2000);
  return "JoyBeanie";
}

(async function main() {
  try {
    const name = await asyncP();
    console.log(name);
  } catch (error) {
    console.log(error);
  }
})();
```

<br>

## 🔖 error throw

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("p reject")); // reject 발생
    }, ms);
  });
}

async function asyncP() {
  const ms = await p(3000); // 여기서 throw가 알아서 발생
  return "JoyBeanie";
}

(async function main() {
  try {
    const name = await asyncP(); // 여기서 throw된 error를 잡아낸다.
    console.log(name);
  } catch (error) {
    console.log(error);
  }
})();
```

<br>

## 🔖 finally

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("p reject"));
    }, ms);
  });
}

async function asyncP4() {
  const ms = await p(3000); // 여기서 throw가 알아서 발생
  return "JoyBeanie";
}

(async function main() {
  try {
    const name = await asyncP();
    console.log(name);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally end"); // 
  }
})();
```
fulfilled, rejected 상관없이 다 실행하고 맨마지막에 `finally` 실행

<br>

## 🔖 chaining 비교

```js
function pTmp(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}
```

### `Promise` chaining

```js
// - Promise
pTmp(1000)
  .then(() => pTmp(3000))
  .then(() => pTmp(1000))
  .then(() => {
    console.log("promise 5000ms후에 실행");
  });
```

### `async`, `await` chaining

```js
(async function main() {
  await pTmp(1000);
  await pTmp(3000);
  await pTmp(1000);
  console.log('async await 5000ms후에 실행');
})(); // 가독성이 좋다.
```
`Promise`보다 `async`, `await`를 통한 chaining이 가독성이 좋다.

<br>

## 🔖 복수의 Promise 처리

```js
// Promise.all
(async function main(){
  const results = await Promise.all([pTmp(5000), pTmp(6000), pTmp(7000)]);
  console.log(results);
})();

// Promise.race
(async function main(){
  const result = await Promise.race([pTmp(7000), pTmp(8000), pTmp(9000)]);
  console.log(result);
})();
```