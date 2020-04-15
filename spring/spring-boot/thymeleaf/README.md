# 🍃 Thymeleaf

> cagong-ranking-project에서 사용된 thymeleaf 용법을 중심으로 정리

- [**Thymeleaf DOC**](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)

## Update

- [Fragment Expressions](https://github.com/thymeleaf/thymeleaf/issues/451)
- [layout:decorate](https://github.com/ultraq/thymeleaf-layout-dialect/issues/95)

## Setting
```gradle
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'

// thymeleaf-layout
implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect:2.4.1'
```

```java
//@RestController
@Controller
```
- You have to set @Controller annotation instead of @RestController

## 🏷️ Contents
- Thymeleaf Layout
- Thymeleaf 용법
