# javascript 비동기와 관련한 개념 흐름 정리

- `synchronous`: 동기방식, 작업이 순차적으로 진행됨
- `asynchronous`: 비동기방식, 선행 작업이 끝날때까지 기다리는 것이 아닌 바로 다음 작업을 수행(순차적X)

### javascript의 동기, 비동기

- javascript는 프론트에 빠르게 보여주기 위해 **비동기 처리방식**을 사용한다.  
(효율적인 작업 처리를 위해)
- 일반적으로 작성한 js 코드는 동기 방식으로 처리된다. 


> 비동기 방식으로 처리되는 작업을 동기방식으로 순차적으로 코드를 실행하려면 어떻게 해야될까.  
> 그 중 `callback` 방식이 있다.

<br>

## 🔖 callback 지옥

```js
function a() {
  setTimeout(() => {
    console.log('a');
  }, 1000);
}

function b() {
  console.log('b');
}
```
- 위와 같이 코드를 작성하면 `b 함수 > a 함수` 순으로 실행된다. (`setTimeout()`: 비동기 처리방식)
- 이를 순차적으로 `a > b` 순서로 작업을 진행하려면 `callback` 방식으로 표현할 수 있다.

```js
function a(callback) {
  setTimeout(function() {
    console.log('a');
    callback();
  }, 1000)
}

function b(callback) {
  setTimeout(function() {
    console.log('b');
    callback();
  }, 1000)
}

function c(callback) {
  setTimeout(function() {
    console.log('c');
    callback();
  }, 1000)
}

a(function() {
  b(function() {
    c()
  })
})
```
이런 `callback` 방식으로 순차적으로 메서드를 실행시킬 수 있다.  
그런데 이러한 함수가 10개만 돼도 코드가 얼마나 복잡해질까...   
(`callback hell`)

> 이러한 문제들을 해결하고자 ES6부터 `Promise` 객체가 등장

<br>

## 🔖 Promise 객체 리턴 활용

```js
function a() {
  return new Promise(resolve => {
    setTimeout(function() {
      console.log('a')
      resolve()
    }, 1000)
  });
}

function b() {
  return new Promise(resolve => {
    setTimeout(function() {
      console.log('b')
      resolve()
    }, 1000)
  });
}

function c() {
  console.log('c');
}

// then 함수를 이용해 순차적인 코드 흐름을 표현할 수 있다.
a()
  .then(() => {
    return b();
  })
  .then(() => {
    c();
  })
// 혹은
a()
  .then(() => b())
  .then(() => c());
```
- `Promise` 객체 return방식을 통해 이렇게 순차적인 코드를 구성할 수 있다.  
- callback 지옥보다는 가독성이 높다.

<br>

## 🔖 async await를 이용한 동기 표현

```js
async function asyncFunc() {
  await a();
  await b();
  await c(); // 여기서 c func도 Promise객체 return하는 방식으로 수정해야함
}
```
- 이런 식으로 `async`, `await`를 이용해 더 직관적인 코드를 만들 수 있다.
- 중요한 것은 `await`는 `async` function 안에서만 작동하기에 `async` function으로 감싸준다.

```js
a()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {});

async function asyncFunc() {
  try {
    const res = await a();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('done!');
  }
}
```
- 이런 식으로 `aysnc`, `await를` 사용하면 error catch에 대한 부분도 가독성있게 작성할 수 있다.
- java 처럼 코드 구조를 작성 가능
- 자세한 내용은 뒤에 참고