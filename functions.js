
function add(a, b){
	return parseFloat(a) + parseFloat(b);
}
//module.exports = add;

function subtract(a, b){
	return parseFloat(a) - parseFloat(b);
}
//module.exports = subtract;

function multiply(a, b){
	return parseFloat(a) * parseFloat(b) 
}
//module.exports = multiply;

function divide(a, b){
	return parseFloat(a) / parseFloat(b);
}
//module.exports = divide;

function operate(operator, a, b){
	switch(operator){
		case "+":
			return add(a, b);
			break;
		case "-":
			return subtract(a, b);
			break;
		case "x":
			return multiply(a, b);
			break;
		case "/":
			return divide(a, b);
			break;
	}
}	

function computeResult(array){

	if(array.length == 1){
		return +parseFloat(array[0]).toFixed(8);
	}

	if(array.length == 3){
		return +operate(array[1], array[0], array[2]).toFixed(8);
	}

	if(((array[1] === "+" || array[1] === "-") && !(array[3] === "x" || array[3] === "/")) || (array[1] === "x" || array[1] === "/")){
		let new_array = [operate(array[1], array[0], array[2])];
		let temp_array = array.slice(3, array.length);
		return computeResult(new_array.concat(temp_array));
	} 
	
	if((array[3] === "x" || array[3] === "/")){
		let new_array = [array[0], array[1], operate(array[3], array[2], array[4])]
		let temp_array = array.slice(5, array.lengthe);
		return computeResult(new_array.concat(temp_array));
	}
	
}
