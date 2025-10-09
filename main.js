document.addEventListener('DOMContentLoaded', () => {

    let appData = {
        totalPoints: 0,
        characters: [],
        stamps: {},
        boss: {
            currentStage: 1,
            lastAttackDate: null,
            currentHp: 0,
            attacksLeftToday: 3
        }
    };

    const CHARACTER_MASTER_DATA = {
        1: {
            evolutions: [
                { name: "コドラン", image: "images-001a.png", rank: "N★", initialAttack: 10, maxLevel: 20 },
                { name: "フレイムドラゴン", image: "images-001b.png", rank: "R★★", initialAttack: 25, maxLevel: 30 },
                { name: "インフェルノドラゴ", image: "images-001c.png", rank: "SR★★★", initialAttack: 80, maxLevel: 50 },
                 { name: "ヴォルカリオン", image: "images-001d.png", rank: "UR★★★★", initialAttack: 120, maxLevel: 70 },
            ]
        },
        2: {
            evolutions: [
                { name: "プティスカル", image: "images-002a.png", rank: "N★", initialAttack: 8, maxLevel: 20 },
                { name: "デスボーン", image: "images-002b.png", rank: "R★★", initialAttack: 30, maxLevel: 30 },
                { name: "ナイトメアボーン", image: "images-002c.png", rank: "SR★★★", initialAttack: 80, maxLevel: 50 },
                { name: "ダーク・ナイトメア・メネシス", image: "images-002d.png", rank: "UR★★★★", initialAttack: 135, maxLevel: 70 },
            ]
        },
        3: {
            evolutions: [
                { name: "ミストル", image: "images-003a.png", rank: "R★★", initialAttack: 20, maxLevel: 30 },
                { name: "アクアソーサラー", image: "images-003b.png", rank: "SR★★★", initialAttack: 65, maxLevel: 50},
                { name: "アクアドラゴン・ソーサラー", image: "images-003d.png", rank: "UR★★★★", initialAttack: 115, maxLevel: 70},
            ]
        },
        4: {
            evolutions: [
                { name: "クウ", image: "images-004a.png", rank: "R★★", initialAttack: 20, maxLevel: 30 },
                { name: "クウザ", image: "images-004b.png", rank: "SR★★★", initialAttack: 65, maxLevel: 50},
            　　 { name: "クウザリオン", image: "images-004c.png", rank: "UR★★★★", initialAttack: 110, maxLevel: 70},
            ]
        },
        5: {
            evolutions: [
                { name: "ラン", image: "images-005a.png", rank: "N★", initialAttack: 5, maxLevel: 20 },
                { name: "ランガ", image: "images-005b.png", rank: "R★★", initialAttack: 20, maxLevel: 30},
                { name: "ライランガ", image: "images-005c.png", rank: "SR★★★", initialAttack: 85, maxLevel: 50},
                { name: "ヴォルトライガン", image: "images-005d.png", rank: "UR★★★★", initialAttack: 140, maxLevel: 70},
            ]
        },
        6: {
            evolutions: [
                { name: "ヴァルキリー", image: "images-006b.png", rank: "N★", initialAttack: 5, maxLevel: 20 },
                { name: "ヴァルキリー・ナイト", image: "images-006c.png", rank: "R★★", initialAttack: 15, maxLevel: 30},
                { name: "ヴァルキリー・アーク", image: "images-006d.png", rank: "SR★★★", initialAttack: 45, maxLevel: 50},
                { name: "ヴァルキリー・アークエンジェル", image: "images-006e.png", rank: "UR★★★★", initialAttack: 90, maxLevel: 70},
            ]
        }
    };

    const BOSS_MASTER_DATA = {
        1: { name: "ブレインドッグ・ブルド", image: "images-B001.png", maxHp: 1000, rewardPoints: 3000 },
        2: { name: "ブレインドッグ・スフィアス", image: "images-B002.png", maxHp: 10000, rewardPoints: 5000 },
        3: { name: "ブレインドッグ・ドゥクス", image: "images-B003.png", maxHp: 50000, rewardPoints: 6000 },
        4: { name: "リヴァシス", image: "images-007c.png", maxHp: 100000, rewardPoints: 6500 },
        5: { name: "Tung Tung Tung Sahur", image: "images-B004.png", maxHp: 150000, rewardPoints: 7000 },
        6: { name: "Tralalero Tralala", image: "images-B005.png", maxHp: 30000, rewardPoints: 10000 },
        7: { name: "Chimpanzini Bananini", image: "images-B006.png", maxHp: 777777, rewardPoints: 15000 },
        8: { name: "Trippi Troppi", image: "images-B007.png", maxHp: 500000, rewardPoints: 12000 },
        9: { name: "Brr Brr Patapim)", image: "images-B008.png", maxHp: 800000, rewardPoints: 15000 },
    };
    
    // DOM要素のキャッシュ
    const navLinks = document.querySelectorAll('.nav-menu a');
    const pages = document.querySelectorAll('.page');
    const totalPointsDisplay_stamp = document.getElementById('totalPointsDisplay_stamp');
    const totalPointsDisplay_characters = document.getElementById('totalPointsDisplay_characters');
    const todayDateEl = document.getElementById('todayDate');
    const stampContainerEl = document.getElementById('stampContainer');
    const stampInputEl = document.getElementById('stampInput');
    const completeStampButtonEl = document.getElementById('completeStampButton');
    const inputSectionEl = document.getElementById('inputSection');
    const stampMessageEl = document.getElementById('stampMessage');
    const characterListContainerEl = document.getElementById('characterListContainer');
    const characterHintEl = document.getElementById('characterHint');
    const totalAttackPowerEl = document.getElementById('totalAttackPower');
    const totalCharacterCountEl = document.getElementById('totalCharacterCount');
    const imageModal = document.getElementById('image-modal');
    const expandedImage = document.getElementById('expanded-image');
    const modalClose = document.getElementsByClassName('modal-close')[0];
    const currentMonthYearEl = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const calendarGridEl = document.getElementById('calendarGrid');
    let currentCalendarDate = new Date();
    
    // ボス関連の要素
    const stageNameEl = document.getElementById('stageName');
    const bossNameEl = document.getElementById('bossName');
    const bossImageEl = document.getElementById('bossImage');
    const bossCurrentHpEl = document.getElementById('bossCurrentHp');
    const bossMaxHpEl = document.getElementById('bossMaxHp');
    const healthFillEl = document.getElementById('healthFill');
    const attackButtonEl = document.getElementById('attackButton');
    const attackMessageEl = document.getElementById('attackMessage');
    const clearModalEl = document.getElementById('clear-modal');
    const clearMessageEl = document.getElementById('clearMessage');
    const clearRewardEl = document.getElementById('clearReward');
    const nextStageButtonEl = document.getElementById('nextStageButton');

    // ★追加: スタンプ詳細ポップアップ用のDOM要素
    const stampDetailModal = document.getElementById('stamp-detail-modal');
    const stampDetailDateEl = document.getElementById('stamp-detail-date');
    const stampDetailListEl = document.getElementById('stamp-detail-list');
    const stampDetailClose = document.getElementsByClassName('detail-modal-close')[0];


    function saveData() {
        localStorage.setItem('studyApp', JSON.stringify(appData));
    }

    function loadData() {
        const storedData = localStorage.getItem('studyApp');
        if (storedData) {
            appData = JSON.parse(storedData);
        }
    }

    // --- ページ切り替えのロジック ---
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active-page'));
        document.getElementById(pageId).classList.add('active-page');
        navLinks.forEach(link => link.closest('.nav-item').classList.remove('active'));
        document.querySelector(`.nav-item[data-page="${pageId}"]`).classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = e.target.closest('.nav-item').dataset.page;
            
            showPage(targetPageId);
            
            if (targetPageId === 'stamp') {
                initializeStampPage();
            } else if (targetPageId === 'characters') {
                initializeCharacterPage();
            } else if (targetPageId === 'boss') {
                initializeBossPage();
            } else if (targetPageId === 'calendar') {
                initializeCalendarPage();
            }
        });
    });

    // --- ページ1: スタンプ機能 ---
    function initializeStampPage() {
        const today = new Date().toISOString().split('T')[0];
        todayDateEl.textContent = today;
        updatePointDisplay();
        renderStamps();
    }

    function updatePointDisplay() {
        if(totalPointsDisplay_stamp) totalPointsDisplay_stamp.textContent = appData.totalPoints;
        if(totalPointsDisplay_characters) totalPointsDisplay_characters.textContent = appData.totalPoints;
    }

    function renderStamps() {
        stampContainerEl.innerHTML = '';
        const today = new Date().toISOString().split('T')[0];
        const todayStamps = appData.stamps[today] || [];
        const stampedCountToday = todayStamps.length;

        if (stampedCountToday >= 10) {
            stampContainerEl.innerHTML = '<p>今日のスタンプは満タンです！</p>';
            inputSectionEl.style.display = 'none';
            return;
        }

        const stampEffectContainer = document.createElement('div');
        stampEffectContainer.className = 'stamp-effect-container';

        for (let i = 0; i < stampedCountToday; i++) {
            const stampIcon = document.createElement('span');
            stampIcon.className = 'stamp-icon';
            stampIcon.textContent = '✅';
            stampEffectContainer.appendChild(stampIcon);
        }

        stampContainerEl.appendChild(stampEffectContainer);

        const stampButton = document.createElement('button');
        stampButton.className = 'main-button';
        stampButton.textContent = '今日のスタンプ';
        stampButton.addEventListener('click', () => {
            stampContainerEl.style.display = 'none';
            inputSectionEl.style.display = 'block';
            stampMessageEl.textContent = '今日取り組んだもの';
            stampInputEl.focus();
        });
        stampContainerEl.appendChild(stampButton);
    }

    completeStampButtonEl.addEventListener('click', () => {
        const stampText = stampInputEl.value.trim();
        if (stampText) {
            const today = new Date().toISOString().split('T')[0];
            const todayStamps = appData.stamps[today] || [];
            
            if (todayStamps.length < 10) {
                const newStamp = { text: stampText };
                todayStamps.push(newStamp);
                appData.stamps[today] = todayStamps;

                appData.totalPoints += 300;
                
                alert(`スタンプを押しました！300ポイント獲得！\n「${stampText}」を記録しました。`);
                
                stampInputEl.value = '';
                inputSectionEl.style.display = 'none';
                stampContainerEl.style.display = 'block';

                saveData();
                updatePointDisplay();
                renderStamps();
            }
        } else {
            alert('入力欄が空です。');
        }
    });

    // --- ページ2: キャラクター機能 ---
    function initializeCharacterPage() {
        loadData();
        const allCharacterIds = Object.keys(CHARACTER_MASTER_DATA).map(Number);
        const existingCharacterIds = appData.characters.map(c => c.id);
        
        allCharacterIds.forEach(charId => {
            if (!existingCharacterIds.includes(charId)) {
                appData.characters.push({
                    id: charId,
                    level: 1,
                    evolutionIndex: 0
                });
            }
        });

        saveData();
        updatePointDisplay();
        renderCharacters();
    }

    function renderCharacters() {
        characterListContainerEl.innerHTML = '';
        
        let totalAttackPower = 0;
        appData.characters.forEach(charData => {
            const master = CHARACTER_MASTER_DATA[charData.id];
            const currentEvolution = master.evolutions[charData.evolutionIndex];
            
            const maxLevel = currentEvolution.maxLevel;
            const isMaxLevel = charData.level >= maxLevel;
            
            const attackPower = currentEvolution.initialAttack * charData.level;
            totalAttackPower += attackPower;
            
            const requiredPoints = (charData.level + 1) * 5;
            const canLevelUp = appData.totalPoints >= requiredPoints && !isMaxLevel;
            
            const canEvolve = isMaxLevel && master.evolutions[charData.evolutionIndex + 1];

            const card = document.createElement('div');
            card.className = 'card character-card';
            card.innerHTML = `
                <img src="${currentEvolution.image}" alt="${currentEvolution.name}">
                <h3>${currentEvolution.name} (Lv. ${charData.level})</h3>
                <p>ランク: ${currentEvolution.rank}</p>
                <p>攻撃力: ${attackPower}</p>
                ${!isMaxLevel ? `<p>次のレベルまで: ${requiredPoints} P</p>` : `<p>この形態は最大レベルです！</p>`}
                
                ${canEvolve
                    ? `<button class="evolve-button" data-character-id="${charData.id}">進化する！</button>`
                    : `<button class="level-up-button" data-character-id="${charData.id}" ${canLevelUp ? '' : 'disabled'}>レベルアップ！</button>`
                }
            `;
            characterListContainerEl.appendChild(card);
        });

        totalAttackPowerEl.textContent = totalAttackPower;
        totalCharacterCountEl.textContent = appData.characters.length;

        document.querySelectorAll('.level-up-button').forEach(button => {
            button.addEventListener('click', handleLevelUpClick);
        });
        document.querySelectorAll('.evolve-button').forEach(button => {
            button.addEventListener('click', handleEvolveClick);
        });
        
        document.querySelectorAll('.character-card img').forEach(image => {
            image.addEventListener('click', handleImageClick);
        });

        const allCharactersOwned = appData.characters.length === Object.keys(CHARACTER_MASTER_DATA).length;
        if (allCharactersOwned) {
            characterHintEl.textContent = 'すべてのキャラクターが揃っています！';
        } else {
            const nextCharacterLevel = 30; // 任意のレベル
            characterHintEl.textContent = `キャラクターを${nextCharacterLevel}レベルにすると、新しいキャラクターが追加できます！`;
        }
    }

    function handleImageClick(event) {
        expandedImage.src = event.target.src;
        imageModal.style.display = 'flex';
    }

    modalClose.onclick = () => {
        imageModal.style.display = 'none';
    }

    imageModal.onclick = (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    }

    function handleLevelUpClick(event) {
        const charId = parseInt(event.target.dataset.characterId, 10);
        const characterToUpdate = appData.characters.find(c => c.id === charId);
        const requiredPoints = (characterToUpdate.level + 1) * 5;
        
        if (appData.totalPoints >= requiredPoints) {
            appData.totalPoints -= requiredPoints;
            characterToUpdate.level++;
            
            saveData();
            updatePointDisplay();
            renderCharacters();
        } else {
            alert('ポイントが足りません！');
        }
    }

    function handleEvolveClick(event) {
        const charId = parseInt(event.target.dataset.characterId, 10);
        const characterToUpdate = appData.characters.find(c => c.id === charId);
        
        if (!characterToUpdate) return;
        
        const master = CHARACTER_MASTER_DATA[characterToUpdate.id];
        const nextEvolutionIndex = characterToUpdate.evolutionIndex + 1;
        
        if (master.evolutions[nextEvolutionIndex]) {
            const characterImage = event.target.closest('.character-card').querySelector('img');
            if (characterImage) {
                characterImage.classList.add('evolve-effect');
            }

            characterToUpdate.evolutionIndex = nextEvolutionIndex;
            characterToUpdate.level = 1;
            
            alert('おめでとう！キャラクターが進化したよ！');
            
            saveData();
            updatePointDisplay();

            setTimeout(() => {
                if (characterImage) {
                    characterImage.classList.remove('evolve-effect');
                }
                renderCharacters();
            }, 1500); 
            
        } else {
            alert('このキャラクターはこれ以上進化できません！');
        }
    }

    // --- ページ3: ボス機能 ---
    function initializeBossPage() {
        loadData();
        const today = new Date().toISOString().split('T')[0];

        if (appData.boss.lastAttackDate !== today) {
            appData.boss.attacksLeftToday = 3;
            appData.boss.lastAttackDate = today;
            saveData();
        }

        const currentBossData = BOSS_MASTER_DATA[appData.boss.currentStage];
        if (!currentBossData) {
            bossImageEl.src = '';
            stageNameEl.textContent = '全ステージクリア！';
            bossNameEl.textContent = '新しいボスを待て！';
            attackButtonEl.disabled = true;
            attackButtonEl.textContent = '完了';
            attackMessageEl.textContent = 'おめでとうございます！すべてのボスを撃破しました！';
            healthFillEl.style.width = '0%';
            bossCurrentHpEl.textContent = '0';
            bossMaxHpEl.textContent = '0';
            return;
        }

        if (appData.boss.currentHp === 0) {
            appData.boss.currentHp = currentBossData.maxHp;
            saveData();
        }
        
        renderBossStatus();
        checkAttackButtonState();
    }

    function renderBossStatus() {
        const currentBossData = BOSS_MASTER_DATA[appData.boss.currentStage];
        if (!currentBossData) return;
        
        stageNameEl.textContent = `ステージ ${appData.boss.currentStage}`;
        bossNameEl.textContent = `ボス: ${currentBossData.name}`;
        bossImageEl.src = currentBossData.image;
        bossMaxHpEl.textContent = currentBossData.maxHp;
        bossCurrentHpEl.textContent = appData.boss.currentHp;
        const hpPercentage = (appData.boss.currentHp / currentBossData.maxHp) * 100;
        healthFillEl.style.width = `${hpPercentage}%`;
    }

    function calculateTotalAttackPower() {
        let totalAttack = 0;
        appData.characters.forEach(charData => {
            const master = CHARACTER_MASTER_DATA[charData.id];
            const currentEvolution = master.evolutions[charData.evolutionIndex];
            totalAttack += currentEvolution.initialAttack * charData.level;
        });
        return totalAttack;
    }

    function checkAttackButtonState() {
        if (appData.boss.attacksLeftToday <= 0) {
            attackButtonEl.disabled = true;
            attackButtonEl.textContent = '今日の攻撃は終了しました';
            attackMessageEl.textContent = `今日の攻撃回数：0 / 3`;
        } else {
            attackButtonEl.disabled = false;
            attackButtonEl.textContent = '攻撃！';
            attackMessageEl.textContent = `今日の攻撃回数：${appData.boss.attacksLeftToday} / 3`;
        }
    }
    
    attackButtonEl.addEventListener('click', () => {
        const totalAttack = calculateTotalAttackPower();
        const currentBossData = BOSS_MASTER_DATA[appData.boss.currentStage];
        
        bossImageEl.classList.add('shake');
        
        appData.boss.currentHp -= totalAttack;
        appData.boss.attacksLeftToday--;

        if (appData.boss.currentHp < 0) {
            appData.boss.currentHp = 0;
        }

        saveData();
        renderBossStatus();
        checkAttackButtonState();

        bossImageEl.addEventListener('animationend', () => {
            bossImageEl.classList.remove('shake');
        }, { once: true });

        if (appData.boss.currentHp <= 0) {
            setTimeout(() => {
                showClearModal(currentBossData.rewardPoints);
            }, 500);
        } else {
            alert(`${totalAttack}のダメージを与えた！`);
        }
    });

    function showClearModal(reward) {
        appData.totalPoints += reward;
        saveData();
        updatePointDisplay();
        clearMessageEl.textContent = `げきはせいこう！${reward}ポイントゲット！🎉`;
        clearRewardEl.textContent = '';
        clearModalEl.style.display = 'flex';
    }

    nextStageButtonEl.addEventListener('click', () => {
        appData.boss.currentStage++;
        appData.boss.currentHp = 0;
        saveData();
        clearModalEl.style.display = 'none';
        initializeBossPage();
    });

    // --- ページ4: カレンダー機能 ---
    function initializeCalendarPage() {
        renderCalendar(currentCalendarDate);
    }

    function renderCalendar(date) {
        calendarGridEl.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();

        currentMonthYearEl.textContent = `${year}年 ${month + 1}月`;

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
        
        let day = new Date(startDate);
        while (day <= lastDayOfMonth || day.getDay() !== 0) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            if (day.getMonth() !== month) {
                dayEl.classList.add('not-current-month');
            }
            
            // ★追加: クリックイベントと日付データの追加
            const formattedDate = day.toISOString().split('T')[0];
            dayEl.dataset.date = formattedDate;

            const dayNumberEl = document.createElement('div');
            dayNumberEl.className = 'day-number';
            dayNumberEl.textContent = day.getDate();
            dayEl.appendChild(dayNumberEl);

            const stampsForDay = appData.stamps[formattedDate] || [];
            stampsForDay.forEach(stamp => {
                const stampItemEl = document.createElement('div');
                stampItemEl.className = 'stamp-item';
                stampItemEl.textContent = stamp.text;
                dayEl.appendChild(stampItemEl);
            });

            // ★追加: クリックイベントリスナー
            dayEl.addEventListener('click', () => showStampDetail(formattedDate));

            calendarGridEl.appendChild(dayEl);
            day.setDate(day.getDate() + 1);
        }
    }
    
    // ★追加: スタンプ詳細ポップアップ表示関数
    function showStampDetail(date) {
        const stamps = appData.stamps[date] || [];
        
        stampDetailDateEl.textContent = date;
        stampDetailListEl.innerHTML = '';
        
        if (stamps.length > 0) {
            stamps.forEach(stamp => {
                const li = document.createElement('li');
                li.textContent = stamp.text;
                stampDetailListEl.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'この日のスタンプはありません。';
            stampDetailListEl.appendChild(li);
        }
        
        stampDetailModal.style.display = 'flex';
    }
    
    // ★追加: ポップアップを閉じるイベント
    stampDetailClose.onclick = () => {
        stampDetailModal.style.display = 'none';
    }

    stampDetailModal.onclick = (event) => {
        if (event.target === stampDetailModal) {
            stampDetailModal.style.display = 'none';
        }
    }


    prevMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar(currentCalendarDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar(currentCalendarDate);
    });

    // --- 初期化処理 ---
    loadData();
// 【修正点】ロードしたデータが古い場合や、新しいボスを追加した場合にステージを調整する
const maxBossId = Math.max(...Object.keys(BOSS_MASTER_DATA).map(Number));

if (appData.boss.currentStage > maxBossId) {
    // データが最大ステージを超えている場合は、最大ステージに設定し直す
    appData.boss.currentStage = maxBossId;
    appData.boss.currentHp = 0; // 必要に応じてHPをリセット
    saveData();
} else if (appData.boss.currentStage < 6) {
    // ※ 新しいボスをすぐにテストしたい場合、以下の行を追加・有効化してください
    // appData.boss.currentStage = 6;
    // appData.boss.currentHp = 0;
    // saveData();
    // alert('開発者モード: ステージを6に強制移行しました。');
} 
// ここまで追加 👆

initializeStampPage();
showPage('stamp');
});
