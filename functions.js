var myArray  = [1,2,3,4,5,6,7,8,9,10];

console.log(myArray);

// console.log(myArray.reverse());

var newArray = reverseArray(myArray);

console.log(newArray);
console.log(myArray.sizeOf());


Array.class_name.prototype.sizeOf = function() {
	var temp = 0;

	for (var i = 0; i < myArray.length; i++) {
		temp++;
	};

	// return temp;
};

function reverseArray(arr) {

	let temp = [];
	let index = 0;

	for (var i = arr.length - 1 ; i < arr.length - arr.length ; i--) {

		temp[index] = arr[i];
		index++;

	};


	return temp;

}

// function sizeOf(arr) {
// 	var temp = 0;

// 	for (var i = 0; i < arr.length; i++) {
// 		temp++;
// 	};

// 	return temp;
// }