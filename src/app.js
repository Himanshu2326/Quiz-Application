
/*
==========================
? => Node Js :-
==========================
*/

require('./DB/Database');
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const adminLogin = require('./Models/AdminSchema');
const studentLogin = require('./Models/StudentSchema');
const QuizDetail = require('./Models/QuizSchema');
const quizResult = require('./Models/QuizResultSchema');
const studentDetail = require('./Models/StudentSchema');
const { log } = require('handlebars/runtime');
const port = process.env.port || 1000;


/*
==========================
* => Required Paths
==========================
*/

const publicPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../Templates/views");
const partialsPath = path.join(__dirname, "../Templates/Partials");


/*
==========================
* => Linking Paths
==========================
*/

app.use(express.static(publicPath));
app.use(express.static(templatesPath));


//! Important To Store Json data
app.use(express.json());                          // To Tell The Express That the Data is Json();
app.use(express.urlencoded({ extended: false }))


/*
==========================
* =>  hbs Setup
==========================
*/


app.set("view engine", "hbs");
app.set('views', templatesPath);
hbs.registerPartials(partialsPath)


/*
==========================
! => Rendering 
==========================
*/

//* Index :- 
app.get('/', (req, res) => {
    res.render('index');
})


//* Sign Up :-
//* Index :- 
app.get('/signup', (req, res) => {
    res.render('signup');
})


//* Rendering Admin  :-
app.get('/admin', (req, res) => {
    res.render('admin');
})

//* Rendering Admin  :-
app.get('/dashboardAdmin', (req, res) => {
    res.render('dashboardAdmin');
})


//* Rendering Student :- 
app.get('/student', (req, res) => {
    res.render('student');
})

//* Rendering dashboardStudent  :-
app.get('/dashboardStudent', async (req, res) => {
    const studentEmail = req.query.student_email;
    findNameAndQuiz(studentEmail)
})


//* Rendering quizTset  :-
app.get('/quizTest', async (req, res) => {

    res.render('quizTest')

})



/*
==========================
! => Login 
==========================
*/


/*
-------------------------
* => Admin Login
-------------------------
*/

app.post('/admin', async (req, res) => {

    try {
        const enterEmail = req.body.email;
        const enterPassword = req.body.password;

        const adminLoginData = await adminLogin.findOne({ email: enterEmail });

        if (!adminLoginData) {
            const adminlogin = new adminLogin({
                email: req.body.email,
                password: req.body.password
            })
            const saveUser = await adminlogin.save();
            res.render('dashboardAdmin')
        }

        else if (enterEmail == adminLoginData.email && enterPassword == adminLoginData.password) {
            res.render('dashboardAdmin')
        }
        else {
            const adminlogin = new Login({
                email: req.body.email,
                password: req.body.password
            })
            const saveUser = await adminlogin.save();
            res.render('dashboardAdmin')
        }


    } catch (error) {
        res.send(error)
        console.log(error);

    }
})


/*
--------------------------
* => Student Login
--------------------------
*/

app.post('/student', async (req, res) => {

    function findNameAndQuiz(enterEmail) {
        studentLogin.findOne({ email: enterEmail })
            .then((data) => {
                return data;
            })
            .then((data) => {
                QuizDetail.find({})
                    .then((quiz) => {
                        res.render('dashboardStudent', { data, quiz })
                    })
            })
            .catch((e) => [
                res.send('Error')
            ])
    }


    try {
        const enterEmail = req.body.email;
        const enterName = req.body.name;
        const enterPassword = req.body.password;


        const studentData = await studentLogin.findOne({ email: enterEmail });
        //? When User Email Not Exists:-- 
        if (!studentData) {
            const studentlogin = new studentLogin({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            })
            const saveUser = await studentlogin.save();
            findNameAndQuiz(enterEmail)

        }

        //? When User Exists:-- 
        else if (enterEmail == studentData.email && enterPassword == studentData.password && enterName == studentData.name) {
            findNameAndQuiz(enterEmail)
        }

        //? When User Email Exists but differnt data:-- 
        else {
            const studentlogin = new studentLogin({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            })
            const saveUser = await studentlogin.save();
            findNameAndQuiz(enterEmail)
        }


    } catch (error) {
        res.send(error)
        console.log(error);

    }
})



