# Rank Query 구성하고 JPA통해 불러오기

<br>

## 7개 지표 각각에 대한 Rank 매기는 Query

- mariadb를 기준으로 구성
- mysql, h2에서도 호환 가능

```sql
WITH table_rank_pbr AS ((SELECT id, cmp_name, pbr,
RANK() OVER(ORDER BY pbr) rank_pbr
FROM quant_data
WHERE pbr > 0)
UNION 
(SELECT id, cmp_name, pbr,
(RANK() OVER(ORDER BY pbr DESC) + (SELECT COUNT(id)
FROM quant_data
WHERE pbr> 0)) rank_pbr
FROM quant_data
WHERE pbr <= 0 or pbr is null))
,table_rank_per
AS ((SELECT id, cmp_name, per,
RANK() OVER(ORDER BY per) rank_per
FROM quant_data
WHERE per > 1)
UNION
(SELECT id, cmp_name, per,
(RANK() OVER(ORDER BY per DESC) + (SELECT COUNT(id)
FROM quant_data
WHERE per> 1)) rank_per
FROM quant_data
WHERE per <= 1 OR per is null))
SELECT
a.id, a.cmp_name, a.code,
RANK() OVER(ORDER BY NVL(a.debt_ratio, 99999)) rank_debt_ratio,
RANK() OVER(ORDER BY a.reserve_ratio DESC) rank_reserve_ratio,
RANK() OVER(ORDER BY a.operating_profit_ratio DESC) rank_oper,
RANK() OVER(ORDER BY a.roa DESC) rank_roa,
RANK() OVER(ORDER BY a.roe DESC) rank_roe,
b.rank_pbr,
c.rank_per
FROM quant_data a, table_rank_pbr b, table_rank_per c
WHERE a.id=b.id AND a.id=c.id;
```
- `debt_ratio`: 오름차순(`ASC`) 기준, `null` -> `99999`(등수 가장 낮게 조정)
- `reserve_ratio`: 내림차순(`DESC`) 기준, `null`값 따로 처리X(내림차순으로 하면 null이 가장 낮은 등수)
- `operating_profit_ratio`: 내림차순(`DESC`) 기준
- `roa`: 내림차순(`DESC`) 기준
- `roe`: 내림차순(`DESC`) 기준
- `per`: 1을 기준으로 1보다 높은 값은 오름차순, 낮은 값은 내림차순으로 설정
- `pbr`: 0을 기준으로 0보다 높은 값은 오름차순, 낮은 값은 내림차순으로 설정
- `per`, `pbr`은 `UNION`으로 묶인 다른 table이므로 alias지정해 미리 준비

<br>

## Spring Boot에서 Query결과 가져오기

- QuantDataRepository.java

```java
@Query(value = "WITH table_rank_pbr AS ((SELECT id, cmp_name, pbr, " + 
			"RANK() OVER(ORDER BY pbr) rank_pbr " + 
			"FROM quant_data " + 
			"WHERE pbr > 0) " + 
			"UNION  " + 
			"(SELECT id, cmp_name, pbr, " + 
			"(RANK() OVER(ORDER BY pbr DESC) + (SELECT COUNT(id) " + 
			"FROM quant_data " + 
			"WHERE pbr> 0)) rank_pbr " + 
			"FROM quant_data " + 
			"WHERE pbr <= 0 or pbr is null)) " + 
			",table_rank_per " + 
			"AS ((SELECT id, cmp_name, per, " + 
			"RANK() OVER(ORDER BY per) rank_per " + 
			"FROM quant_data " + 
			"WHERE per > 1) " + 
			"UNION " + 
			"(SELECT id, cmp_name, per, " + 
			"(RANK() OVER(ORDER BY per DESC) + (SELECT COUNT(id) " + 
			"FROM quant_data " + 
			"WHERE per> 1)) rank_per " + 
			"FROM quant_data " + 
			"WHERE per <= 1 OR per is null)) " + 
			"SELECT " + 
			"a.id, a.cmp_name, a.code, " + 
			"RANK() OVER(ORDER BY NVL(a.debt_ratio, 99999)) rank_debt_ratio, " + 
			"RANK() OVER(ORDER BY a.reserve_ratio DESC) rank_reserve_ratio, " + 
			"RANK() OVER(ORDER BY a.operating_profit_ratio DESC) rank_oper, " + 
			"RANK() OVER(ORDER BY a.roa DESC) rank_roa, " + 
			"RANK() OVER(ORDER BY a.roe DESC) rank_roe, " + 
			"b.rank_pbr, " + 
			"c.rank_per " + 
			"FROM quant_data a, table_rank_pbr b, table_rank_per c " + 
			"WHERE a.id=b.id AND a.id=c.id; ", nativeQuery = true)
List<Object> findAllByRank();
```

- QuantDataService.java

```java
public List<QuantDataRankDto> getRankList() {

    List<Object> rankList = quantDataRepository
            .findAllByRank();

    return rankList.stream().map(this::toRankDto)
            .collect(Collectors.toList());
}

public QuantDataRankDto toRankDto(Object rawRankData) {

    Object[] converted = (Object[]) rawRankData;

    return QuantDataRankDto.builder()
            .id(((BigInteger) converted[0]).longValue())
            .cmpName((String) converted[1])
            .code((String) converted[2])
            .rankDebtRatio(((BigInteger) converted[3]).intValue())
            .rankReserveRatio(((BigInteger) converted[4]).intValue())
            .rankOper(((BigInteger) converted[5]).intValue())
            .rankRoa(((BigInteger) converted[6]).intValue())
            .rankRoe(((BigInteger) converted[7]).intValue())
            .rankPer(((BigInteger) converted[8]).intValue())
            .rankPbr(((BigInteger) converted[9]).intValue())
            .build();
}
```