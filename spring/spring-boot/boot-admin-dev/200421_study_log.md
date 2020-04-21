> - 200421 study log
> - spring-boot, admin
> - MySQL, IntelliJ

<br>

## 🔖 1. **추상화를 통해 Service Refactoring**

```java
// BaseService
@Component
public abstract class BaseService<Req, Res, Entity> implements CrudInterface<Req, Res> {

    @Autowired(required = false)
    protected JpaRepository<Entity, Long> baseRepository;

}
```
- `@Autowired`를 위해 `@Component` 설정
- repository들의 interface인 `JpaRepository`로 묶을 수 있다.
- 이를 이용해 선언하고 Autowired를 통해 실제 구현된 repository를 주입받는다.
- `required = false`를 통해 필수로 가져오는 것이 아님을 설정한다.

<br>

```java
@Service
public class ItemApiLogicService extends BaseService<ItemApiRequest, ItemApiResponse, Item> {
    
    // 실제 CRUD 구현

}
```
- 이런식으로 BaseService를 상속받아서 실제 CRUD Business Logic을 구현하면 된다.
- baseRepository를 이용하면 Generic으로 받았던 Item을 주입시켰기 때문에 ItemRepository가 주입이 된다.

<br>

```java
@Component
public abstract class CrudController<Req, Res, Entity> implements CrudInterface<Req, Res> {

    @Autowired(required = false)
    protected BaseService<Req, Res, Entity> baseService;

}
```
- CrudController에서 BaseService에 대한 type을 변경해주어야 한다.

<br>

