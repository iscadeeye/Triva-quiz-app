// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

//global variables
let array = []
let answer
let random
let score = 0
let userInput = document.getElementById('input')
let question = document.querySelector('.question')
let failureMessage = document.querySelector('.failure-message')
let message = document.getElementById('message')
let main = document.querySelector('main')
let button = document.getElementById('submit-btn')

window.onload = fetchRandomQuestion
function fetchRandomQuestion () {
  fetch('https://jservice.io/api/random')
    .then(res => res.json())
    .then(data => {
      let id = data[0].category_id
      fetchQuestionsUsingCategoryId(id)
    })
}
function fetchQuestionsUsingCategoryId (id) {
  fetch(`https://jservice.io/api/clues?category=${id}`).then(res =>
    res.json().then(data => {
      data.map(item => {
        array.push([item.question, item.answer])
      })
      qAandAFunction()
    })
  )
}

/*a question should appear on page as soon as the user comes in.
user's click button should call a fuction that compares the user's answer and the answer from the API, and if the user's answer is correct, then another question should appear on the page.
*/

function qAandAFunction () {
  //generate a random number between 0 and array.length-1
  random = Math.floor(Math.random() * array.length)
  question.append(`${array[random][0]}`)
  answer = array[random][1].toLowerCase()
}

button.addEventListener('click', function (event) {
  event.preventDefault()

  let value = userInput.value.toLowerCase()
  userInput.value = ''
  if (value === answer) {
    question.innerHTML = ''
    array.splice(random, 1)
    score += 1
    render(score)
    if (array.length > 0) {
      qAandAFunction()
    } else {
      fetchRandomQuestion()
    }
  } else {
    score = 0
    newGame()
    render(score)
  }
})

function newGame () {
  score = 0
  //hide the main game from view
  mainGame = document.querySelector('main')
  mainGame.style.display = 'none'
  //give the user a way to start the game again.
  let newGame = document.querySelector('.new-game-starter')
  newGame.style.display = 'block'
}

function render (score) {
  if (score === 0) {
    failureMessage.append(`
    Your answer is incorrect 👎,
    your score is: ${score} 
`)
  } else {
    message.innerText = ''
    message.append(`
    Your answer is correct 👍, 
    you have a score of: ${score}`)
  }
}
