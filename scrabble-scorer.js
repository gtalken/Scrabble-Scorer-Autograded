// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("\nLet's play some scrabble!\n");
   let userReponse = input.question("Enter a word to score:")
   return userReponse
};
function simpleScorer(word){
  return word.length;
}
function vowelBonusScorer(word){
   word=word.toUpperCase();
   let score=0
   const vowels= ['A','E','I','O','U'];
   for(let i=0; i< word.length; i++){
      if (vowels.includes(word[i])){
         score+=3
      }else {
         score +=1
      }
   }
   return score;
}



function scrabbleScorer(word){
   word=word.toLowerCase();
   let score=0;

   for (let i=0;i<word.length;i++){
      let letter= word[i];
      score += newPointStructure[letter]
   }
   return score;

}
let scoringAlgorithms= [
   {name: "Simple", description: "One point per character", scorerFunction: simpleScorer} ,
   {name: "Vowel Bonus", description: "Vowels are worth 3 points", scorerFunction: vowelBonusScorer} ,
   {name: "Scrabble", description: "Uses scrabble point system", scorerFunction: scrabbleScorer} 
    ];
function scorerPrompt() {
   console.log("\nWhich scoring algorithm would you like to use?\n");
   for (let i=0; i< scoringAlgorithms.length;i++ ){
      console.log(`${i}-${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
   }
    
    let userChoice= Number(input.question("Enter 0, 1, or 2: "));

   if (userChoice===0){
      return  {name:"Simple", description: "One point per character", scorerFunction: simpleScorer};
   } else if(userChoice===1){
     return  {name: "Vowel Bonus",description:"Vowels are worth 3 points",scorerFunction: vowelBonusScorer};
   } else if(userChoice===2){
      return {name:"Scrabble",description: "Uses scrabble point system",scorerFunction: scrabbleScorer}
   } 

}

function transform(oldPointStructure) {
   let newPointStructure={};
   

   for(let pointValue in oldPointStructure){
      let lettersarray = oldPointStructure[pointValue];

      for(let i=0; i<lettersarray.length;i++){
         let letter=lettersarray[i].toLowerCase();
         newPointStructure[letter]=Number(pointValue);
      }
   }
   return newPointStructure;
};

let newPointStructure= transform(oldPointStructure)
console.log(newPointStructure)

function runProgram() {
   let userWord= initialPrompt();

    let selectedScorer = scorerPrompt();

    let score = selectedScorer.scorerFunction(userWord);

    console.log(`Score for '${userWord}' ${score}`);
   
   
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
