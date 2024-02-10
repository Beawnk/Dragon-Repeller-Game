let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["graveto"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "graveto",
        power: 5
    },
    {
        name: "adaga",
        power: 30
    },
    {
        name: "machado",
        power: 50
    },
    {
        name: "espada",
        power: 100
    }

];
const monsters = [ 
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "goblin",
        level: 8,
        health: 60
    },
    {
        name: "dragão",
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name: "Centro da cidade",
        "button text": ["Ir para a loja", "Ir para a caverna", "Lutar com o dragão"],
        "button functions": [goLoja, goCaverna, fightDragon],
        text: "Você está no centro da cidade. Você vê uma placa que diz \"Loja\"."
    },
    {
        name: "Loja",
        "button text": ["Comprar poção de cura (10 ouro)", "Comprar nova arma (30 ouro)", "Voltar para a cidade"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Você entra na loja."
    },
    {
        name: "Caverna",
        "button text": ["Lutar com slime", "Lutar com goblin", "Voltar para a cidade"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "Você entra na caverna. É escuro e úmido. Você ouve barulhos estranhos."
    },
    {
        name: "Lutar",
        "button text": ["Atacar", "Esquivar", "Fugir"],
        "button functions": [attack, dodge, goTown],
        text: "Você encontra um monstro!"
    },
    {
        name: "Matar monstro",
        "button text": ["Voltar para a cidade", "Voltar para a cidade", "Voltar para a cidade"],
        "button functions": [goTown, easterEgg, easterEgg],
        text: 'Você derrota o monstro. Você ganha ouro e experiência. Você agora tem ' + gold + ' ouro e ' + xp + ' experiência.'
    },
    {
        name: "Derrota",
        "button text": ["Novo jogo", "Novo jogo", "Novo jogo"],
        "button functions": [restart, restart, restart],
        text: "Você morreu! Você perdeu o jogo. Tente novamente."
    },
    {
        name: "Vitória",
        "button text": ["Novo jogo", "Novo jogo", "Novo jogo"],
        "button functions": [restart, restart, restart],
        text: "Você derrotou o dragão e venceu o jogo! Parabéns!"
    },
    {
        name: "Easter egg",
        "button text": ["2", "8", "Voltar para a cidade"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "Você caminha até um beco escuro e encontra um homem misterioso. Ele diz que tem um jogo para você. Escolha um número entre 0 e 10. Se o número que você escolher estiver entre os 10 números que ele escolher, você ganha 20 ouro. Se não, você perde 10 de vida."
    }
];


function goTown() {
    update(locations[0]);
    document.body.className = '';
    document.body.classList.add('town');
}

function goLoja() {
    update(locations[1]);
    document.body.className = '';
    document.body.classList.add('store');
}

function goCaverna() {
    update(locations[2]);
    document.body.className = '';
    document.body.classList.add('cave');
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;

        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else {
        text.innerText = "Você não tem ouro suficiente para comprar uma poção de cura.";
    }
}

function buyWeapon() {  
    if (currentWeapon < weapons.length - 1){
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);

            goldText.innerText = gold;
            text.innerText = "Você agora tem " + newWeapon + ".";
            text.innerText += " No seu inventário você tem: " + inventory;
        }
        else {
            text.innerText = "Você não tem ouro suficiente para comprar uma nova arma.";
        }
    }
    else {
        text.innerText = "Você já tem a melhor arma do jogo!";
        button2.innerText = "Vender arma por 15 ouro";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        let currentWeapon;
        currentWeapon = inventory.shift();
        gold += 15;
        goldText.innerText = gold;
        text.innerText = "Você vendeu " + currentWeapon + ".";
        text.innerText += " No seu inventário você tem: " + inventory;
    }
    else {
        text.innerText = "Você não pode vender sua única arma.";   
    }
}

function goFight() {
    update(locations[3]);
    monsterName.innerText = monsters[fighting].name;
    monsterHealth = monsters[fighting].health;
    monsterStats.classList.remove('off');
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function fightSlime() {
  fighting = 0;
  document.body.classList.add('slime');
  goFight();
}

function fightBeast() {
  fighting = 1;
  document.body.classList.add('goblin');
  goFight();
}

function fightDragon() {
  fighting = 2;
  document.body.classList.add('dragon');
  goFight();
}

function attack() {
    text.innerText = "O" + monsters[fighting].name + " ataca.";
    text.innerText += " Você o ataca com " + weapons[currentWeapon].name + ".";

    health -= getMonsterAttackValue(monsters[fighting].level);
    
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp);
    }
    else {
        text.innerText += " Você errou.";
    }
    
    monsterHealthText.innerText = monsterHealth;
    healthText.innerText = health;
    if (health <= 0) {
        lose();
    }
    else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        }
        else {
            defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += inventory.pop() + " quebrou.";
        currentWeapon--;
    }
}

function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));

    console.log(hit);

    return hit > 0 ? hit : 0;
}

function dodge() {
    text.innerText = "Você esquiva do ataque de " + monsters[fighting].name + ".";
}

function pick(guess) {
    const numbers = [];

    while (numbers.length < 10) {    
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText =  "Você escolheu " + guess + ". Esses são os números:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.includes(guess)) {
        text.innerText += "Acertou! Você ganha 20 de ouro.";
        gold += 20;
        goldText.innerText = gold;
    } 
    else {
        text.innerText += "Errou! Você perde 10 de vida.";
        health -= 10;
        healthText.innerText = health;

        if (health <= 0) {
            lose();
        }
    }
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function lose() {
    update(locations[5]);
    document.body.className = '';
    document.body.classList.add('lose');
}

function winGame() {
    update(locations[6]);
    document.body.className = '';
    document.body.classList.add('win');
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);  
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;

    update(locations[4]);
}

function update(location) {
    monsterStats.classList.add('off');
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerHTML = location.text;
}

function easterEgg() {
    update(locations[7]);
    document.body.className = '';
    document.body.classList.add('easter');
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["graveto"];

    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;

    goTown();
}

//initialize buttons
button1.onclick = goTown;
button2.onclick = goCaverna;
button3.onclick = fightDragon;