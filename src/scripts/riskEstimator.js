
// import functions from vue
import BackButton from "@/components/buttons/backButton.vue";
import DropdownIcon from "@/components/icons/dropdown_icon.vue";

export default {
    components: {
        BackButton,
        DropdownIcon
    },
    data(){
        return{
            quizCompleted: false,
            quizStarted: false,
            currentQuestion: 0,
            userResponses: [ null, null, null, null ], // array na magstore nung data
            showLearnMore: false,
            questions: [
                {
                    question: 'How old are you?',
                    options: [
                    { text: '< 22', points: 0 },
                    { text: '22-25', points: 4 },
                    { text: '26-32', points: 10 },
                    { text: '33-46', points: 12 },
                    { text: '47-54', points: 10 },
                    { text: '55-60', points: 4 },
                    { text: '> 60', points: 0 }
                    ],
                    selected: null,
                },
                {
                    question: 'Gender',
                    options: [
                    { text: 'Female', points: 0 },
                    { text: 'Male', points: 21 },
                    ],
                    selected: null,
                },
                {
                    question: 'Sexual practices',
                    options: [
                    { text: 'Sex with a male', points: 22 },
                    { text: 'Receptive anal intercourse', points: 8 },
                    { text: 'Vaginal intercourse', points: -10 },
                    { text: 'None of the above', points: 0 },
                    ],
                    selected: null,
                },
                {
                    question: 'Other risk factors',
                    options: [
                    { text: 'Injection drug use', points: 9 },
                    { text: 'Past HIV testing', points: -4 },
                    { text: 'Neither', points: 0 },
                    ],
                    selected: null, 
                }
            ]
        }
    },
    computed: {
        calculateTotalPoints(){
            let total = 0;
            for (const question of this.questions) {
                const selectedOption = question.selected;
                if (selectedOption !== null && selectedOption !== question.answer) {
                    total += question.options[selectedOption].points;
                }
            }
            return total;
        },
        totalPossiblePoints(){
            let total = 0;
            for (const question of this.questions) {
                total += question.options.reduce((acc, option) => acc + option.points, 0);
            }
            return total;
        },
        getCurrentQuestion(){
            let question = this.questions[this.currentQuestion];
            question.index = this.currentQuestion;
            return question;
        },
        calculatePercentage(){
            const percentage = (this.calculateTotalPoints / this.totalPossiblePoints) * 100;
            return percentage.toFixed(2);
        },
        calculateLabel(){
            const percentage = parseFloat(this.calculatePercentage);
            if (percentage < 20) {
                return 'Very low';
            } else if (percentage >= 20 && percentage < 30) {
                return 'Low';
            } else if (percentage >= 30 && percentage < 40) {
                return 'Moderate';
            } else if (percentage >= 40 && percentage < 50) {
                return 'High';
            } else {
                return 'Very high';
            }
        },
    },
    methods: {
        submit_risk_data(){
            // const data_ref = db_ref(db, 'risk_resources/' + user_id[0]);
            // const currentDate = new Date().getTime()
            // fireset(data_ref, {
            //     risk_points: this.calculateTotalPoints,
            //     risk_level: this.calculateLabel,
            //     risk_percentage: this.calculatePercentage,
            //     age_range: this.userResponses[0],
            //     sex: this.userResponses[1],
            //     sexual_practice: this.userResponses[2],
            //     other_risk_factor: this.userResponses[3],
            //     date: currentDate
            // }).then(() =>{
            //     console.log("risk results sent to db successfully!")
            // }).catch((error) => {
            //     console.log("failed sent: ", error)
            // })
            console.log('submitted');
        },            
        setAnswer(evt){
            const selectedOptionIndex = parseInt(evt.target);
            // dk if i should use evt target value
            const selectedOptionText = this.getCurrentQuestion.options[selectedOptionIndex].text;
            this.questions[this.currentQuestion].selected = selectedOptionIndex;
            this.userResponses[this.currentQuestion] = selectedOptionText; // para mastore yung data ng napili on each question
            evt.target.dispatchEvent(new Event('change'));
        },
        nextQuestion(){
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
            } else {
                this.quizCompleted = true;
            }
        },
        retakeQuiz(){
            this.quizCompleted = false;
            this.currentQuestion = 0;
            this.userResponses = [ null, null, null, null ]; // array na magstore nung data
            this.questions.forEach((index) => {
                index.selected = null
            })
        },
        startQuiz(){
            this.quizStarted = true;
        }

    },
    setup() { 
    },
};