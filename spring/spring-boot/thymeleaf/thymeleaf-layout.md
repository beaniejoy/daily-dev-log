# Thymeleaf Layout

## Making layout.html
> html 코드마다 공통된 부분이 존재한다. 그 중 head정보와 header, footer와 같은 tag들이 그렇다.  
> 이러한 코드들의 중복성을 제거하고자 할 때 layout을 사용하면 상당히 좋다.


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

> - footer.html, header.html, head.html > layout.html 
> - layout.html가 일종의 template역할을 한다.


