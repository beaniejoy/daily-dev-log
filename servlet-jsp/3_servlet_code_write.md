# Servlet Code 작성하기

**IDE로 eclipse 사용**
```
코드 수정 → 컴파일 → 배포 → 서버 재시작 → 브라우저 요청 → 다시 코드 수정
```
IDE를 이용하면 위의 과정을 `ctrl` + `f11`로 한번에 가능(IDE를 사용해야 하는 이유)

<br>

## Annotation 기반 URL Mapping

```xml
<servlet>
    <servlet-name>na</servlet-name>
    <servlet-class>com.beanie.web.Hello</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>na</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
```
`/hello`과 `Hello.java`를 mapping하고자 할 때 xml 설정  
xml 설정 없이 Annotation 하나만으로 설정 가능하다.

```java
@WebServlet("/hello")
public class Hello extends HttpServlet{
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException{
		System.out.println("hello Servlet");
	}
}
```
`@WebServlet("/hello")` Annotation 하나만 설정하면 xml 설정을 하지 않아도 mapping이 가능하다.

> xml설정보다 annotation 기반이 좋다. 여러 개발자들과 공동 프로젝트를 진행할 때 혼돈하지 않고 깔끔하게 작업할 수 있다.

<br>

## Servlet 입출력 형식 설정

```java
out.println("안녕 Servlet!!<br>");
```
이렇게 브라우저에 내보냈다고 한다면 한글은 깨져서 나오고 `<br>` 태그는 인식이 안되는 경우가 있다.  
크롬, 파이어폭스, IE 등등 여러 브라우저들이 있는데 각각 내보내는 형식이 다르다.  
  

Servlet은 기본 설정이 ISO-8859-1 인코딩 방식으로 내보내게 되는데 1byte씩 내보내는 방식이다. 그렇기 때문에 한글은 깨져서 나오게 되는 것이다.  
이를 `UTF-8` 인코딩 방식으로 내보낸다는 것을 알려야 한다.  
또한, 브라우저에서도 `UTF-8` 방식으로 읽으라고 지시를 해야 한다. 

```java
response.setCharacterEncoding("UTF-8");
```
인코딩 방식으로 `UTF-8`로 하겠다는 설정

```java
response.setContentType("text/html; charset=UTF-8");
```
브라우저에서 html파일 형식, `UTF-8`로 읽으라고 지시하는 설정

<br>


## GET / POST 요청에 따른 처리


### GET Request

- `localhost:8080/hello?cnt=5`를 GET 요청할 때 문서를 요청하면서 다른 요구도 같이 보낼 수 있다.
- 이를 **Query String**이라고 한다. (`?cnt=5`)

```java
int cnt = Integer.parseInt(request.getParameter("cnt"));
```
이런 식으로 url을 통해 받아온 parameter를 int 처리해줄 수 있다.


### POST Request

- GET 요청을 통해 처리하기에는 요청사항이 너무나 많은 경우가 존재
- 이를 url하나에 모든 것을 담아 보내기에는 url 길이 제한이 존재한다.
- 요청사항이 많을 때는 POST방식이 적절하다.

```html
<body>
	<form method="post" action="hello">
		<div>
			<label>제목:</label><input name="title" type="text" >
		</div>
		<div>
			<label>내용:</label>
			<textarea name="content"></textarea>
		</div>
		<div>
			<input type="submit" value="등록" />
		</div>
	</form>
</body>
```
Query String을 통해 `titie`, `content` 값을 서버에 보낼 수 있다.

```java
request.setCharacterEncoding("UTF-8");
```
이렇게 `HttpServletRequest` 객체를 받아 `UTF-8`로 설정해준다.


### 서버 설정으로 인코딩 방식 변경

```xml
<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" 
               URIEncoding="UTF-8"/>
```
`conf/server.xml` 파일에 내용을 위와 같이 수정해주면 tomcat의 기본 인코딩 방식을 `UTF-8`로 바꿀 수 있다.  
하지만 이렇게 서버 자체의 설정을 바꾸는 행위는 하지 않는다. 개발할 때 여러 가지 환경이 존재하기 때문에 서버 설정보다 위와 같이 코드로 구현한다.


<br>

## 정리

아래 코드를 기억하자.

```java
@WebServlet("/hello")

response.setCharacterEncoding("UTF-8");
response.setContentType("text/html; charset=UTF-8");

request.setCharacterEncoding("UTF-8");
```
