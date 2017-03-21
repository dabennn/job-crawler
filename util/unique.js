/***********
 数组去重
 ***********/
module.exports = (arr)=> {
	let newArr = [];
	let len = arr.length;
	for (let i = 0; i < len; i++) {
		if (newArr.indexOf(arr[i]) == -1) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}