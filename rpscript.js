const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const startButton = document.getElementById('start-button');
const characterName = document.getElementById('character-name');
const characterClan = document.getElementById('character-clan');
const characterXp = document.getElementById('character-xp');
const characterMoney = document.getElementById('character-money');
const characterReputation = document.getElementById('character-reputation'); // Добавлено для репутации
const chooseClanButton = document.getElementById('choose-clan-button');
const choiceContainer = document.getElementById('choice-container');
const sufiButton = document.getElementById('sufi-button');
const saliButton = document.getElementById('sali-button');
const mapContainer = document.getElementById('map-container');
const taskContainer = document.getElementById('task-container');
const taskDescription = document.getElementById('task-description');
const completeTaskButton = document.getElementById('complete-task-button');
const subtitles = document.getElementById('subtitles');

let chosenClan = null;
let currentTask = null;
let playerName = "";
let xp = 0;
let money = 0;
let reputation = 0; // Добавлен счетчик репутации
let ladenMet = false;

startButton.addEventListener('click', () => {
    playerName = playerNameInput.value;
    characterName.textContent = playerName;
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

chooseClanButton.addEventListener('click', () => {
    choiceContainer.classList.remove('hidden');
    chooseClanButton.classList.add('hidden');
});

sufiButton.addEventListener('click', () => {
    chosenClan = 'Суфисты';
    characterClan.textContent = chosenClan;
    characterImage.src = "C:Users79898DesktopRPimgsaid.webp";
    choiceContainer.classList.add('hidden');
    mapContainer.classList.remove('hidden');
});

saliButton.addEventListener('click', () => {
    chosenClan = 'Саляфиты';
    characterClan.textContent = chosenClan;
    characterImage.src = "C:Users79898DesktopRPimgladen.webp";
    choiceContainer.classList.add('hidden');
    mapContainer.classList.remove('hidden');
});

const locations = document.querySelectorAll('.map-location');

locations.forEach(location => {
    location.addEventListener('click', () => {
        mapContainer.classList.add('hidden');
        taskContainer.classList.remove('hidden');
        if (location.id === 'location-4' && !ladenMet) {
            // Встреча с Ладеном
            ladenMet = true;
            updateSubtitles('"О, это же Ладен! Что мне делать?"');
            taskDescription.textContent = "Встретил Ладена"; // Описание задания
            completeTaskButton.classList.add('hidden');
            const helpButton = document.createElement('button');
            helpButton.id = 'help-laden-button';
            helpButton.textContent = 'Помочь';
            helpButton.addEventListener('click', helpLaden);
            const reportButton = document.createElement('button');
            reportButton.id = 'report-laden-button';
            reportButton.textContent = 'Сообщить Суфиям';
            reportButton.addEventListener('click', reportLaden);
            taskContainer.appendChild(helpButton);
            taskContainer.appendChild(reportButton);
        } else {
            // Обычное задание
            currentTask = generateRandomTask(chosenClan);
            taskDescription.textContent = currentTask;
            onTaskStart();
        }
    });
});

completeTaskButton.addEventListener('click', () => {
    taskContainer.classList.add('hidden');
    mapContainer.classList.remove('hidden');
    xp += 10;
    money += 5;
    characterXp.textContent = xp;
    characterMoney.textContent = money;
    currentTask = null;
});

function generateRandomTask(clan) {
    let tasks = [];
    if (clan === 'Суфисты') {
        tasks = [
            'Распускать фитну',
            'Стать подлизой МУФТИЯ',
            'Собирать деньги на хадж и на эти деньги покупать САД',
            'Продать сувениры паломникам',
            'Найти пожертвования для бедных',
        ];
    } else if (clan === 'Саляфиты') {
        tasks = [
            'Тренироваться с оружием: улучшить навыки',
            'Найти вражеских шпионов',
            'СДЕЛАТЬ БАБАХ',
            'Спрятать оружие в мечети',
            'Провести проповедь в парке',
        ];
    }
    return tasks[Math.floor(Math.random() * tasks.length)];
}

function updateSubtitles(text) {
    subtitles.textContent = text;
}

function onTaskStart() {
    if (currentTask.includes('ВАХОВ')) {
        updateSubtitles('"Надо поехать на венгерских и там их ловить"');
    } else if (currentTask.includes('фитну')) {
        updateSubtitles('"Надеюсь, никто не узнает..."');
    } else if (currentTask.includes('МУФТИЯ')) {
        updateSubtitles('"Может, он оценит мою преданность?"');
    } else if (currentTask.includes('САД')) {
        updateSubtitles('"Хороший бизнес - хадж!"');
    } else if (currentTask.includes('оружием')) {
        updateSubtitles('"Надо тренироваться, чтобы защитить веру!"');
    } else if (currentTask.includes('шпионов')) {
        updateSubtitles('"Где же эти шпионы? Надо их найти!"');
    } else if (currentTask.includes('БАБАХ')) {
        updateSubtitles('"Не хочу быть террористом..."');
    } else if (currentTask.includes('мечети')) {
        updateSubtitles('"Надо быть осторожным, чтобы никто не заметил..."');
    } else if (currentTask.includes('проповедь')) {
        updateSubtitles('"Надеюсь, люди меня послушают..."');
    }
}

function helpLaden() {
    if (chosenClan === 'Саляфиты') {
        updateSubtitles('"Ладен мой брат! Я помогу ему!"');
        // Добавьте логику помощи Ладену здесь (например, скрытие, побег)
        reputation += 10; // Увеличение репутации за помощь Ладену
    } else {
        updateSubtitles('"Ладен, мой брат, но я Суфист..."');
        // Добавьте логику отказа помощи Ладену здесь 
        reputation -= 10; // Уменьшение репутации за отказ помочь Ладену
    }
    updateReputation();
    taskContainer.innerHTML = '<p id="task-description">-</p><button id="complete-task-button">Выполнить</button><p id="subtitles">-</p>';
    completeTaskButton.classList.remove('hidden'); // Вернуть кнопку "Выполнить"
    ladenMet = false; // Сбросить флаг встречи
}

function reportLaden() {
    if (chosenClan === 'Суфисты') {
        updateSubtitles('"Я должен сообщить о нем Суфиям!"');
        // Добавьте логику сообщения Суфиям здесь
        // Например, добавить очки опыта, деньги или уменьшить репутацию
        reputation += 10; // Увеличение репутации за сообщение о Ладене
    } else {
        updateSubtitles('"Ладен - мой брат, я не могу его предать!"');
        // Добавьте логику отказа сообщать о Ладене
        reputation -= 10; // Уменьшение репутации за отказ сообщать о Ладене
    }
    updateReputation();
    taskContainer.innerHTML = '<p id="task-description">-</p><button id="complete-task-button">Выполнить</button><p id="subtitles">-</p>';
    completeTaskButton.classList.remove('hidden'); // Вернуть кнопку "Выполнить"
    ladenMet = false; // Сбросить флаг встречи
}

function updateReputation() {
    characterReputation.textContent = reputation;
    // Добавьте логику, которая реагирует на изменение репутации
    // Например, можно открывать/закрывать доступ к некоторым заданиям,
    // изменять отношение других персонажей к игроку и т.д.
}