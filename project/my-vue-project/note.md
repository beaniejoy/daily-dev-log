#  Vue Prototype Project

- slot에 들어가는 사용자 정의 컴퍼넌트가 먼저 `mounted` 되는 것

## Naver Maps API 사용

- Naver Map > Vuex state에 적용 X
- Naver Map 객체들을 vuex에서 정의하는 것보다 각 컴퍼넌트 내부 `data`, `methods`에 정의하는 것이 좋다.

## Naver addEventListener

- Vue Component와 addEventListener callback에서 사용하는 구역과 컴퍼넌트 생성시점 차이 존재(?)

```js
// 이런 식으로 하면 this는 null인 상태로 주입이 된다.
const clickEvent = naver.maps.Event.addListener(this.map, 'click', () =>
  this.$emit('clickedMap', 'hello world clickedMap!!')
)

// 미리 this를 다른 변수에 지정해두고
// callback안에 주입
const vue = this
const clickEvent = naver.maps.Event.addListener(this.map, 'click', () =>
  vue.$emit('clickedMap', 'hello world clickedMap!!')
)
```
먼저 Vue Component가 생성이 된 후에 그것을 addListener callback함수에 주입하면 정상적으로 작동한다.  
이런 식으로 Naver Maps API에서 제공하는 addListener에 Vue Component를 주입해서 Vue를 컨트롤할 수 있다.