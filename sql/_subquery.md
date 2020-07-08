# SubQuery

```sql
SELECT  -- main query, outer query
FROM
WHERE ...  (SELECT ...
            FROM ...
            WHERE ...); -- subquery, nested query, inner query
```
- main query와 subquery로 나뉨

<br>

```sql
SELECT      (subquery)
FROM        (subquery)
[WHERE]     (subquery)
[GROUP BY]  
[HAVING]    (subquery)
[ORDER BY]  (subquery)
```
- subquery: `WHERE`, `FROM`, `HAVING`, `SELECT`, `ORDER BY` 에 정의 가능
- `WHERE`절에 많이 사용하는 편이다.

<br>

- single row subquery는 single row subquery operator와 함께 ...
  - subquery가 where절에 선언될때 single row subquery는 `=`, `>`, `>=`, `<`, `<=`, `<>`, `!=` 연산자와 함께 선언됩니다.
- multiple row subquery는 multiple row subquery operator와 함께...
  - multiple row subquery인 경우에는 `in`, `any`, `all` 연산자와 함께 선언됩니다.

### Co-Related Subquery (상관관계 subquery)

```sql
SELECT
FROM table1 a
WHERE ...  (SELECT ...
            FROM table2
            WHERE a.col = col);
```
- table1의 col의 개수만큼 subquery가 반복 수행된다.

## 🔖 
