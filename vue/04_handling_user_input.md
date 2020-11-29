# 사용자 입력 핸들링

> - 데이터의 value만으로 사용자가 원하는 방식으로 event를 handling할 수 있다.
> - 기존의 jQuery에서는 직접 DOM객체 요소에 접근해 event를 제어했던 것과 다르게 빠르고 효율적으로 진행 가능

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">메시지 뒤집기</button>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: '안녕하세요! Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```
- `v-on` directive를 이용해 click이라는 event에 대해서 handling을 한다.
- 여기서는 **`단방향`** 관계라고 할 수 있다. (message 데이터가 html에 출력되는 형태만 가능)

<br>

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: '안녕하세요 Vue!'
  }
})
```
- `v-model`을 이용하면 **`양방향`**이 가능해진다.
- message라는 이름의 데이터에다가 input 입력한 value로 덮어 씌우겠다는 의미다.

<br>

```html
<div id="app">
  <div class="box" 
       v-bind:class="{active: toggle}"
       v-on:click="toggleElement">
    {{message}}
  </div>
  <button v-on:click="toggleElement">Toggle</button>
  <input type="text" v-model="message">
</div>
```

```css
.box {
  width: 150px;
  height: 150px;
  background: royalblue;
  border-radius: 10px;
  cursor: pointer;
  transition: 1s;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box.active {
  width: 400px;
  background: red;
}
```
- css에서 `.box`와 `.box.active`에 대해서 정의해준다.

```js
const vm = new Vue({
  el: '#app',
  data: {
    toggle: false,
    message: ''
  },
  methods: {
    toggleElement () {
      this.toggle = !this.toggle
    }
  }
})
```
- vue에서 정의한 method `toggleElement`를 통해 toggle 데이터 value 값을 반대로 뒤집는다.
- `button` 태그 뿐만 아니라 `div` 태그에서 `v-on`을 이용해 event handling할 수 있다.
- `v-model`을 통해 입력한 value를 box안에 바로바로 넣는다.
- `toggleElement() {}` 은 `toggleElement: function() {}` 을 줄인 방식이다.

