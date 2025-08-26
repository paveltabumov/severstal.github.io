const scenes = {
    Start:{
        text: "Ты - сотрудик, работаешь с газовым оборудованием. Важно строго соблюдать правила безопасности",
        next:"start2",
        bg:"image/1img.png",
        bgAudio: "sound/fon2.mp3",
        unoAudio:"",
    },

    start2:{
        text: "Ты знаешь, что газы - опасны. Природный газ легче воздуха, без цвета и запаха. Доменный и конвертерные газы - тяжелее воздуха и могут скапливаться в подвалах.",
        next:"start3",
        bg:"image/2img.png",
        bgAudio: "",
        unoAudio:"",
    },

    start3:{
        text: "Коксовый газ пахнет нефталином. Сжиженные газы(пропан, бутан) тяжелее воздуха и опасны обморожением",
        next:"start4",
        bg:"image/3img.png",
        bgAudio: "",
        unoAudio:"",
    },

    start4:{
        text: "Ты начинаешь свой обычный рабочий день, ничего не предвещает беды",
        next:"Koks_gaz",
        bg:"image/zav1.png",
        bgAudio: "",
        unoAudio:"sound/start.mp3",
    },

    Koks_gaz:{
        text: "Ты чувствуешь странный запах, когда поднимаешься по лестнице. Что делать?",
        bg:"image/gaz1.png",
        bgAudio: "sound/zs4.mp3",
        unoAudio:"",
        damage:20,
        choices:[
            {text: "Игнорировать и работать дальше", next:"LowOxygen"},
            {text: "Сообщить и покинуть помещение", next:"After_Koks"}
        ]
    },

    LowOxygen:{
        text: "Ты чувствуешь отравление и у тебя начинает темнеть в глазах",
        next:"toxic",
        damage:50,
        bg:"image/badwork.png",
        bgAudio: "",
        unoAudio:"sound/kashel.mp3",
    },

    toxic:{
        text: "Ты отравиляешься Коксовым газом. Он легче воздуха и у него есть нафталиновый запах.",
        bg:"image/game_over.jpg",
        bgAudio:"end",
        unoAudio:"sound/end.mp3",
        damage:30,
    },

    After_Koks:{
        text: "Ты выходишь из помещения, которое было заполнено Коксовым газом.",
        bg:"image/after.png",
        bgAudio: "sound/zs.mp3",
        unoAudio:"",
        next:"Propan"
    },

    Propan:{
        text: "Ты видишь снежную корку на баллоне - идёт утечка. Твои действия?",
        bg:"image/cold.png",
        bgAudio: "",
        unoAudio:"sound/propan.mp3",
        damage:5,
        choices:[
            {text: "Попробовать устранить утечку", next:"Cold"},
            {text: "Отойти и сообщить руководству", next:"After_Propan"}
        ]
    },

    Cold:{
        text: "Ты получаешь обморожение рук, так как этот газ - пропан. Он может вызвать обморожение при утечке",
        bg:"image/coldhand.png",
        damage:50,
        bgAudio: "",
        unoAudio:"sound/bol.mp3",
        next:"ColdEnd"
    },

    ColdEnd:{
        text: "Ты не можешь спуститься с лестницы вниз из-за обморожения и теряешь сознание от удушения.",
        bg:"image/game_over.jpg",
        damage:25,
        bgAudio: "end",
        unoAudio:"sound/end.mp3",
    },

    After_Propan:{
        text: "Ты шёл на выход и нашел костюм с маской, который может помочь в случае выделения большого количества углекислого газа или пожара",
        bg:"image/mask.png",
        damage:-25,
        bgAudio: "sound/zs2.mp3",
        unoAudio:"sound/tr.mp3",
        next:"Fire"
    },

    Fire:{
        text: "Ты видишь как из-за двери вырывается углекислый газ и кто-то просит о помощи",
        bg:"image/door.png",
        bgAudio: "sound/fire2.mp3",
        unoAudio:"sound/krik.mp3",
        choices:[
            {text: "Помочь", next:"Open_the_door"},
            {text: "Бежать к выходу и сообщить пожарным", next:"nodoor"}
        ]
    },

    nodoor:{
        text: "Ты не помогаешь человеку выбраться из помещения, наполненного углекислым газом и сам бежишь в безопастное место",
        bg:"image/solo.png",
        damage:15,
        bgAudio: "sound/fire1.mp3",
        unoAudio:"sound/beg.mp3",
        next:"BadEnd",
    },

    BadEnd:{
        text: "Ты приходишь в безопастное место и сообщаешь МЧС о местах опасности и о сотруднике в беде. Сотруднник сильно пострадал.",
        bg:"image/soloend.png",
        damage:-15,
        bgAudio: "",
        unoAudio:"sound/fireend.mp3",
    },

    Open_the_door:{
        text: "Ты помогаешь человеку выбраться из помещения, наполненного углекислым газом",
        bg:"image/doorGazHelp.png",
        damage:20,
        bgAudio: "sound/fire1.mp3",
        unoAudio:"",
        next:"GoodEnd",
    },

    GoodEnd:{
        text: "Вы пришли в безопастное место и сообщили МЧС о местах опасности.",
        bg:"image/duoend.png",
        damage:-20,
        bgAudio: "",
        unoAudio:"sound/fireend.mp3",
    },
}

