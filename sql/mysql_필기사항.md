# MySQL

MySQL 관련 필기사항

## ROWNUM 대체

Oracle에서는 `ROWNUM`(혹은 `ROW_NUMBER()` 함수)으로 select 결과 데이터들에 고유넘버를 부여할 수 있다.  
하지만 MySQL에서는 이러한 기능이 없어서 따로 지정해주어야 한다.  
그 때 쓰이는 것이 `@ROWNUM := 0` 지정

```sql
SELECT * 
FROM (SELECT @ROWNUM:=@ROWNUM+1 NUM, N.* 
        FROM (SELECT * FROM NOTICE WHERE TITLE LIKE '%') N, (SELECT @ROWNUM := 0) TMP 
        ORDER BY REGDATE DESC) SUB
WHERE SUB.NUM BETWEEN 1 AND 10;
```

