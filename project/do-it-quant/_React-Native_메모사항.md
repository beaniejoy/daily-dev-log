# React-Native 개발 노트

<br>

## state에 대한 메모

```js
componentDidUpdate(prevProps, prevState) {
    
	const { isRight, ...data } = this.state;

	// 7개 지표의 총합 구하기
	let arr = Object.values(data);
	let sum = arr.reduce((total, num) => total + num);

	if(sum === 100) {
		this.setState({
		isRight: true,
		})
	} else {
		this.setState({
		isRight: false,
		})
	}

}
```
위와 같이 `componentDidUpdate`에서 `setState`를 계속 호출하면 다음과 같은 에러가 발생한다.

```
Error: Maximum update depth exceeded.  
This can happen when a component repeatedly calls setState inside
componentWillUpdate or  componentDidUpdate.
React limits the number of nested updates to prevent infinite loops.
```
추측건대, update될 때마다 setState를 빨리 그리고 과도하게 많이 호출해서 발생하는 것 같다.  
그래서 100%인지 아닌지를 판단해주는 function을 아예 state에다가 넣고 함수 자체를 update될 때마다 호출하는 식으로 변경해보았다.

```js
this.state = {
	per: 0,
	pbr: 0,
	roa: 0,
	roe: 0,
	debtRatio: 0,
	reserveRatio: 0,
	operMargin: 0,
	isRight: () => {
	const { isRight, ...data } = this.state;

	let arr = Object.values(data);
	let sum = arr.reduce((total, num) => total + num);

	if(sum === 100) {
		console.log('sum equals 100');
		return true;
	} else {
		console.log('sum doesn\'t equal 100');
		return false;
	}
	},
};
```

```js
{ !isRight() ? (
	<View>
		<Button
		title={
			<Text>
			7개 지표의 비중 총합이 100%를 만족해야 합니다. 다시 확인해주세요.
			</Text>
		}
		titleStyle={{
			fontSize: 8.5,
			color: 'red',
			marginLeft: 4
		}}
		icon={<MaterialIcons name="error-outline" size={18} color="red" />}
		type="outline"
		buttonStyle={{
			marginTop: 20,
			marginHorizontal: 20,
			borderColor: "red",
			borderWidth: 1,
			borderRadius: 10,
			height: 35,
		}}
		/>
	</View>) : (<View></View>) }
```
이런 식으로 함수를 호출하는 식으로 변경했더니 랜더링이 잘 됐다.