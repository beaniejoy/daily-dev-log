# Error log

> 프로젝트 도중 마주한 Error들을 기록하는 공간

## Naver Maps 관련 Object와 Vuex 연동

```js
state: () => ({
    ...,
    markers: []
  }),
```
`Vuex`에 위와 같이 naver.maps.Marker 객체를 넣으려고 하면 아래와 같은 에러 발생
```console
Error in v-on handler: "RangeError: Maximum call stack size exceeded"
```
- 아직 원인은 명확히 모르는 상황
- Marker 뿐만 아니라 Naver에서 제공하는 Maps API 관련 Object 다 해당
- `Vuex`로 Naver Object를 지정하면 계속 순환 참조를 하게 되는거 같다.
