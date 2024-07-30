<template>
    <div class="flex flex-col text-white">
        <!-- Back button -->
        <router-link :to="{ name: 'forum' }" class="fixed rounded-full p-2 m-3 hover:bg-gray-700">
            <BackButton />
        </router-link>
        <!-- Risk Estimator Quiz Section -->
        <section v-if="!quizStarted && user" class="w-8/12 h-screen mx-auto flex flex-col justify-center gap-4">
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
        <!-- progress bar -->
        <div v-if="!quizCompleted" class="fixed w-0 h-[8px] bg-red-500 z-auto b-0 transition-linear duration-500"
            :class="{
                'w-1/12': currentQuestion == 0 && quizStarted,
                'w-1/4': currentQuestion == 1,
                'w-2/4': currentQuestion == 2,
                'w-3/4': currentQuestion == 3,
                'w-4/4': quizCompleted
            }">
        </div>
        <!-- results section -->
        <section v-show="quizCompleted" class="w-11/12 h-screen mx-auto flex flex-col justify-center gap-4">
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

                <button 
                    class="text-white py-2 px-4 rounded-lg flex hover:text-matcha hover:scale-125 transition duration-300" 
                    @click="showLearnMore = !showLearnMore">
                    Learn More 
                    <DropdownIcon />
                </button>
                <div v-if="showLearnMore" class="p-2 rounded-lg">
                    <ul>
                        <li>
                            <a 
                                href="https://www.unitysexualhealth.co.uk/hiv-information-services-support-testing-treatments/hiv-risk-tests-treatments/" 
                                target="_blank"
                                class="hover:text-matcha">
                                    HIV – Risk, Tests & Treatments
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://www.cdc.gov/hiv/basics/livingwithhiv/understanding-care.html" 
                                target="_blank"
                                class="hover:text-matcha">
                                Understanding Care
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- submit data -->
                <div class="text-center p-4 flex flex-col">
                    <hr>
                    <p class="my-4">
                        May we have your consent to record your HIV risk assessment 
                        for analytical purposes? This data aids us in refining support 
                        strategies for all users.
                    </p>
                    <div class="w-full mx-auto">
                        <button 
                            class="py-2 px-4 text-sm rounded-xl mx-1 bg-red-600 hover:bg-red-500 shadow-lg" 
                            @click="retakeQuiz">
                            Retake Quiz
                        </button>
                        <button 
                            class="py-2 px-4 text-sm rounded-xl mx-1 bg-green-600 hover:bg-green-500 shadow-lg" 
                            @click="submit_risk_data">
                            Submit my results
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script src="../../scripts/RiskEstimator.js">
</script>
