// referens
let questionDisplayer = document.getElementById("question");
let checkOpt1 = document.getElementById("opt1");
let checkOpt2 = document.getElementById("opt2");
let checkOpt3 = document.getElementById("opt3");
let displayOpt1 = document.getElementById("displayOpt1");
let displayOpt2 = document.getElementById("displayOpt2");
let displayOpt3 = document.getElementById("displayOpt3");
let btn = document.getElementById("btn");
let result = document.getElementById("result");
let getName = document.getElementById("getName");
let getQuestions = document.getElementById("getQuestions");
let start = document.getElementById("start");
let displayQuestionAmount = document.getElementById("displayQuestionAmount");
let qPanel = document.getElementById("qPanel");
let input = document.getElementById("input");

// styling
result.style.display = "none";
qPanel.style.display = "none";

class Question {
    constructor(q, opt1, opt2, opt3, answer) {
        this.q = q;
        this.opt1 = opt1;
        this.opt2 = opt2;
        this.opt3 = opt3;
        this.answer = answer;
    }
}

class Quiz {
    constructor(playerName, questionAmount) {
        this.playerName = playerName;
        this.questionAmount = questionAmount;

        this.questionIndex = 0;  
        this.allQuestions = [];
        this.checkArray = [];
        this.points = 0;      
    }

    displayQuiz() {
        let json = getJSON("http://www.mocky.io/v2/5d98d6523400005d00f48abf");

        for (let question of json) {
            let foo = new Question(question.q, question.opt1, question.opt2, question.opt3, question.answer);
            this.allQuestions.push(foo);
        }
        
        // Show question and opt
        questionDisplayer.innerHTML = this.allQuestions[this.questionIndex].q;
        displayOpt1.innerHTML = this.allQuestions[this.questionIndex].opt1;
        displayOpt2.innerHTML = this.allQuestions[this.questionIndex].opt2;
        displayOpt3.innerHTML = this.allQuestions[this.questionIndex].opt3;
        displayQuestionAmount.innerHTML = this.questionIndex + 1 + "/" + this.questionAmount;
    }

    check() {
        // kolla om checkbox är checked
        if (checkOpt1.checked == true) {
            this.checkArray.push(displayOpt1.innerHTML);
        } 
        if (checkOpt2.checked == true) {
            this.checkArray.push(displayOpt2.innerHTML);
        }
        if (checkOpt3.checked == true) {
            this.checkArray.push(displayOpt3.innerHTML);
        }
        
        // jämföra checked checkbox med answer
        //if (checkArray )
        if (this.checkArray == this.allQuestions[this.questionIndex].answer) {  
            this.points++;
        }    
    }    
    
    updateQuestion() {
        //ändra innerHTML till nästa index och checkar checkbox: true or false
        if (this.questionIndex + 1 >= this.questionAmount) {
            result.style.display = "block";
            qPanel.style.display = "none";
    
            result.innerHTML = getName.value + " fick " + this.points + "/" + this.questionAmount; 
        } else {
            this.questionIndex++;  
            this.checkArray = [];
            if (checkOpt1.checked == true) {
                checkOpt1.checked = false;
            } 
            if (checkOpt2.checked == true) {
                checkOpt2.checked = false;
            }
            if (checkOpt3.checked == true) {
                checkOpt3.checked = false;
            }
        }
        
        // Show question and opt
        questionDisplayer.innerHTML = this.allQuestions[this.questionIndex].q;
        displayOpt1.innerHTML = this.allQuestions[this.questionIndex].opt1;
        displayOpt2.innerHTML = this.allQuestions[this.questionIndex].opt2;
        displayOpt3.innerHTML = this.allQuestions[this.questionIndex].opt3;
        displayQuestionAmount.innerHTML = this.questionIndex + 1 + "/" + this.questionAmount;
    }
}

start.addEventListener("click", function() {
    input.style.display = "none";
    qPanel.style.display = "block";
    let name = getName.value;
    let questAmount = getQuestions.value;
    let x = new Quiz(name, questAmount);

    displayQuestionAmount.innerHTML = x.questionIndex + 1 + "/" + questAmount;
    x.displayQuiz();
    btn.addEventListener("click", function() {
        x.check();
        x.updateQuestion();  
    });
});
