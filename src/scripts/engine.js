const state = {
    view: {// o view aqui faz alteraçoes de elementos visuais, diferente do value
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {//altera valor internamente
        timerId: null,
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        //actions é onde ta sendo executando alguma coisa, e nao armazenando variaveis

        countDownTimerId: setInterval(countDown, 1000),//state nao chama ele mesmo, tem q add os segundo de forma manual. e aqui q ta funcionando o Time
    }
};


function countDown(){
    //decrementa o tempo
    state.values.currentTime--;

    //atualiza o tempo de maneira visual
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <=0){
        clearInterval(state.actions.countDownTimerId);
        alert("Game Over! Sua pontuação foi: "+state.values.result)
    }
}
// de forma dinamica seria assim
/*
function playSound(audioname){
    let audio = new Audio(`../audios/${audioname}.m4a`);
    audio.volume = 0.3;
    audio.play();
}
//e pra chamar seria => playSound("hit");
assim nao precisaria fazer varias funçoes caso precisa de mais audios
*/

function playSound(){
    let audio = new Audio('/src/audios/hit.m4a');
    audio.volume = 0.2;
    audio.play();
}


function randomSquare() {
    //aqui esta removendo o inimigo
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    // math.floor pra deixar arredondado os numeros q forem saindo do random
    let randomNumber = Math.floor(Math.random() * 9);//vai ate 9
    let randomSquare = state.view.squares[randomNumber];
    //aqui esta adicionando o inimigo na tela de forma random
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;//esta pegando a posição do inimigo
}

function moveEnemy() {
    //aqui esta movendo o inimigo aletoriamente(pegando o randomSquare da função anterior) e mudando ele a cada "x" segundos
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

//listener é algo associado a um evento e ele fica "ouvindo"/esperando ser executado
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                //comparando se onde o usuario clicou é o mesmo de onde esta o inimigo, pra ai gerar uma açao
                state.values.result++;// add +1 a pontuação
                state.view.score.textContent = state.values.result;//guarda no texto e mostra a pontuaçaõ
                state.values.hitPosition = null; //para nao haver farming indevido clicando no mesmo lugar, resetando e colocando o inimigo em outro lugar
                playSound();
            }
        })//evento de click
    })
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();