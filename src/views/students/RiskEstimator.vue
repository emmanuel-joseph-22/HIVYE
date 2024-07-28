<template>
    <div class="flex flex-col text-white">
        <router-link :to="{ name: 'forum' }" class="fixed rounded-full p-2 m-3 hover:bg-gray-700">
            <BackButton />
        </router-link>
        <!-- Risk Estimator Section -->
        <section v-if="!quizStarted" class="w-8/12 h-screen mx-auto flex flex-col justify-center gap-4">
            <h1 class="text-3xl">Risk Estimator</h1>
            <p>Disclaimer: The risk estimator provided here is not a substitute for professional medical advice, 
                diagnosis, or treatment. It is intended to serve as a tool to help identify potential risks. 
                Always consult with a qualified healthcare professional for medical advice and assistance.</p>
            <button 
                @click="startQuiz"
                class="bg-white mx-auto text-darkBlue w-auto text-center text-lg rounded-xl px-5 py-1 hover:bg-matcha hover:text-white">
                Start the quiz
            </button>
        </section>
        <section class="w-8/12 h-auto my-12 mx-auto flex flex-col justify-center gap-4" v-if="!quizCompleted && quizStarted">
            <div class="flex flex-row w-full text-white">
                <span class="text-xl">{{ getCurrentQuestion.question }}</span>
                <span class="ml-auto text-lg text-gray-500"> Question {{ currentQuestion + 1 }} of {{ questions.length }}</span>
            </div>
            <!-- Quiz Options -->
            <div class="options">
                <!-- Option Labels -->
                <label
                    v-for="(option, index) in getCurrentQuestion.options"
                    :key="'option' + index"
                    class="text-darkBlue"
                    :class="{
                        'block p-4 mb-2 rounded cursor-pointer': true,
                        'bg-green-500 text-white': getCurrentQuestion.selected == index && index == getCurrentQuestion.answer,
                        'bg-gray-600 text-white': getCurrentQuestion.selected == index && index != getCurrentQuestion.answer,
                        'bg-gray-200': getCurrentQuestion.selected != null && index != getCurrentQuestion.selected,
                        'bg-gray-100 hover:bg-gray-300': getCurrentQuestion.selected == null
                    }">
                <!-- Option Radio Input -->
                <input
                    type="radio"
                    class="hidden"
                    :id="'option' + index"
                    :name="getCurrentQuestion.index"
                    :value="index"
                    v-model="getCurrentQuestion.selected"
                    :disabled="getCurrentQuestion.selected"
                    @change="setAnswer"
                />
                <span>{{ option.text }}</span>
                </label>
            </div>
            <!-- Next Question Button -->
            <button
                @click="nextQuestion"
                :disabled="getCurrentQuestion.selected === null"
                class="px-4 py-2 bg-matcha text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                {{
                    currentQuestion === (questions.length - 1)
                    ? 'Finish'
                    : getCurrentQuestion.selected === null
                    ? 'Select an option'
                    : 'Next question'
                }}
            </button>
        </section>
        <div v-if="!quizCompleted" class="fixed w-0 h-[8px] bg-red-500 z-auto b-0 transition-linear duration-500"
            :class="{
                'w-1/12': currentQuestion == 0 && quizStarted,
                'w-1/4': currentQuestion == 1,
                'w-2/4': currentQuestion == 2,
                'w-3/4': currentQuestion == 3,
                'w-4/4': quizCompleted
            }"></div>
        <section v-show="quizCompleted" class="w-7/12 h-screen mx-auto flex flex-col justify-center gap-4">
            <div class="rounded-xl p-4 flex flex-col justify-center items-center">
                <h2 class="text-xl text-gray-400">You have finished the test!</h2>
                <p class="text-3xl text-white">Percentage: {{ calculatePercentage }}%</p>
                <p class="text-2xl text-white">{{ calculateLabel }} Risk</p>
                <div v-if="calculateLabel === 'Very low'" class="text-center my-2">
                    <img class="mx-auto my-2 max-w-[80px] rounded-full" src="/public/riskQuiz/vlow.png" alt="Very Low Risk Icon" />
                    <p class="my-2 text-lg">Your risk of HIV transmission is extremely low. Continue practicing preventive measures and regular testing to maintain this low risk.</p>
                </div>
                <div v-if="calculateLabel === 'Low'" class="text-center my-2" >
                    <img class="mx-auto my-2 max-w-[80px] rounded-full" src="/public/riskQuiz/low.png" alt="Low Risk Icon" />
                    <p class="my-2 text-lg">Your risk of HIV transmission is relatively low. Ensure to continue preventive practices and regular testing to sustain this low risk.</p>                </div>
                <div v-if="calculateLabel === 'Moderate'" class="text-center my-2">
                    <img class="mx-auto my-2 max-w-[80px] rounded-full" src="/public/riskQuiz/mod.png" alt="Moderate Risk Icon" />
                    <p class="my-2 text-lg">You're at a moderate risk of HIV transmission. Reassess behaviors, consider preventive options like PrEP, and prioritize regular testing to manage this moderate risk</p>
                </div>
                <div v-if="calculateLabel === 'High'" class="text-center my-2">
                    <img class="mx-auto my-2 max-w-[80px] rounded-full" src="/public/riskQuiz/high.png" alt="High Risk Icon" />
                    <p class="my-2 text-lg">Your risk of HIV transmission is high. Immediate actions are necessary. Consult a healthcare professional, consider PrEP, adopt safer practices, and prioritize regular testing to lower this high risk.</p>
                </div>
                <div v-if="calculateLabel === 'Very high'" class="text-center my-2">
                    <img class="mx-auto my-2 max-w-[80px] rounded-full" src="/public/riskQuiz/vhigh.png" alt="Very High Risk Icon" />
                    <p class="my-2 text-lg">Your risk of HIV transmission is very high. Seek immediate medical advice, consider PrEP, strictly adhere to safer practices, and ensure frequent testing to address and lower this very high risk.</p>
                </div>

                <button class="bg-matcha py-2 px-4 rounded-lg flex hover:scale-105 transition duration-300" @click="showLearnMore==true">Learn More <DropdownIcon /></button>
                <div v-if="showLearnMore" class="p-2 bg-white rounded-lg">
                    <ul>
                        <li><a href="https://www.unitysexualhealth.co.uk/hiv-information-services-support-testing-treatments/hiv-risk-tests-treatments/" target="_blank">HIV – Risk, Tests & Treatments</a></li>
                        <li><a href="https://www.cdc.gov/hiv/basics/livingwithhiv/understanding-care.html" target="_blank">Understanding Care</a></li>
                    </ul>
                </div>
                
                <!-- submit data -->
                <div class="text-center p-4">
                    <hr>
                    <p class="my-4">
                        May we have your consent to record your HIV risk assessment 
                        for analytical purposes? This data aids us in refining support 
                        strategies for all users.
                    </p>
                    <button 
                        class="py-2 px-4 rounded-xl bg-red-600 mx-2 hover:bg-red-500 shadow-lg" 
                        @click="retakeQuiz">
                        Retake Quiz
                    </button>
                    <button 
                        class="py-2 px-4 rounded-xl bg-green-600 mx-2 hover:bg-green-500 shadow-lg" 
                        @click="submit_risk_data">
                        Submit my results
                    </button>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
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
</script>

