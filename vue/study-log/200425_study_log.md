> - 200425 study log
> - Vue.js

<br>

## 🔖 1. **선언적 렌더링**

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


### 바인딩(binding)

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
