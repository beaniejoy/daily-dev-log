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
- `WHERE`은 처음 조건 적용, `HAVING`은 grouping 이후에 조건
- `ORDER BY`할 때 기준을 SELECT할 컬럼의 자리 숫자로 지정해도 된다.

```sql
SELECT deptno, job, avg(sal)
FROM emp
GROUP BY deptno, job;
```
- 이런 식으로 `GROUP BY` 기준을 한 개 이상으로 지정 가능

> Q) 부서별 평균 급여중 최고 평균 급여를 검색

```sql
SELECT department_id, avg(salary) average
FROM employees
GROUP BY department_id
HAVING avg(salary) = 
(SELECT max(avg(salary))
FROM employees
GROUP BY department_id);
```
- 그룹함수 내부에 그룹함수 nested 가능

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
- `natural join`은 조인할 테이블에서 이름이 동일한 컬럼에 대해서 자동으로 `equi join`을 수행
- 여기서는 alias를 사용하면 오히려 안된다. 동일한 이름의 컬럼은 소유자 테이블명, alias를 생략한다.

```sql
SELECT e.empno, e.ename, deptno, d.dname
FROM emp e JOIN dept d USING(deptno);
```
- 여러개 동일한 컬럼이 존재할 수 있기에 `using`절을 통해 하나의 pk - fk 쌍을 기준설정해줄 수 있다.

<br>

### PK - FK 쌍의 칼럼 이름이 다른 경우(모델링 잘못 설계)

```SQL
SELECT e.empno, e.ename, d.deptno, d.dname
FROM t_emp e JOIN dept d ON e.deptid = d.deptno;
```
- 컬럼 이름이 다른 경우(FK(deptid) - PK(deptno))

```SQL
SELECT e.empno, e.ename, e.deptno, d.dname
FROM emp e INNER JOIN dept d ON e.deptno = d.deptno;
```
- inner join 으로도 사용가능 하지만 join으로 보통 사용

<br>

### 느슨한 join

```sql
SELECT e.ename, e.sal, s.grade
FROM emp e JOIN salgrade s
ON e.sal BETWEEN s.losal AND s.hisal;
```
- join할 때 이렇게 다양한 조건식을 걸어줄 수 있다.
- emp의 sal이 salgrade의 losal ~ hisal 어느 등급에 속하는지 조건 지정

<br>

### Self Join

```sql
SELECT e.empno, e.ename, e.mgr, m.ename AS mgrname
FROM emp e, emp m
WHERE e.mgr = m.empno;
```
- 하나의 테이블 안에서 자기 참조가 가능하다.

<br>

### Outer Join

- **Left Outer Join**

```sql
SELECT e.empno, e.ename, e.deptno, d.dname
FROM emp e, dept d
WHERE e.deptno = d.deptno;
```
- 부서 없는 사원이 누락된다. (emp 테이블의 deptno없는 데이터)

```sql
SELECT e.empno, e.ename, e.deptno, d.dname
FROM emp e, dept d
WHERE e.deptno = d.deptno(+); -- outer 연산자 사용

SELECT e.empno, e.ename, e.deptno, d.dname
FROM emp e LEFT OUTER JOIN dept d ON e.deptno = d.deptno;
```
- outer 연산자 사용은 비추천, join 조건 외에 다른 필터조건에 `(+)` 연산자를 넣지 않으면 equi join으로 수행된다.
- `LEFT OUTER JOIN`으로 작동하는 것이 좋다.

- **Right Outer Join**

```sql
SELECT d.deptno, d.dname, e.empno, e.ename
FROM emp e, dept d
WHERE e.deptno(+) = d.deptno
ORDER BY d.deptno;

SELECT d.deptno, d.dname, e.empno, e.ename
FROM emp e RIGHT OUTER JOIN dept d ON e.deptno = d.deptno
ORDER BY d.deptno;
```


<br>

## 🔖 SubQuery

```sql
SELECT    (subquery)
FROM      (subquery)
[WHERE]    (subquery)
[GROUP BY]  
[HAVING]    (subquery)
[ORDER BY]  (subquery)
```

## 🔖 Window Function



