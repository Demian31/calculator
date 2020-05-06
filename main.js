document.addEventListener('DOMContentLoaded', function(){ 

	let display = document.getElementById("display");
	let buttons = document.getElementsByClassName("in-button");
	let point = document.getElementById("point");
	let to_be_calculated = [];
	let number = ''; 
	let last_input_is_operator = false;
	let result;
	let result_shown = false;
	let point_in_use = false;

	// Clear Button
	document.getElementById("clear").addEventListener("click", function(){
		display.textContent = '';
		to_be_calculated = [];
		last_input_is_operator = false;
		result_shown = false;
		point_in_use = false;
		point.removeAttribute("disabled", "")
	});


	// Display the numbers and operators of the input-buttons
	for(let i=0; i< buttons.length; i++){
		buttons[i].addEventListener("click", function(e){

			if(result_shown == false){
				let text;

				if(!isNaN(parseInt(e.target.value)) || "." === e.target.value){ //is Number

					// If the first button clicked is a Point the display blinks red
					if(!(to_be_calculated && to_be_calculated.length) && number == '' && "." === e.target.value){
						display.style = "background-color: red; opacity: 0.4;";
						setTimeout(function(){display.style = "background-color: inherit";}, 150);
						return;
					}

					text = document.createTextNode(e.target.value); 
					number += e.target.value
					if("." === e.target.value){
						point.setAttribute("disabled", "");
						point_in_use = true;
					}
					last_input_is_operator = false;

					display.appendChild(text);

				} else { // is Operator
					if(number.length > 0){
						to_be_calculated.push(number);
						number = '';
						point_in_use = false;
						point.removeAttribute("disabled", "")
					}

					// If the first button clicked is an operator the display blinks red
					if(!(to_be_calculated && to_be_calculated.length)){
						display.style = "background-color: red; opacity: 0.4;";
						setTimeout(function(){display.style = "background-color: inherit";}, 150);
						return;
					}

					if(last_input_is_operator == false){
						to_be_calculated.push(e.target.value);
						text = document.createTextNode(" " + e.target.value + " ");

						display.appendChild(text);
					} else {
						to_be_calculated.pop();
						display.textContent = display.textContent.substring(0, display.textContent.length - 3);
						text = document.createTextNode(" " + e.target.value + " ");
						to_be_calculated.push(e.target.value);

						display.appendChild(text);
					}
					last_input_is_operator = true;
				}
			}
		});
	}

	// Equals Button
	document.getElementById("equals").addEventListener("click", function(e){

		// If the first button clicked is an equal the display blinks red
		if(!(to_be_calculated && to_be_calculated.length) && number == ''){
			display.style = "background-color: red; opacity: 0.4;";
			setTimeout(function(){display.style = "background-color: inherit";}, 150);
			return;
		}

		//If the to_be_calculated string contains a division by 0 an error messages is given out
		function checkDividedByZero(array){
			let indexes = [];
			let i = -1;
			while((i=array.indexOf("/", i+1)) != -1){
				indexes.push(i);
			}
			for(let j=0; j<indexes.length; j++){
				if(array[indexes[j]+1] == "0"){
					return true; 
				}
			}
		}

		if(result_shown == false){
			if(checkDividedByZero(to_be_calculated)){
				alert("You wanted to divide by zero. Now this website is locked for 24 hours!");
			} else {
				to_be_calculated.pop();
				result = computeResult(to_be_calculated);
				text = document.createTextNode(result); 
				display.appendChild(text);
				result_shown = true;
			}
		}
	});

}, false);