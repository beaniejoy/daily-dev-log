# 두서 없이 기록하는 Javascript method


```js
window.location.href; // 현재 url 주소값을 return해준다.

var url = "[url 주소]";
location.href = url; // 해당 url주소로 이동시켜준다. 
```


```js
window.alert("브라우저에서 알림창을 만들어 줍니다.");

let value = window.prompt("1 ~ 100 사이의 정수를 입력하세요", 0);
console.log(typeof(value)); // string
let a = Number(value);
let b = parseInt(value);
console.log(typeof(a)); // number
console.log(typeof(b)); // number
```

<br>

## 🔖 DOM select 관련

```javascript
document.getElementById('id_name'); // Node 하나
document.getElementsByClassName('class_name'); // Node List로 반환

//HTML5
document.querySelector('CSS의 selector');
document.querySelectorAll('CSS의 selector'); // NodeList 형태로 가져온다.
```
- `jQuery`를 사용하면 element 선택하는 코드가 짧아진다.


```javascript
let element = document.getElementById('id_name');

element.setAttribute('id', 'activeBack'); // id에 activeBack 추가하기
element.setAttribute('style', 'background-color: #6F4E37;'); // style attr의 css설정 추가
element.setAttribute('class', 'bg-dark'); // class에 bg-dark 추가하기


element.removeAttribute('id'); // id 값 삭제
```

<br>

## 🔖 `event.preventDefault()`, `event.stopPropagation()`

```js
// 태그객체 고유의 이벤트를 제한
event.preventDefault();
// 상위 엘리먼트에 이벤트 전파 제한
event.stopPropagation();
```

- [e.preventDefault() 와 stopPropagation() 의 차이](https://pa-pico.tistory.com/20)