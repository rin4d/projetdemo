let container = document.querySelector('.container');
let btn = document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');
let levelContainer = document.querySelector('.level');

btn.onclick = function(){
    let score = 0;
    let time = 10;
    let level = 1;
    let alienSpeed = 1000;
    let alienCount = 3;

    container.innerHTML = "";

    let interval = setInterval(function(){
        let target = document.createElement('img');
        target.id ="target";
        target.src="silly.png";
        container.appendChild(target) ;
        target.style.top = Math.random() * (500 - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (600 - target.offsetWidth) + 'px';

        setTimeout(function(){
            target.remove();
        }, 2000)

        target.onclick = function(){
            score+= 1 ;
            target.style.display = 'none';
            scoreContainer.innerHTML = 'Score : ' + score;
        }
        time-= 1;

        if (score > 0 && score % 10 === 0) {
            level++;
            alienSpeed -= 100;
            alienCount += 2;
            levelContainer.innerHTML = 'Level : ' + level; // Mise à jour du niveau
        }

        scoreContainer.innerHTML = 'Score : ' + score;
        timeContainer.innerHTML = 'Time : ' + time;

        if(time == 0){
           clearInterval(interval);
           container.innerHTML = "Le jeu est terminé" 
        }
    }, alienSpeed);
}

