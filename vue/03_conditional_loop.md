# 조건문, 반복문 사용


## `v-if` 조건식

```html
<div id="app-3">
  <p v-if="seen">이제 나를 볼 수 있어요</p>
</div>
```
```javascript
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```
- seen의 true라는 데이터 값을 이용해 p태그를 렌더링할지 말지를 결정할 수 있다.
- 이를 이용해 `transition 효과`를 적용할 수 있다. (css에서 하는 것처럼 전과 후가 다르게 보여주는 문법)
- animation효과를 데이터의 값을 가지고도 제어할 수 있다.

```html
<div id="app">
  <div v-if="message">
    {{message}} ~~
  </div>
</div>
```

```javascript
const vm = new Vue({
  el: '#app',
  data: {
    message: '',
    show: false
  }
})
```
- 이런 식으로 message가 빈 문자열일 때 javascript에서 falsy한 값을 도출하는 것을 이용할 수 있다.
- {{message}} 뿐만 아니라 ~~ 까지 없어진다.

<br>

## `v-for` 반복문


```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```
```javascript
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'JavaScript 배우기' },
      { text: 'Vue 배우기' },
      { text: '무언가 멋진 것을 만들기' }
    ]
  }
})
```
이런식으로 data list를 `v-for` directive를 통해 렌더링할 수 있다.

<br>

```html
<div id="app">
  <ul>
    <li v-for="item in items"
        v-bind:key="item.id">
      {{item.message}}
    </li>
  </ul>
</div>
```
```javascript
const vm = new Vue({
  el: '#app',
  data: {
    items:[
      {
        id: '1',
        message: 'hello world'
      },
      {
        id: '2',
        message:'hello joy'
      },
      {
        id: '3',
        message:'hello beanie'
      }
    ]
  }
})
```
- **`v-for` directive는 반드시 `v-bind:key` directive와 같이 사용해야한다.**
- 각각의 요소에 대해 고유의 key를 설정해야 중복되지 않고 정의할 수 있다.
- key에 해당하는 value는 반드시 중복되지 않는 고유의 값이어야 한다.