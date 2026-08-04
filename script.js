// --- ДОСКА КВЕСТОВ ---
const quests = [
    { title: "Проблема со слизью", xp: "200 Г-XP", desc: "Местный алхимик незаконно сливал отходы в колодец. Теперь оттуда лезет агрессивная кислотная жижа. Нужна помощь в зачистке.", reward: "Бесплатные зелья лечения (3 шт.)", marks: 0 },
    {title: "Прополка поля от ползучих тварей", xp: "400 Г-XP", desc: "Агрохолдинг нанимает отряд для методичного выжигания огнем гнезд подземных жуков-переростков на площади в 50 акров.", reward: "30 зм", marks: 0 },
    { title: "Найти некрофила", xp: "450 Г-XP", desc: "Некто раскапывает свежие могилы. Найти и сдать страже.", reward: "50 зм", marks: 0 },
    { title: "Ночной сторож провизии", xp: "25 Г-XP", desc: "Дверь на склад сломалась. Нужно посидеть ночь и отгонять бродячих собак и подростков.", reward: "1 зм и миска горячей каши с мясом", marks: 1 },
    { title: "Гнездо гигантских пауков", xp: "400 Г-XP", desc: "Сточные воды засорились из-за паутины. Нужно спуститься и убить 2 гигантских пауков.", reward: "30 зм", marks: 1 },
    { title: "Зачистка заброшенного поместья", xp: "1 100 Г-XP", desc: "Новый владелец не может въехать в дом из-за агрессивного Призрака.", reward: "200 зм + право забрать любой лут, найденный в тайниках дома", marks: 1 },
    { title: "Спасение шахтеров от тролля", xp: "1 800 Г-XP", desc: "В серебряной шахте завелся Тролль. Огонь обязателен!", reward: "300 зм", marks: 1 },
    { title: "Сбор яда виверны", xp: "2 300 Г-XP", desc: "Алхимической гильдии нужен свежий мешочек с ядом. Для этого придется выследить и убить виверну в скалах.", reward: "450 зм", marks: 1 },
    { title: "Убийство Древнего красного дракона", xp: "62 000 Г-XP", desc: "Убить чудовище в его логове.", reward: "Замок и титул герцога", marks: 8 }
];

const board = document.getElementById('board');

quests.forEach(quest => {
    const notice = document.createElement('div');
    notice.classList.add('notice');
    
    // Случайный наклон листка от -4 до 4 градусов
    const rotation = (Math.random() * 8) - 4;
    notice.style.transform = `rotate(${rotation}deg)`;

    // Отрисовка красных кружков (печатей гильдии)
    let marksHtml = '';
    if (quest.marks > 0) {
        marksHtml = `<div class="marks">${'🔴'.repeat(quest.marks)}</div>`;
    }

    notice.innerHTML = `
        <h2>${quest.title}</h2>
        <span class="highlight">Опыт: ${quest.xp}</span>
        <p>${quest.desc}</p>
        <span class="highlight">Награда: ${quest.reward}</span>
        ${marksHtml}
    `;
    
    board.appendChild(notice);
});

// --- РЕЕСТР ПРИКЛЮЧЕНЦЕВ ---
const adventurers = [
    { name: "Зигфрид", rank: "A", rankName: "Платина", isPlayer: false },
    { name: "Изольда «Буря»", rank: "B", rankName: "Золото", isPlayer: false },
    { name: "Балдор Громогласный", rank: "B", rankName: "Золото", isPlayer: false },
    { name: "Виктор", rank: "C", rankName: "Серебро", isPlayer: false },
    { name: "Лира Остроухая", rank: "C", rankName: "Серебро", isPlayer: false },
    { name: "Драк «Железный клык»", rank: "C", rankName: "Серебро", isPlayer: false },
    { name: "Сириус", rank: "C", rankName: "Серебро", isPlayer: false },
    { name: "Гервальд", rank: "D", rankName: "Железо", isPlayer: false },
    { name: "Флинн Быстрые Пальцы", rank: "D", rankName: "Железо", isPlayer: false },
    { name: "Бруно Каменная Башка", rank: "D", rankName: "Железо", isPlayer: false },
    { name: "Грикс", rank: "E", rankName: "Бронза", isPlayer: true, xp: 290 },
    { name: "Абед", rank: "E", rankName: "Бронза", isPlayer: true, xp: 225 },
    { name: "Феникс", rank: "E", rankName: "Бронза", isPlayer: true, xp: 225 },
    { name: "Рика", rank: "E", rankName: "Бронза", isPlayer: false },
    { name: "Корн", rank: "E", rankName: "Бронза", isPlayer: false },
    { name: "Тоби", rank: "F", rankName: "Медь", isPlayer: false },
    { name: "Ганс", rank: "F", rankName: "Медь", isPlayer: false },
    { name: "Милла", rank: "F", rankName: "Медь", isPlayer: false },
    { name: "Крохобор", rank: "F", rankName: "Медь", isPlayer: false },
    { name: "Питер Ржавый Меч", rank: "F", rankName: "Медь", isPlayer: false },
    { name: "Хлоя", rank: "F", rankName: "Медь", isPlayer: false },
    { name: "Берн", rank: "F", rankName: "Медь", isPlayer: false },
    { name: "Сэмми", rank: "F", rankName: "Медь", isPlayer: false }
];

const rosterContainer = document.getElementById('roster');

// Группируем по рангам для красивого вывода
const ranksOrder = ["A", "B", "C", "D", "E", "F"];
const ranksLabels = {
    "A": "Ранг A (Платина)",
    "B": "Ранг B (Золото)",
    "C": "Ранг C (Серебро)",
    "D": "Ранг D (Железо)",
    "E": "Ранг E (Бронза)",
    "F": "Ранг F (Медь)"
};

ranksOrder.forEach(rankLetter => {
    // Фильтруем авантюристов текущего ранга
    const rankMembers = adventurers.filter(a => a.rank === rankLetter);
    
    if (rankMembers.length > 0) {
        // Создаем секцию для ранга
        const section = document.createElement('div');
        section.classList.add('rank-section');
        
        const title = document.createElement('h3');
        title.classList.add('rank-title');
        title.textContent = ranksLabels[rankLetter];
        
        const tokensGrid = document.createElement('div');
        tokensGrid.classList.add('tokens-grid');
        
        // Создаем жетоны
        rankMembers.forEach(member => {
            const token = document.createElement('div');
            token.classList.add('token', `token-${member.rank.toLowerCase()}`);
            
            let tokenHtml = `<span>${member.name}</span>`;
            
            // Если игрок, добавляем опыт в скобках
            if (member.isPlayer) {
                tokenHtml += `<span class="player-xp">(${member.xp} XP)</span>`;
            }
            
            token.innerHTML = tokenHtml;
            tokensGrid.appendChild(token);
        });
        
        section.appendChild(title);
        section.appendChild(tokensGrid);
        rosterContainer.appendChild(section);
    }
});
