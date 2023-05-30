// Function to print highscores on the page
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // sort highscores by score property in descending order  
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });
  
  // li tag for each high score
  for (var i = 0; i < highscores.length; i += 1) {
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    // display on page
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

// Function to clear highscores
function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// run function when page loads
printHighscores();
