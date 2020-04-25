> - 200425 study log
> - Vue.js

<br>

## 🔖 **1. 컴퍼넌트를 사용한 작성방법**

> - 컴퍼넌트는 부분의 개념, 부분을 사용/재사용 할 때 컴퍼넌트 개념을 사용
> - 우리가 사용하는 대부분의 웹사이트들은 컴퍼넌트 구조로 되어있다.
> - 예를 들어 각 웹사이트에 들어가는 header 정보들, 그리고 그 안에 들어가는 logo, dropdown menu, search bar도 전부 Component라 할 수 있다.
> - Component들은 중복이되는 것들도 존재한다. (예를 들어 dropdown menu에서 글자만 다르고 형식과 디자인은 전부 같다.)
> - **이러한 중복되는 Component를 template형태로 관리해서 사용하고자 할 때 그 때 그 때 불러내기만 한다면 편리할 것이다.**
> - 이를 Vue에서 관리해준다.
> - [해당링크](https://kr.vuejs.org/v2/guide/index.html#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%9E%91%EC%84%B1%EB%B0%A9%EB%B2%95)


```html
<div id="app-7">
  <ol>
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```
```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
```
- `Vue.component([component name], 속성값들)` 이런 형식으로 사용자 정의 Component 구성 가능
- 여기서 정의한 component name은 html에서 사용자 정의 tag로 사용한다. (`todo-item` 사용자 정의 tag)
- `props: ['todo']` 에서 `todo-item` component내에 todo라는 사용자 정의 객체를 지정할 수 있다.
- `v-bind:todo`를 통해 todo에 원하는 객체를 지정할 수 있다.
- 해당 component에 `template`에서 지정해준 요소들을 집어 넣는다.
- **일반적인 앱과 사용자 정의 component(`todo-item`)로 쪼개서 사용할 수 있다.**

<br>

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```
- 부모 앱에 영향을 주지 않고 관리 가능
- 분리가 되어서 관리가 용이해진다. 체계적으로 통제가 가능해진다.
- 가독성이 높아진다. (component는 `-`으로 구분해준다.)

<br>



```html
```


```js
```