# 🍃 Thymeleaf
Thymeleaf is a modern server-side Java template engine for both web and standalone environments.(Web Site)  
Spring에서 밀고 있는 템플릿 엔진

> cagong-ranking-project에서 사용된 thymeleaf 용법을 중심으로 정리

- [**Thymeleaf DOC**](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)

## Setting (gradle)
```gradle
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect:2.4.1' // thymeleaf-layout
```

```java
//@RestController
@Controller
```
- You have to set @Controller annotation instead of @RestController

## 🏷️ Contents
- 🔗[Thymeleaf Layout](https://github.com/hanbinleejoy/daily-dev-log/blob/master/spring/spring-boot/thymeleaf/thymeleaf-layout.md)
- 🔗[Thymeleaf 용법](https://github.com/hanbinleejoy/daily-dev-log/blob/master/spring/spring-boot/thymeleaf/thymeleaf-usage.md)

## Issue
- [Fragment Expressions](https://github.com/thymeleaf/thymeleaf/issues/451)
- ["layout:decorate"](https://github.com/ultraq/thymeleaf-layout-dialect/issues/95)