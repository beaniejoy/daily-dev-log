> - 200422 study log
> - spring-boot, admin
> - MySQL, IntelliJ

<br>

## 🔖 1. **Header에 page 관련 정보 담아서 전달하기**

```java
    @Override
    public Header<List<UserApiResponse>> search(Pageable pageable){

        Page<User> users = baseRepository.findAll(pageable);

        List<UserApiResponse> userApiResponseList = users.stream()
                .map(this::response)
                .collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(users.getTotalPages())
                .totalElements(users.getTotalElements())
                .currentPage(users.getNumber())
                .currentElements(users.getNumberOfElements())
                .build();

        return Header.OK(userApiResponseList, pagination);
    }
```
- Header 객체에 pagination과 해당 Response 데이터 리스트를 묶는다.
- 이런식으로 page정보와 user 데이터들을 담아서 보내줄 수 있다.


