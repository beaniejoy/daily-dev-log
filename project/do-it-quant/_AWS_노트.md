# 프로젝트 내 AWS 사용에 대한 노트

<br>

## AWS cli를 이용한 EC2에서 S3 파일 upload 하기

```cmd
$pip3 install awscli

$aws help

$aws configure
AWS Access Key ID [None]:
AWS Secret Access Key [None]:
Default region name [None]:
Default output format [None]:

aws s3 ls

aws s3 sync /home/ec2-user/app/diq/[원하는 폴더] s3://[해당 bucket name]/[원하는 경로]
```


<br>

#### crontab 관련 참고 블로그
[AWS CLI (Command Line Interface) 를 이용하여 S3 버킷 다루기 (파일 업로드, 폴더 동기화) 및 AWS IAM 등록](https://lovit.github.io/aws/2019/01/30/aws_s3_iam_awscli/)
