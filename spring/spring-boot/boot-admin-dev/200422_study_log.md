> - 200422 study log
> - spring-boot, admin
> - MySQL, IntelliJ

<br>

## 🔖 1. **Pageable을 이용한 Paging 처리**


```java
// CrudInterface.java
    Header<List<Res>> search(Pageable pageable);

// CrudController.java
    @Override
    @GetMapping("")
    public Header<List<Res>> search(@PageableDefault(sort = "id", direction = Sort.Direction.ASC, size = 15) Pageable pageable) {
        return baseService.search(pageable);
    }
```
- `CrudInterface`와 `CrudController`에 위와 같이 메서드를 주입한다.
- `Pageable`은 `org.springframework.data.domain`에서 제공해주는 인터페이스다. 페이징 처리를 자동적으로 해준다.
- `@PageableDefault`를 통해 설정을 할 수 있다. (sort기준, 정렬기준, page size 등)

<br>

```java
// UserApiLogicService.java
    @Override
    public Header<List<UserApiResponse>> search(Pageable pageable){

        Page<User> users = baseRepository.findAll(pageable);
        
        List<UserApiResponse> userApiResponseList = users.stream()
                .map(this::response) // User -> UserApiResponse
                .collect(Collectors.toList());

        return Header.OK(userApiResponseList); // UserApiResponse -> Header
    }
```
- Service에서 실제 Pageable관련 business logic을 작성한다.
- 기존의 response 메서드의 return을 Header에서 Response로 바꾸었다.
- collect를 통해 각각의 user들을 userApiResponse 객체로 바꾸고 나서 하나의 List로 묶어준다.
- List로 묶은 UserApiResponse 객체들을 Header에 담아 return해준다.

