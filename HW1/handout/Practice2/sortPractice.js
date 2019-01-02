'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  var bigger;
  for(var i = 0; i <= input.length; i++){
    for(var j = i+1; j <= input.length; j++){
      if(input[i] > input[j]){
        bigger = input[i];
        input[i] = input[j];
        input[j] = bigger;
      }
    }
  }
  return input;
}

module.exports = sort