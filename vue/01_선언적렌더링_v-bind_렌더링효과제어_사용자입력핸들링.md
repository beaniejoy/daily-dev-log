> - 200425 study log
> - Vue.js

<br>

## 🔖 **1. 선언적 렌더링**

```html
<div id="app">
  {{ message }}
</div>
```
```javascript
var app = new Vue({
  el: '#app',
  data: {
    message: '안녕하세요 Vue!'
  }
})
```
- `{{message}}`: 템플릿 문법
- message라는 특정한 데이터를 html의 특정한 영역에 띄우겠다. -> 선언적 렌더링

<br>

### 반응형

- viewport가 늘어나거나 줄어들 때 그 안의 layout이 따라서 변화하는 그런 반응형(ex 반응형 웹,앱)의 뜻으로 쓰인 것은 아님
- 여기서는 javascript의 특정한 데이터를 변경하면 그것이 자동적으로 화면에 같이 렌더링되는 것을 반응한다라 해서 반응형이라 표현  
- **"데이터를 바꾸면 화면도 자동적으로 갱신된다."** 는 것이 반응형

### 텍스트 보간

- {{message}}이 안에 특정한 내용을 집어넣는 것을 일컫는다.

<br>


## 🔖 **2. `v-bind` 바인딩(binding)**

- 텍스트 보간이 아닌 다른 방식으로 선언한 데이터를 화면과 묶을 수 있다. (binding)
- jQuery를 사용했을 때는 html의 요소들을 직접 제어했다. 이렇다보니 속도가 좋지 않았다. 
- Vue는 html의 요소를 제어하기 위해 사용하는 것이 아닌 데이터를 제어하고 그것이 화면이 자동적으로 구성이 되는 방식이다.
- Vue는 데이터에 특화되어 있고 데이터를 가지고 화면을 구성한다.

```html
<div id="app-2">
  <span v-bind:title="message">
    내 위에 잠시 마우스를 올리면 동적으로 바인딩 된 title을 볼 수 있습니다!
  </span>
</div>
```
```javascript
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다'
  }
})
```
- `v-bind`: 디렉티브 
- `v-`: Vue에서 제공하는 특수 속성임을 알리는 접두어

<br>

```html
<div id="app">
  <div class="text" v-bind:class="{'active': active}">
    {{message}}
  </div>
</div>
```
```javascript
const vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello World!',
    active: false
  }
})
```
- 이런식으로도 binding 사용 가능
- `active`를 class에 추가하려는데 active의 값이 true일 때만 적용하겠다.
- `'active': true` 이런 형태로 적용, active라는 className을 통해 css 적용할 수 있다.

<br>

## 🔖 **3. 데이터를 통한 렌더링 효과 제어(transition, animation효과 적용가능)**


### `v-if` 조건식

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

### `v-for` 반복문


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
- 이런식으로 data list를 `v-for` directive를 통해 렌더링할 수 있다.

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


<br>

## 🔖 **4. 사용자 입력 핸들링**

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
    toggleElement(){
      this.toggle = !this.toggle
    }
  }
})
```
- vue에서 정의한 method `toggleElement`를 통해 toggle 데이터 value 값을 반대로 뒤집는다.
- `button` 태그 뿐만 아니라 `div` 태그에서 `v-on`을 이용해 event handling할 수 있다.
- `v-model`을 통해 입력한 value를 box안에 바로바로 넣는다.
- `toggleElement() {}` 은 `toggleElement: function() {}` 을 줄인 방식이다.

