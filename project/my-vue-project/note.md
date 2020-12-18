#  Vue Prototype Project

- slot에 들어가는 사용자 정의 컴퍼넌트가 먼저 `mounted` 되는 것

<br>

## Naver Maps API 사용

- Naver Map > `Vuex` state에 적용 X
- Naver Map 객체들을 vuex에서 정의하는 것보다 각 컴퍼넌트 내부 `data`, `methods`에 정의하는 것이 좋다.

## Naver addEventListener

- Vue Component와 `addListener` callback에서 사용하는 구역과 컴퍼넌트 생성시점 차이 존재(?)

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
먼저 Vue Component가 생성이 된 후에 그것을 `addListener` callback함수에 주입하면 정상적으로 작동한다.  
이런 식으로 Naver Maps API에서 제공하는 `addListener`에 Vue Component를 주입해서 Vue를 컨트롤할 수 있다.

<br>

## Vuetify Overlay & Naver Maps 연결하기

- InfoWindow click event 발생시 >> Vuetify 제공하는 Overlay On
- `Vuex` 이용한 overlay on & off 관리

```js
// InfoWindow.vue
<div
  ref="content"
  class="bg-white hidden rounded info-window shadow-2xl"
  @click="showDetailOverlay"
>

...

// naverApp.js
mutations: {
  ...
  // click infoWindow event >> show detail overlay
  showDetailOverlay(state) {
    state.overlay = true
  },
  ...
},
```
- InfoWindow 클릭시 state에 overlay `false` >> `true`
- 이를 가지고 `Overlay.vue`에 직접 적용

<br>

## Main Map 페이지 랜더링할 때 문제 해결

- Child Component가 먼저 만들어지고 등록이 되기에 main page 들어갈 때 InfoWindow가 먼저 보여지는 현상 발생
- 이를 해결하기 위해 해당 컴퍼넌트를 안보이게 했다가 약간의 시간을 주고 랜더링 완료됐을 때 보여지게끔 구성
- `v-show`, `Vuex`, `vue.$nextTick` 사용

```js
this.temp = !this.temp // data 내용 변경시 vue update 사이클 발생

// update 사이클 완료 후 안에 callback 함수 동작
this.$nextTick(() => {
  console.log(`##### Complete!!!`)
  setTimeout(() => {
    this.$store.commit('naverMap/setRenderOn')
  }, 2000) // 임의로 2초 로딩시간을 부여
})
```