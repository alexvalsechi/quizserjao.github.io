(function () {
  var questions = [{
    question: "O que se deve fazer quando acaba o combustivel da moto?",
    choices: ['Abastecer com combustível', 'Ligar para o guincho', 'Colocar água', 'Empurrar'],
    correctAnswer: 2
  }, {
    question: "Qual o melhor método para uma mulher ficar grávida?",
    choices: ['O espermatozóide fecundar o óvulo', 'Benção divina', 'Dando um choquinho'],
    correctAnswer: 2
  }, {
    question: "Quem é o melhor jogador de basquete do mundo?",
    choices: ['Lebron James', 'Jordan', 'Curry', 'Cadão'],
    correctAnswer: 3
  }, {
    question: "Qual festa foi a mais lotada do mundo?",
    choices: ['Rock in Rio', 'Festa dançante do amigo do cadão', 'Lollapaloza', 'Festeja'],
    correctAnswer: 1
  }, {
    question: "Explique recursividade:",
    choices: ['Um função que chama ele mesma', 'chamada que invoca ela mesma', 'Serjoo Serjoo Serjoo'],
    correctAnswer: 2
  }, {
    question: "O que jantar em horario de faculdade?",
    choices: ['Caviar', 'Lagosta', 'Ostras', 'Pizzada na aula'],
    correctAnswer: 3
  }, {
    question: "Como chamar atenção dos alunos para si?",
    choices: ['Dar cambalhota', 'Bater palma', 'Gritar HAAAAAA HIPNOTIZADOOOOOO'],
    correctAnswer: 2
  }

];

  

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Selecione uma resposta!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Questão ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function () {
      $('#question').remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {

          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>', { id: 'question' });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    if (numCorrect > 0) {
      score.append('Sabemos que seu Q.I. não é tão alto assim...mas receba seu prêmio:')
      score.append('<div class="button-final"><a class="button-a" href="imagem.html">Finalizar</a></div>');
    }

    return score;
  }
})();