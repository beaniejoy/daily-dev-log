> - Amazon Web Service
> - `EC2`, `RDS`, `S3`, `CloudFront`, `CodeDeploy`
> - 그 외 CI 툴: `Travis CI`

# AWS에 대한 project 정리

AWS Cloud Server 연동하면서 모식도 정리

<br>

## 🔖 전체적인 AWS 관계도



```
IntelliJ(Commit/Push) - Github - Travis CI(build) - S3(jar file upload) - CodeDeploy(배포 요청) - EC2(RDS)
```
