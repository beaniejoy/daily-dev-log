# Thymeleaf Usage

> thymeleaf은 여러 template 문법들을 가지고 서버에서 보내준 데이터를 이용할 수 있다.

<br>

## Selected Object: `th:object`

```html
<div>
    <p>Name: <span th:text="${session.user.firstName}">Sebastian</span>.</p>
    <p>Surname: <span th:text="${session.user.lastName}">Pepper</span>.</p>
    <p>Nationality: <span th:text="${session.user.nationality}">Saturn</span>.</p>
</div>

<div th:object="${session.user}">
    <p>Name: <span th:text="*{firstName}">Sebastian</span>.</p>
    <p>Surname: <span th:text="*{lastName}">Pepper</span>.</p>
    <p>Nationality: <span th:text="*{nationality}">Saturn</span>.</p>
</div>
```
- 위의 방식과 아래 방식이 같은 결과값을 내보낸다.
- selected object를 통해 변수명을 가지고 직접 접근할 수 있다. 이때 `*`를 사용해야 한다.
- `${#object.firstName}` 이런식으로 `#object`를 사용할 수도 있다.

<br>

```html
<div>
  <p>Name: <span th:text="*{session.user.name}">Sebastian</span>.</p>
  <p>Surname: <span th:text="*{session.user.surname}">Pepper</span>.</p>
  <p>Nationality: <span th:text="*{session.user.nationality}">Saturn</span>.</p>
</div>
```
- 위 처럼 object selection이 없으면 `$`대신 `*`를 사용해도 된다.

<br>

[th:object에 대한 thymeleaf docs](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#expressions-on-selections-asterisk-syntax)

<br>

## Iteration: `th:each`

```html
<tr th:each="prod : ${prods}">
    <td th:text="${prod.name}">Onions</td>
    <td th:text="${prod.price}">2.41</td>
    <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>
```
- `th:each`를 이용해 iteration을 표현할 수 있다.

<br>

[th:each에 대한 thymeleaf docs](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#iteration)

<br>

### `#number.sequence`

```html
<li class="page-item" th:each="num : ${#numbers.sequence(0, 3)}">
</li>
```
- 이런 식으로 단순 반복 처리를 할 수 있다.
- 0부터 3까지 반복을 진행한다. (총 4번)

### 반복 상태 변수(Status)

> Status에 대한 속성값들
> - index: 현재 인덱스 number(0부터 시작)
> - count: 현재 인덱스 number(1부터 시작)
> - size: 총 요소 개수
> - current: 현재 요소
> - even: 현재 반복이 짝수인지에 대한 여부, boolean
> - odd: 현재 반복이 홀수인지에 대한 여부, boolean
> - first: 현재 반복이 처음인지에 대한 여부, boolean
> - last: 현재 반복이 마지막인지에 대한 여부, boolean
  
<br>

```html
<div th:each="num, numStat : ${#number.sequence(5,10)}">
    <!-- content -->
</div>
```
- numStat은 생략해도 된다. `지정한 변수명 + Stat`으로 자동 지정이 된다.
- numStat을 통해 위의 내용을 사용할 수 있다.

<br>

[Status에 대한 참고](https://ifuwanna.tistory.com/200)

<br>

## Attribute: `th:href`, `th:src`

```html
<a class="page-link"
    th:href="@{/cafes/search(page=${num + startNum})}"
    th:text="${num + startNum + 1}">
</a>
```
- `@{}` format을 이용해 원하는 path를 지정할 수 있다.
- 마지막에 `(parameter)` 에서 parameter들에 대한 값을 지정할 수 있다.