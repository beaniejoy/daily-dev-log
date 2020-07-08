## 🔖 Window Function

### `RANK`, `DENSE_RANK`

> Q) emp사원 테이블에서 전체 사원의 급여가 높은 순위와 JOB별로 급여가 높은 순위를 출력
```sql
SELECT empno, ename, job, sal, RANK() OVER(ORDER BY sal DESC) "sal_rank"
FROM emp;
```
- 동일한 순위는 같은 등수로 부여하고 그 다음은 명수에 맞게 다음 등수 부여

```sql
select empno, ename, job, sal, rank() over(order by sal desc) "sal_rank",
rank() over(partition by job order by sal desc) "job_rank"
from emp;
```
- 직무별내 급여 등수도 포함

```sql
select empno, ename, job, sal, 
rank() over(order by sal desc) "sal_rank", -- 1 2 2 4 5
dense_rank() over(order by sal desc) "sal_drank", -- 1 2 2 3 4 5
rank() over(partition by job order by sal desc) "job_rank"
from emp;
```
- `dense_rank`: 동일한 값의 레코드가 1개 이상이어도 하나의 순위로 취급

```sql
select empno, ename, job, sal, 
rank() over(order by sal desc) "sal_rank", -- 1 2 2 4 5
dense_rank() over(order by sal desc) "sal_drank", -- 1 2 2 3 4 5
row_number() over(order by sal desc) "sal_rrank"
from emp;
```
- `row_number`: 동일한 값에 대해서 개별적인 순위값을 반환

<br>

### `SUM`, `AVG`, `COUNT`

```sql
select empno, ename, deptno, sal, 
sum(sal) over(partition by deptno order by sal rows unbounded preceding) cum_sum_sal
from emp;
```
- 누적분포도 같이 누적된 값들을 조회 

> - `UNBOUNDED PRECEDING`: 지정된 값 이전의 모든 ROW를 포함시킨다.
> - `UNBOUNDED FOLLOWING`: 지정된 값 이후의 모든 ROW를 포함시킨다.
> - `CURRENT ROW`: 현재 ROW를 시작 값 또는 마지막 값으로 이용할 때 사용한다.
> - `ROWS`: 자료의 물리적 순서를 이용
> - `RANGE`: 논리적 순서를 이용

> Q) EMP 테이블에서 같은 매니저를 두고 있는 사원들의 평균 salary를 구하는데, 조건은 같은 파티션내에서 현재 행의 앞의 사번과 바로 뒤의 사번인 직원만을 대상으로 조회

```sql
select empno, mgr, sal, 
    avg(sal) over(partition by mgr 
                  order by sal
                  ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) "win_avg"
from emp;
```
- 현재 행의 물리적 순서를 기준으로 앞뒤 한 칸씩을 대상

```sql
select empno, mgr, sal, 
    count(sal) over(order by sal
                    range BETWEEN 300 PRECEDING AND FOLLOWING) "win_avg"
from emp;
```
- -300 ~ 기준점 ~ +300 범위 설정

<br>

### `FIRST_VALUE`, `LAST_VALUE`

```sql
SELECT empno, deptno, mgr, sal, 
    FIRST_VALUE(sal) OVER(PARTITION BY deptno 
                          ORDER BY sal DESC) "max_sal",
    LAST_VALUE(sal) OVER(PARTITION BY deptno 
                         ORDER BY sal DESC
                         ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) "max_sal"
FROM emp;
```
- 파티션 별로 가장 높은(낮은) 급여를 조회할 때
- `LAST_VALUE`는 행이 추가가 될 때마다 가장 나중값을 기준으로 지정한다. 그래서 범위를 그 이후까지 포함해주어야 한다. (`unbounded following`)

<br>

### `LAG`, `LEAD`

```sql
select  ename, hiredate, sal, LAG(sal, 1, null) over (order by hiredate) as prev_sal
from  emp
where job= 'SALESMAN';
```
- `LAG`(기준칼럼, 앞에 몇칸 이동, 데이터 없을 경우 대체)

```sql
select  ename, hiredate, sal, lead(sal, 1, null) over (order by hiredate) as next_sal
from  emp
where job= 'SALESMAN';
```
- `LEAD`는 `LAG`와 반대

<br>

> 업데이트 할 것!

<br>

## 🔖 내장 속성

### `ROWID`

```sql
select rowid, empno, ename
from emp;
```
- `rowid` 값이 같이 저장이 된다.(내장속성)
- objectid(unique한) + fileid + blockid + row순서번호

<br>

### `ROWNUM`

``` sql
select rownum, empno, ename, sal
from emp; 
```
- rownum 내장컬럼, resultSet의 레코드 순번 발행

```sql
select rownum, empno, ename, sal
from emp
order by sal desc;
```
- 급여의 내림차순으로 레코드 순서번호
- `order by`는 이미 순번을 발행한 다음에 실행되기에 순번이 꼬여버린다.

```sql
select rownum, empno, ename, sal --, deptno(or job)은 error 발생
from (select empno, ename, sal 
      from emp
      order by sal desc); -- inline view(논리적인 테이블)
```
- 먼저 내림차순으로 논리적인 테이블을 만든 뒤 `ROWNUM` 부여

> Q) 부서번호 30번 사원들중에서 월급이 높은 3사람을 조회하시오 (Top-N쿼리)

```sql
select *
from (select *
      from emp
      where deptno = 30
      order by sal desc)
where rownum < 4;
```
- 위의 방법을 이용해 상위 데이터 조회 가능


