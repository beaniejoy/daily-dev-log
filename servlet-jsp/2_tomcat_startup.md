# tomcat 실행하기

[apache tomcat 9버전 다운](https://tomcat.apache.org/download-90.cgi)

```
- bin
    - startup.bat
```
startup.bat파일을 통해 tomcat 서버를 실행시킬 수 있다.

<br>

## Tomcat Home Directory

```
- webapps
    - ROOT
```
- tomcat 서버의 home directory
- `localhost:8080/home.html` 이라 하면 ROOT폴더 내의 `home.html` 파일을 내보내준다. 

### Context Site 추가

- `localhost:8080/admin/`
- `localhost:8080/beanie/`
- `localhost:8080/joy/` (root site와 다른 디렉토리/환경에서 분업해 개발)

위와 같이 ROOT 디렉토리 내에 여러 디렉토리를 설정해줌으로써 여러 페이지를 개발할 수 있다.  
그 중 `localhost:8080/joy/` 경로를 분업을 통해 다른 환경에서 개발을 하는 경우가 발생할 수 있다.  

> 이렇게 Root Site와 별개의 환경에서 개발하지만 url구조로 보면 Root Site 범주 안에서 같은 문맥을 가지고 있는 사이트를 **Context Site**라 한다.

<br>

**Context Path 설정하기**

```xml
<Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true">
    <!-- 아래의 tag를 추가--> 
    <Context path="[url path 이름 설정]" docBase="[Context Site의 디렉토리 경로]" privileged="true"/>
</Host>
```
- `conf/server.xml`의 내용을 위와 같이 수정해준다.
- `[url path 이름 설정]` : 사이트 주소 url의 path이름을 설정한다.  
  예를 들어 joy라고 설정하면 `localhost:8080/joy/`경로로 접속을 할 수 있다.
- `[Context Site의 디렉토리 경로]` : Context Site의 소스가 들어있는 디렉토리 경로를 넣는다.

이렇게 하면 webapps/ROOT 디렉토리 바깥에서 따로 분업해 관리가 가능해진다. 하지만 tomcat 버전이 올라가면서 이러한 방법은 지양하고 있다.

<br>

## Servlet 프로그램 만들기

콘솔을 통해 Servlet 프로그램을 컴파일하고 실행하는 과정 정리

<br>

### 코드 작성

```java
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class Example extends HttpServlet{
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException{
		System.out.println("hello Servlet");
	}
}
```
- `HttpServlet`이라는 추상클래스에 초점을 맞춘다.
- `service` : HttpServlet에서 상속받은 메서드  
  기존의 자바 어플리케이션에서는 main 메서드를 통해 실행했지만 Servlet에서는 service 메서드를 통해 실행한다.

### Compile 진행하기

```
javac -cp C:\dev\apache-tomcat-9.0.30\lib\servlet-api.jar Example.java
```
- 콘솔창에서 Example 클래스를 컴파일하기 위해 Servlet관련 외부 라이브러리가 필요하다.
- -cp(classpath) 옵션을 통해 javax 관련 라이브러리를 담고 있는 jar파일의 경로를 설정해야 한다.
- `servlet-api.jar` 파일이 해당 라이브러리를 담고 있다.

<br>

### 컴파일 파일 배포

```
- webapps
    - ROOT
        - WEB-INF
            -classes
```
javac를 통해 생성된 class 파일을 위 경로에 집어넣는다.  

> 주의할 것이 `localhost:8080/WEB-INF/classes/Example.class`이런 식으로 접근할 수 없다.  
> `WEB-INF` 디렉토리를 tomcat에서 특별한 의미를 가진 디렉토리다. 서버쪽에서만 접근가능하고 클라이언트에서는 접근조차 할 수 없다.  

이 class 파일을 브라우저에서도 접근하기 위해서는 **mapping** 과정이 필요하다.

<br>

### url mapping 진행

```xml
<servlet>
    <servlet-name>na</servlet-name>
    <servlet-class>Example</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>na</servlet-name>
    <url-pattern>/example</url-pattern>
  </servlet-mapping>
```
`WEB-INF/web.xml`에 위 내용을 추가해준다.  
위와 같이 설정하면 `/example` 경로를 요청했을 때 웹서버가 해당 파일을 찾아보고 없으면 WAS로 넘겨 xml정보들을 확인해 mapping정보에 따라 Servlet Code를 실행해준다.

<br>

### 브라우저 출력 방법

```java
System.out.println("hello Servlet");
```
그리고 위와 같이 하면 콘솔에 print 된다.

```java
OutputStream os = response.getOutputStream();
PrintStream out = new PrintStream(os, true);
out.println("Hello Servlet!!");
```
위와 같이하면 브라우저에 내용이 print된다.
PrintStream의 parameter중 true값은 buffer에서 flush기능을 설정하는 것이다. (일정 단위가 안채워져도 그냥 내보내겠다는 의미)  
위 코드는 다음과 같이 간편하게 사용 가능하다.

```java
PrintWriter out = response.getWriter();
out.println("Hello Servlet!!");
```

<br>