/*
==========================
? => Quiz Section
==========================
*/

//* Quiz Database :- 
app.post('/quiz', async (req, res) => {
    try {
        const title = req.body.title;
        const question = req.body.question;
        const options = req.body.option;
        const selectedOption = req.body.correctOption;
        const adminEmail = req.body.adminEmail;
        const adminName = req.body.adminName;

        if (!title) {
            return res.status(400).send('No Title Given');
        }


        //? For single Quiz :-  
        if (!Array.isArray(question)) {
            const quizData = new QuizDetail({
                title: title,
                adminEmail: adminEmail,
                adminName: adminName,
                questions: {
                    question: question,
                    options: options.map((opt, i) => ({
                        option: opt,
                        isCorrect: selectedOption === `option${i + 1}`
                    }))
                }
            });

            let savedata = await quizData.save();
            res.send('Single Quiz created successfully');

        } else {

            //? For Multiple Quiz :-  
            const quizData = new QuizDetail({
                title: title,
                adminEmail: adminEmail,
                adminName: adminName,
                questions: [],
            });

            for (let i = 0; i < question.length; i++) {
                quizData.questions.push({
                    question: question[i],
                    options: options.slice(i * 4, (i + 1) * 4).map((opt, index) => ({
                        option: opt,
                        isCorrect: selectedOption[i] === `option${index + 1}`
                    }))
                });
            }

            let savedata = await quizData.save();
            res.send('Quiz created successfully');

        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



//* Quiz Test :- 
app.get('/quizTest/:id', (req, res) => {

    let id = req.params.id;
    let name = req.query.studentName;
    let email = req.query.studentEmail;


    studentLogin.findOne({ email: email })
        .then((studentData) => {
            return studentData;
        })
        .then((studentData) => {
            QuizDetail.find({ _id: id })
                .then((quiz) => {
                    res.render('quizTest', { quiz, studentData });
                })
                .catch((e) => {
                    res.send(e)
                })
        })
        .catch((e) => {
            res.send(e)
        })
})



/*
==========================
? => Quiz Result 
==========================
*/
app.get('/quizTestSubmit', async (req, res) => {

    try {

        const studentName = req.query.student_Name;
        const QuizTitle = req.query.Quiz_title;
        const studentEmail = req.query.student_email;
        const Quiz_Id = req.query.Quiz_Id;
        const Student_Ans = JSON.parse(req.query.Student_Ans);
        let score = 0;


        await QuizDetail.find({ _id: Quiz_Id })
            .then((Quiz) => {

                let QuestionLength = Quiz[0].questions.length;

                for (let i = 0; i < QuestionLength; i++) {

                    let DdQuestionID = Quiz[0].questions[i]._id;

                    Student_Ans.forEach((e) => {
                        let DbOptionisCorrect = Quiz[0].questions[i].options.filter((e) => {
                            return e.isCorrect == true
                        }).map((e) => e._id);

                        if (e.Question == DdQuestionID) {

                            if (DbOptionisCorrect == e.option) {
                                score++;
                            }
                        }
                    })
                }

                function findNameAndQuiz(enterEmail) {
                    studentLogin.findOne({ email: enterEmail })
                        .then((data) => {
                            return data;
                        })
                        .then((data) => {
                            QuizDetail.find({})
                                .then((quiz) => {
                                    res.render('dashboardStudent', { data, quiz, studentName, QuizTitle, score })
                                })
                        })
                        .catch((e) => [
                            res.send('Error')
                        ])
                }
                findNameAndQuiz(studentEmail)
            })
            .catch((e) => {
                console.log(e);
            })



    } catch (error) {
        res.send(error);
    }

})



/*
==========================
! => Log Out
==========================
*/
app.get('/logout', (req, res) => {
    res.render('index')
})


/*
==========================
* => Listning Port
==========================
*/
app.listen(port, () => {
    console.log('Yes You Are Live at Port 1000');
})
