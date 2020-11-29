# 바인딩(Binding)

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
