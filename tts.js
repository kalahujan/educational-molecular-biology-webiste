"use strict";
(function() {
    window.addEventListener("load", init);

    let score = 0;
    let solvedWords = new Set(); // Track which words have been solved
    let correctAnswers = [
        {type: "d1", answer: "DNA"},
        {type: "t1", answer: "MRNA"},
        {type: "d2", answer: "MUTASI"},
        {type: "t2", answer: "NUKLEUS"},
        {type: "d3", answer: "KODON"},
        {type: "t3", answer: "TRNA"},
        {type: "d4", answer: "GENOM"},
        {type: "t4", answer: "URASIL"},
        {type: "t5", answer: "RIBOSOM"}
    ];

    function init() {
        let buttons = document.querySelectorAll("button");
        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                let groupName = this.getAttribute('name');
                geserCek(groupName);
            });
        });
    }

    function geserCek(groupName) {
        let inputs = document.querySelectorAll('.' + groupName);

        if (inputs[0].disabled) {
            autoNext(0, groupName);
        } else {
            inputs[0].select();
        }

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('input', function() {
                if (i === inputs.length - 1 || 
                    (i === inputs.length - 2 && inputs[inputs.length - 1].disabled)) {
                    let answer = catString(groupName);
                    submitString(answer, groupName, inputs);
                } else {
                    autoNext(i, groupName);
                    let answer = catString(groupName);
                    submitString(answer, groupName, inputs);
                }
            });
        }
    }

    function autoNext(index, groupName) {
        let inputs = document.querySelectorAll('.' + groupName);
        if (inputs[index + 1] && inputs[index + 1].disabled) {
            inputs[index + 2].select();
        } else if (inputs[index + 1]) {
            inputs[index + 1].select();
        }
    }

    function catString(groupName) {
        let inputs = document.querySelectorAll('.' + groupName);
        let answer = '';
        for (let i = 0; i < inputs.length; i++) {
            answer += inputs[i].value;
        }
        return answer;
    }

    function submitString(answer, type, inputs) {
        let correctAnswer = correctAnswers.find(entry => 
            entry.type === type && answer.toUpperCase() === entry.answer
        );

        if (correctAnswer && !solvedWords.has(type)) {
            pengulanganTabel(inputs);
            
            solvedWords.add(type);
            score++;
            updateScore();
            
            checkCompletion();
        }
    }

    function updateScore() {
        document.getElementById('scoreText').textContent = "Skor Kamu: " + score;
    }

    function checkCompletion() {
        if (solvedWords.size === correctAnswers.length) {
            document.getElementById('scoreText').textContent = "Selamat kamu berhasil menyelesaikan teka teki silang ini. Keep The Good Work!";
        }
    }

    function pengulanganTabel(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    }
})();