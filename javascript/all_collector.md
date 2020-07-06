# 두서 없이 기록하는 Javascript method


```javascript
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

## DOM select 관련
```javascript
document.getElementById('id_name');
document.getElementByClassName('class_name');
```


```javascript
let element = document.getElementById('id_name');

element.setAttribute('id', 'activeBack'); // id에 activeBack 추가하기
element.setAttribute('style', 'background-color: #6F4E37;'); // style attr의 css설정 추가
element.setAttribute('class', 'bg-dark'); // class에 bg-dark 추가하기


element.removeAttribute('id'); // id 값 삭제
```



```javascript

```