class Question {
    constructor(q, opt1, opt2, opt3, answer) {
        this.q = q;
        this.opt1 = opt1;
        this.opt2 = opt2;
        this.opt3 = opt3;
        this.answer = answer;
    }
}
// variabler
let questionIndex = 0; //för att 
let allQuestions = [];
let checkArray = [];
let points = 0;

let json = getJSON("http://www.mocky.io/v2/5d91eaa9310000d4a910cbce");

for (let question of json) {
    let x = new Question(question.q, question.opt1, question.opt2, question.opt3, question.answer);
        allQuestions.push(x);
    
}

// referens
let questionDisplayer = document.getElementById("question");
let checkOpt1 = document.getElementById("opt1");
let checkOpt2 = document.getElementById("opt2");
let checkOpt3 = document.getElementById("opt3");
let displayOpt1 = document.getElementById("displayOpt1");
let displayOpt2 = document.getElementById("displayOpt2");
let displayOpt3 = document.getElementById("displayOpt3");
let btn = document.getElementById("btn");


 // Show question and opt
 questionDisplayer.innerHTML = allQuestions[questionIndex].q;
 displayOpt1.innerHTML = allQuestions[questionIndex].opt1;
 displayOpt2.innerHTML = allQuestions[questionIndex].opt2;
 displayOpt3.innerHTML = allQuestions[questionIndex].opt3;


btn.addEventListener("click", function() {
    console.log(allQuestions[questionIndex].q);
    check();
    updateQuestion();  
});

function check() {
    // kola om checkbox checked
    if (checkOpt1.checked == true) {
        checkArray.push(displayOpt1.innerHTML);
    } 
    if (checkOpt2.checked == true) {
        checkArray.push(displayOpt2.innerHTML);
    }
    if (checkOpt3.checked == true) {
        checkArray.push(displayOpt3.innerHTML);
    }
    
    // jämföra checked checkbox med answer
    //if (checkArray )
    if (checkArray == allQuestions[questionIndex].answer) {
        points++;
    }   
    console.log(points);
    console.log(allQuestions[questionIndex].answer);
    console.log(checkArray);
    
}

function updateQuestion() {
    //ändra innerHTML till nästa index
    questionIndex++;  
    checkArray = [];
    if (checkOpt1.checked == true) {
        checkOpt1.checked = false;
    } 
    if (checkOpt2.checked == true) {
        checkOpt2.checked = false;
    }
    if (checkOpt3.checked == true) {
        checkOpt3.checked = false;
    }

    // Show question and opt
    questionDisplayer.innerHTML = allQuestions[questionIndex].q;
    displayOpt1.innerHTML = allQuestions[questionIndex].opt1;
    displayOpt2.innerHTML = allQuestions[questionIndex].opt2;
    displayOpt3.innerHTML = allQuestions[questionIndex].opt3;
}


//Ta emot input för username och antal frågor
//Starta quiz
//Uppdatera quizen samt frågorna med submit
//
//avsluta quiz, visa resultat



