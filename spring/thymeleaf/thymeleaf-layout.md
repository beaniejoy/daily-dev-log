# Thymeleaf Layout

> html 코드마다 공통된 부분이 존재한다. 그 중 head정보와 header, footer와 같은 tag들이 그렇다.  
> 이러한 정보들은 여러 html 파일에서 중복이 되기 때문에 **중복성의 문제**가 발생한다.
> JSP에서는 include로 part를 나누어 사용할 수 있다.
> thymeleaf도 이와 같은 기능을 하는 라이브러리가 존재하는데 layout이 그렇다.


## Making "layout.html"
### 목표
- layout.html을 기본 template으로 만든다.
- template을 만들어 다른 html 파일에서는 각기 다른 content에 집중할 수 있도록 한다.
- 여러 방법이 존재한다: replace, insert, include 등등 (여기서는 insert 사용)

```html
<!-- head.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head th:fragment="head-setup">
   <!-- meta tag -->
   <!-- css, javascript file you want to include -->
</head>
```
meta 정보들과 css, javascript 외부파일, bootstrap, jQuery 등 url주소를 가져오는 fragment

```html
<!-- header.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<header th:fragment="header-frag">
    <!-- navbar -->
    <!-- header tag -->
</header>
```
header tag에 넣고 싶은 내용을 넣는 곳

```html
<!-- footer.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<footer th:fragment="footer-frag">
    <!-- footer start -->
    <div class="bg-dark bd-footer"
         style="color: white; padding: 1em; margin-top: 1em;">
        <div class="container-fluid text-center">
            <p>Copyright Beanie / 2020 04 10</p>
        </div>
    </div>
    <!-- footer end -->
</footer>
```
footer 정보들을 넣는 곳  

위의 fragment들을 구성하고 아래의 layout.html에 insert로 넣어준다.
```html
<!-- layout.html -->
<!doctype html>
<html xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout">

<head th:insert="~{common/head :: head-setup}">
    <title>카공도르</title>
    <!--    meta tag & CSS Setting-->
</head>

<body>
<!-- main page에서 전체 background-img 정하기 위해 div로 전체를 감싼 것-->
<div>
    <!--    header part setting-->
    <header th:insert="~{common/header :: header-frag}"></header>
    <!--    content-->
    <section layout:fragment="content"></section>

    <!--    footer part setting-->
    <footer th:insert="~{common/footer :: footer-frag}"></footer>

</div>

</body>
</html>
```
기본 뼈대가 되는 layout.html  
```html
<section layout:fragment="content"></section>
```
이 부분은 다른 파일들의 내용이 들어가는 부분이다.  
즉 layout에는 모든 페이지에 중복되는 부분들을 넣는 곳이라 생각하면 된다.

- "footer.html", "header.html", "head.html" → **"layout.html"** 
- **"layout.html"**이 일종의 template역할을 한다.
      
  
  
## "layout.html"을 이용해 다른 html 파일에 적용하기

- 위에서 만든 layout 파일을 가지고 실제 content를 포함하는 html파일에 적용
- 여기서 "layout:fragment"를 이용해 위에 layout.html에서 지정해두었던 곳과 합쳐짐

```html
<!-- view.html 상단 -->
<!doctype html>
<html lang="ko"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="common/layout">
```
- html tag attribute 설정시 **"layout:decorator" → "layout:decorate"** 로 권장
- [관련 링크 참고](https://github.com/ultraq/thymeleaf-layout-dialect/issues/95)

```html
<!-- view.html 하단 -->
<section layout:fragment="content">
    <!-- view.html에 해당하는 content 적용 -->
</section>

</html>
```
layout:fragment="content"를 통해 위의 layout 파일 내의 content부분과 연결이 됨  

- 이런 식으로 jsp include보다도 더 세세하게 fragment를 지정해 합칠 수 있다.  
- 코드 리팩토링 때 이러한 문법을 알고 접근하면 훨씬 효율적이고 가독성 높은 코드를 완성할 수 있을 것 같다.
