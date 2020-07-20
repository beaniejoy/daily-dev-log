# Scheduling에 대한 프로젝트 적용

<br>

## Controller에 Scheduling 적용 (Java)

```java
@Scheduled(cron = "0 30 16 20 2,5,7,11 *", zone = "Asia/Seoul")
public ResponseEntity<String> bulkUpdate() 
        throws JsonParseException, JsonMappingException, IOException {
    //...
}
```
- 주기적으로 자동 실행하고 싶은 메서드에 `@Scheduled` annotation을 적용
- 그 전에 Spring Boot Container에 Scheduling 기능을 사용하겠다고 알려야 한다.

```java
@SpringBootApplication
@EnableScheduling
public class QuantApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuantApplication.class, args);
	}
}
```
- `@EnableScheduling`를 설정함으로써 Container에게 알려준다.

<br>

## Ubuntu Linux내 `crontab` 설정시 유의사항

linux OS에서 `crontab`을 통해 scheduling을 설정할 수 있다.

```cmd
$crontab -e (scheduling할 명령어 설정, vim형식)

$crontab -l (scheduling했던 설정 내용들 확인)
```

여기서 유의할 것은 `crontab -e` 명령어를 통해 설정하는 내용 중 directory path 설정하는 부분이다.  
상대경로가 아닌 **절대경로**를 기준으로 file path를 설정해야 한다.

```python
# jongmok_code = ExcelRead("./data/sangjang_jongmokCode.xlsx")
jongmok_code = ExcelRead("/home/ec2-user/app/diq/data/sangjang_jongmokCode.xlsx")
```
- `./data`로 설정하면 해당 디렉토리에서 python 명령을 통한 실행은 가능하지만 crontab상에서는 인식을 못한다.
- 절대경로로 설정해주어야 한다.