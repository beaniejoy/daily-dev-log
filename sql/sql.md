# DQL (SELECT문)

## 🔖 기본 SELECT문 구조

```sql
SELECT                  --- 5
FROM                    --- 1
WHERE                   --- 2 (생략 가능)
GROUP BY                --- 3 (only 컬럼명만, 생략 가능)
HAVING [그룹함수 조건]   --- 4 (생략 가능)
ORDER BY                --- 6 (생략 가능)
```

<br>

### SELECT 관련 문법

```sql
DESC emp;
```
- `DESC`: 해당 테이블의 구성을 볼 수 있는 명령어
- 칼럼명과 null여부, data type 등의 정보를 보여준다.

```sql
-- full scan
SELECT *
FROM employees
WHERE first_name = 'James';

-- index scan
SELECT *
FROM employees
WHERE employee_id = 200;
```
- `<>`, `!=`, `^=` 하거나 function을 이용해 변형이 되면 index scan을 못한다.

### 별칭(alias)

```sql
SELECT last_name, job_id, salary AS sal -- AS 생략 가능
FROM employees;
```

### IN
```sql
SELECT * 
FROM departments
WHERE department_id IN(10, 20, 50);
```
- 별로 추천하지는 않는다. (full scan 낭비)

### DECODE, CASE

> Q) 전체 사원수, 1995, 1996, 1997, 1998년도에 입사한 사원수를 출력하시오
```sql
SELECT COUNT(employee_id) total,
COUNT(decode(to_char(hire_date, 'YYYY'),'1995',1)) "1995",
COUNT(decode(to_char(hire_date, 'YYYY'),'1996',1)) "1996",
COUNT(decode(to_char(hire_date, 'YYYY'),'1997',1)) "1997",
COUNT(decode(to_char(hire_date, 'YYYY'),'1998',1)) "1998"
FROM employees;
```

> Q) 직무별로 월급의 합계와 각 부서내에 직무별 월급의 합계를 아래 보기와 같이 출력하시오

```sql
SELECT job_id, 
SUM(decode(department_id, 20, salary, 0)) Dept20,
SUM(decode(department_id, 50, salary, 0)) Dept50,
SUM(decode(department_id, 80, salary, 0)) Dept80,
SUM(decode(department_id, 90, salary, 0)) Dept90,
SUM(salary) total
FROM employees
GROUP BY job_id;
```

```sql

```

```sql

```

<br>

## 🔖 그룹 함수(다중행 함수)

- 그룹함수는 NULL을 무시하고, 연산에 포함시키지 않는다.
- `DISTINCT`는 중복값 제거한 결과값을, `ALL`(default)은 중복값 포함한 결과값을 도출

```sql
SELECT MIN(ename), MAX(ename), MIN(hiredate), MAX(hiredate)
FROM emp;
```

```sql
SELECT count(*), count(comm), count(deptno), count(DISTINCT deptno)
FROM emp;
```

<br>

## 🔖 GROUP BY, HAVING

```sql
SELECT department_id, MIN(salary)
FROM employees
WHERE manager_id IS NOT NULL
GROUP BY department_id
HAVING MIN(salary) > 6000
ORDER BY 2 DESC;
```

<br>

## 🔖 내장 함수

```sql
SELECT SYSDATE FROM dual;
ALTER SESSION SET nls_date_format='YYYY-MM-DD HH24:MI:SS';
SELECT SYSDATE FROM dual; -- 날짜 표현 형식 변경

SELECT SYSDATE, SYSDATE+1, SYSDATE-1, SYSDATE+1/24
FROM dual;

SELECT SYSDATE - hire_date
FROM employees;
```

<br>

## 🔖 Join

- dept: 부모(deptno: pk)
- emp: 자식(deptno: fk)
- dept ---<- emp (1: N)

<br>

### cartesian product

```sql
SELECT e.empno, e.ename, e.deptno, d.dname
FROM emp e, dept d;
```
- 암묵적으로 어느 칼럼이 어디 테이블에 속한 것인지 알지만 명시적으로 하나하나 칼럼에 대한 테이블을 지정해주는 것이 좋다.
- `e.`(`d.`)처럼 어디 테이블에 속해있는 건지를 지정해주면 recursive sql을 줄일 수 있다. (alias 지정)
- 위의 방법은 `cartesian product`

```sql
SELECT e.empno, e.ename, e.deptno, d.dname
FROM emp e CROSS JOIN dept d;
```
- `cartesian product`의 다른 표현 방식
- 조인 조건이 누락 되면 `cartesian product`(cross join: rows*rows의 결과)

<br>

### equi join
```sql
SELECT e.empno, e.ename, e.deptno, d.dname
FROM emp e, dept d
WHERE e.deptno = d.deptno;
```

```sql
SELECT empno, ename, deptno, dname
FROM emp NATURAL JOIN dept;
```
- natural join은 조인할 테이블에서 이름이 동일한 컬럼에 대해서 자동으로 `equi join`을 수행
- 여기서는 alias를 사용하면 오히려 안된다. 동일한 이름의 컬럼은 소유자 테이블명, alias를 생략한다.

<br>

### 

<br>

## 🔖 SubQuery

```sql
select    (subquery)
from      (subquery)
[where]    (subquery)
[group by]  
[having]    (subquery)
[order by]  (subquery)
```

## 🔖 Window Function



