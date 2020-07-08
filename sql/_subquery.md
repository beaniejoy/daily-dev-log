# SubQuery

## 🔖 문법

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

<br>

## 🔖 실제 사용

> Q) smith 사원과 동일한 직무를 담당하는 사원들의 급여 조회

```sql
select empno, ename, sal
from emp
where job = (select job 
             from emp 
             where ename = 'SMITH');
```

> Q) 사원번호 7839번과 동일한 직무를 담당하는 사원정보 검색

```sql
select *
from emp
where job = (select job
            from emp
            where empno = 7839);
```

> Q) emp 테이블에서 최소 월급을 받는 사원 정보 검색(subquery에 그룹함수 사용 가능)
> 
```sql
select *
from emp
where sal = (select min(sal)
             from emp);
```

> Q) EMP 테이블에서 부서별 최소 급여가 20번 부서의 최소 급여보다 많은 부서를 조회
 
```sql
select deptno, min(sal)
from emp
group by deptno
having min(sal) > (select min(sal)
                   from emp
                   group by deptno
                   having deptno = 20);
```

> Q) EMP 테이블에서 업무별로 가장 적은 급여를 받는 사원 조회하라

```sql
select *
from emp
where (job, sal) in (select job, min(sal)
                     from emp
                     group by job);
```
- multiple row subquery -> `in`으로 접근해야 한다.

> Q) 각 부서별로 해당 평균 급여보다 급여를 많이 받는 사원 검색 (이름, 부서, 급여)

```sql
select ename, a.deptno, sal, b.avgsal
from emp a, (select deptno, avg(sal) avgsal
             from emp
             group by deptno) b
where a.deptno = b.deptno
and a.sal > b.avgsal;

select ename, a.deptno
from emp a
where sal > (select avg(sal)
             from emp
             where a.deptno = deptno); -- 이 방법이 경제적
```
- 아래 방법으로 하면 `where` 절 subquery의 결과값을 cache에 저장해서 쓰기 때문에 반복IO가 줄어들 수 있다.
- 결국 테이블 IO 횟수를 줄이는 것이 중요하다.

<br>

## 🔖 `ANY`, `ALL`

> Q) 업무가 SALESMAN인 사원중 최소 한명 이상의 사원보다 급여를 많이 받는 사원의 이름, 급여, 업무를 조회하라 `ANY`

```sql
SELECT ename, sal, job
FROM emp
WHERE sal > ANY(select sal 
FROM emp 
WHERE job = 'SALESMAN') AND
job <> 'SALESMAN';
```

> Q) 업무가 SALESMAN인 모든 사원보다 급여를 많이 받는 사원의 이름, 급여, 업무를 조회하라 `ALL`

```sql
SELECT ename, sal, job
FROM emp
WHERE sal > ANY(select sal 
FROM emp 
WHERE job = 'SALESMAN') AND
job <> 'SALESMAN';
```

## 🔖 `IN`, `NOT IN`, SubQuery 사용시 주의사항

```sql
-- subquery를 사용한 관라자 사원들만 조회
select empno, ename
from emp
where empno in (select mgr from emp); -- 6 rows;

-- 관리자 사원이 아닌 사원들 조회
select empno, ename
from emp
where empno not in (select mgr from emp); -- 아무것도 안나온다.
```
- mgr 칼럼에 null 값이 포함되어 있다.
- `IN`: (a1 = b1) or (a1 = b2) or (a1 = b3) or ...
- `NOT IN`: (a1 <> b1) and (a1 <> b2) and ...
- null값을 가지고 `<>` 비교연산을 수행하면 항상 false가 나온다.(비교 자체 불가)

```sql
select empno, ename
from emp a
where exists (select '1' 
              from emp
              where a.empno = mgr);

select empno, ename
from emp a
where not exists (select '1' 
                  from emp
                  where a.empno = mgr);
```
- subquery에서 존재 여부만 알려주면 된다.

<br>

## 🔖 `WITH`절을 사용한 SQL

```sql
WITH 별칭1 AS (select 문), 별칭2 AS (select 문)
```

`별칭2` 내용을 `별칭1` 내부 select문에 사용가능하다.

(업데이트 할 것)

## SELECT 이외의 SQL에 subquery 사용

```sql
create table ...
as select ...
from ...;
``` 
- 이것도 subquery

```sql
insert into 테이블명 select ... from ...;
```
```sql
insert into [테이블명, 뷰, subquery] values ...
```

```sql
update 테이블 set 컬럼 = (scalar subquery), ...
where 컬럼 연산자 (subquery)
```
```sql
delete from 테이블 where 컬럼 연산자 (subquery);
```

(업데이트 할 것)