// ------------ DISPLAY QUIZ TOTAL FINAL SCORE ------------- //
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})


// ------------ SAVE HIGH SCORE ------------- //
saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    leaderboard.push(score)

    leaderboard.sort((a,b) => {
        return b.score - a.score
    })

    leaderboard.splice(5)

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
    window.location.assign('')
}