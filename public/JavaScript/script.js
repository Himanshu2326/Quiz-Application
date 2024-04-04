

//? JavaScript :-


/*
========================
* Add New Quiz
========================
*/

function addQuiz() {

     const questionsDiv = document.querySelector('.questions');
     const newQuestionDiv = document.createElement('div');
     newQuestionDiv.className = 'QuizQuestion';

     newQuestionDiv.innerHTML = `

    <h1 class="Question-h1">Enter Your Quiz</h1>

    <div class="form-group">
        <input type="text" class="form-control" id="question" autocomplete="off"  name="question" 
         aria-describedby="emailHelp" placeholder="Enter Question">
     </div>


    <div class="options">
         <h5>Options</h5>
         <div class="form-group">
         <input type="text" id="option1" class="form-control" name="option" autocomplete="off" placeholder="Option A">
         
    </div>

    <div class="form-group">
         <input type="text" id="option2" class="form-control" name="option" autocomplete="off" placeholder="Option B">
     
    </div>

    <div class="form-group">
         <input type="text" id="option3" class="form-control" name="option" autocomplete="off" placeholder="Option C">
         
    </div>

    <div class="form-group">
         <input type="text" id="option4" class="form-control" name="option" autocomplete="off" placeholder="Option D">
        
    </div>
    <label for="correctOption">Correct Option:</label>
    <select id="correctOption" name="correctOption" required>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
    </select>
   </div>
 </div>  `;

     questionsDiv.appendChild(newQuestionDiv);
}

