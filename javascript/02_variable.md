

## 🔖 Variable


### ▶ var
- var의 유효 범위: **함수 scope**
- ES5까지 var를 사용하다가 ES6부터 **const, let**을 사용  
함수 스코프보다 블럭 스코프가 더 직관적이고 보기 좋기 때문에
- function() { }

```javascript
var a = 0;
// 함수를 작성하고 바로 실행하는 즉시 실행 함수
(function(){
    console.log(a);    
})();
console.log(a);

(function(){
    var b = 0;
    console.log(b);
})();
// console.log(b); 여기서 에러
```

### ▶ const & let
### const
- **constant(상수) 선언 및 할당: const**
- 상수는 선언과 동시에 할당을 해주어야 함
```javascript
const [name]; // SyntaxError: Missing initializer in const declaration 선언만 하면 에러 발생
const [name] = value; // 상수를 선언하면서 바로 값을 할당
```
```javascript
const sum = 5 + 10;

if (sum % 3 === 0) {
    console.log('3으로 나누어 떨어짐');
}

if (sum % 5 === 0) {
    console.log('5로 나누어 떨어짐');
}
```
- const선언된 상수는 한번만 할당가능
- 이미 할당된 constant에 다른 값을 할당하려고 하면 에러 발생
```javascript
sum = 11; // TypeError: Assignment to constant variable. 에러 발생
console.log(sum);
```

### let
- let은 변수에 대한 선언을 함
- 선언과 할당을 따로 해줘도 상관 없음
```javascript
let [name]; // let은 선언만 하고 뒤에 할당해주어도 에러 발생X
let [name] = value; // 상수를 선언하면서 바로 값을 할당
```
```javascript
let result;
result = false;
if (result === false) {
    console.log(result);
    result = true;
}

console.log(result);
```

## 🔖 Scope of Variables
- const, let의 유효범위: **block scope {}**
```javascript
{
    //
    const name = "Beanie";
    console.log(name);
}
// console.log(name); ReferenceError 반환
```
- block 내부에서만 유효
- block 밖에서 선언은 안에서나 밖에서나 유효
```javascript 
let age = 37; // block 밖에서 선언 할당
{
    age++;
    console.log(age); // 38
}
console.log(age); // 38

// 중첩
{
    {
        let temp = "Good";
        {
            console.log(temp);
        }
    }
    // console.log(temp); 여기서는 에러
}
```
- 조건문과 반복문에서도 block scope가 적용된다.
- **var의 function scope와 const, let의 block scope 차이 존재 (ES6부터는 block scope중시)**

<br>

```js
var c = 0;
{
    c++;
    console.log(c);
}

{
    var d = 0;
    console.log(d);
}
d++;
console.log(d); // 가능
```
- const, let은 불가능했지만 var는 가능
- var는 함수 scope에 따라서 움직이기 때문