let currentScene = "Start";
let bgAudio = new Audio();
let unoAudio = new Audio();
bgAudio.loop = true;

let playerHP = 100;

function updateHP(playerHP){
    const hpbar = document.getElementById("hp-fill");
    const hptext = document.getElementById("hp-txt");
    hptext.textContent = playerHP;
    hpbar.style.width = playerHP + "%";
    if (playerHP <= 25){
        hpbar.style.background = "red";
    }
    else if (playerHP <= 50){
        hpbar.style.background = "orange";
    }
    else if (playerHP <= 75){
        hpbar.style.background = "yellow";
    }
    else{
        hpbar.style.background = "green";
    }
}

function applyDamage(damage){
    playerHP -= damage;
    if(playerHP < 0){
        playerHP = 0;
    }
    updateHP(playerHP);
    if(playerHP === 0){
        showScene("gg");
        return false;
    }
    return true;
}

function setbgAudio(src){
    if(bgAudio.src !== src){
        bgAudio.pause();
        bgAudio = new Audio(src);
        bgAudio.loop = true;
        bgAudio.volume =0.3;
        bgAudio.play();
    } 
}

function playUnoAudio(src){
    unoAudio.pause();
    unoAudio = new Audio(src);
    unoAudio.volume = 1;
    unoAudio.play();
}

function showScene(sceneName){
    const scene = scenes[sceneName];
    

    if(scene.bgAudio){
        setbgAudio(scene.bgAudio);
    }
    if(scene.bgAudio == "end"){
        bgAudio.pause();
    }

    playUnoAudio(scene.unoAudio);

    const text = document.getElementById("text");
    text.textContent = scene.text; 

    const choices = document.getElementById("choices");
    choices.innerHTML = "";

    const image = document.getElementById("image");
    if (scene.bg){
        image.style.backgroundImage = "url('" + scene.bg + "')";
        image.style.backgroundSize = "cover";
        image.style.backgroundPosition = "center"
    }
    image.innerHTML = "";
    if(scene.heroLeft){
        const hero = document.createElement("img");
        hero.src = scene.heroLeft;
        hero.className = "hero-left";
        image.appendChild(hero);
    }
    if(scene.heroRight){
        const hero = document.createElement("img");
        hero.src = scene.heroRight;
        hero.className = "hero-right";
        image.appendChild(hero);
    }

    if (scene.choices){
        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.className = "choice-btn"
            button.textContent = choice.text;
            button.onclick = () => {
                currentScene = choice.next;
                showScene(currentScene);
            }
            choices.appendChild(button);
        })
    }

    else if (scene.next){
        const btn = document.createElement("button");
        btn.className = "next"
        btn.textContent = "Далее";
        btn.onclick = () => showScene(scene.next);
        choices.appendChild(btn);
    }
    if (scene.damage){
        const alive = applyDamage(scene.damage)
        if(!alive) return;
    }
}

document.addEventListener("DOMContentLoaded", function(){showScene(currentScene);});