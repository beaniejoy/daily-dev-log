> - spring-boot, admin
> - MySQL, IntelliJ
> - Error Handling

<br>

## 🔖 1. Test에서 `@Slf4j`가 적용이 안될 때

```gradle
testCompileOnly 'org.projectlombok:lombok'
testAnnotationProcessor 'org.projectlombok:lombok'
```
위 두 개의 설정을 넣어주고 reimport gradle project 하면 된다.



