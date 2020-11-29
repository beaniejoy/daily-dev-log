# 선언적 랜더링(Declarative Rendering)

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

## 반응형

- viewport가 늘어나거나 줄어들 때 그 안의 layout이 따라서 변화하는 그런 반응형(ex 반응형 웹,앱)의 뜻으로 쓰인 것은 아님
- 여기서는 javascript의 특정한 데이터를 변경하면 그것이 자동적으로 화면에 같이 렌더링되는 것을 반응한다라 해서 반응형이라 표현  
- **"데이터를 바꾸면 화면도 자동적으로 갱신된다."** 는 것이 반응형

<br>

## 텍스트 보간

- {{message}}이 안에 특정한 내용을 집어넣는 것을 일컫는다.