<style scoped>

/*Responsive, 
Left and Right*/
        @media (max-width: 768px) {
            .left {
                width: 15%;
                transition: none;
            }
        
            .left:hover {
                width: 50%; 
            }
        
            .left .item {
                margin: 10px 0;
            }
        
            .right {
                width: 85%; 
                margin-left: 15%; 
            }
        }

        .disclaimer {
            background-color: white;
            border: 2px solid #630606;
            border-radius: 10px;
            margin-top: 9%;
            margin-left: 25%;
            width: 100%;
            max-width: 913px;
            padding: 10px;
            color: #630606;
        }
        h5 {
            color: #630606;
        }
        .quiz {
            background-color: white;
            padding: 1rem;
            width: 100%;
            max-width: 900px;
            border: 2px solid #630606;
            border-radius: 10px;
            margin: 0 auto;
            margin-top: 1%;
            margin-left: 25%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }

        .quiz-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        }

        .quiz-info .question {
        color: black;
        font-size: 1.25rem;
        }

        .quiz-info.score {
        color: #FFF;
        font-size: 1.25rem;
        }

        .options {
        margin-bottom: 1rem;
        }

        button:disabled {
        opacity: 0.5;
        }
        .finished-box {
        background-color: #F5F5F5;
        border: 2px solid #149536;
        padding: 10px;
        border-radius: 10px;
        margin: 20px 0;
        margin-top: 5px;
        margin-left: 25%;
        width: 914px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }


/* additional 
box */
       
        @media (max-width: 700px) {
            .disclaimer{
                margin-left: 20px;
                width: 83%;
                margin-top: 130px;
                text-align: justify;
            }
            
            .disclaimer h5{
                color: #630606;
            }
            .quiz {
                margin-top: 10px;
                margin-left: 20px;
                width: 80%;
                margin-bottom: 100px;
            }

            .options {
                width: 100%;
            }
            button {
                width: 100%;
            }

            .finished-box {
                width: 83%;
                margin-top: 8px;
                margin-left: 20px;
                margin-bottom: 100px;
            }

            .risk-info-box p {
                font-size: 12px;
            }
            .risk-info-box img {
                width: 50px;
                max-width: 120px;
                height: auto;
                margin-bottom: 10px;
                border-radius: 30px;
            }
        }
</style>