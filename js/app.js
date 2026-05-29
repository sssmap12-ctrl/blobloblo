/* ========================================
   APP.JS — Навигация и управление состоянием
   ======================================== */

const App = {
  // State
  state: {
    playerName: '',
    points: 0,
    currentNode: 'start',
    unlockedPhotos: [],
    chatHistory: [],
    completedNodes: [],
    currentScreen: 'start',
    previousScreen: null,
  },

  // DOM references
  screens: {},
  nameInput: null,
  startBtn: null,
  galleryBtn: null,

  init() {
    // Cache DOM
    this.screens = {
      start: document.getElementById('start-screen'),
      chat: document.getElementById('chat-screen'),
      gallery: document.getElementById('gallery-screen'),
    };
    this.nameInput = document.getElementById('name-input');
    this.startBtn = document.getElementById('btn-start-chat');
    this.galleryBtn = document.getElementById('btn-open-gallery');

    // Load saved state
    this.loadState();

    // If we have a saved name, pre-fill it
    if (this.state.playerName) {
      this.nameInput.value = this.state.playerName;
      this.startBtn.disabled = false;
    }

    // Events
    this.nameInput.addEventListener('input', () => {
      const name = this.nameInput.value.trim();
      this.startBtn.disabled = name.length === 0;
    });

    this.nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.nameInput.value.trim()) {
        this.startChat();
      }
    });

    this.startBtn.addEventListener('click', () => this.startChat());
    this.galleryBtn.addEventListener('click', () => this.showScreen('gallery'));

    // Chat header buttons
    document.getElementById('chat-back-btn').addEventListener('click', () => {
      this.showScreen('start');
    });
    document.getElementById('btn-gallery-from-chat').addEventListener('click', () => {
      this.showScreen('gallery');
    });
    document.getElementById('btn-restart').addEventListener('click', () => {
      this.showRestartConfirm();
    });

    // Gallery back button
    document.getElementById('gallery-back-btn').addEventListener('click', () => {
      this.showScreen(this.state.previousScreen || 'start');
    });

    // Init gallery
    Gallery.init();
  },

  startChat() {
    const name = this.nameInput.value.trim();
    if (!name) return;

    this.state.playerName = name;
    this.saveState();

    this.showScreen('chat');

    // Initialize chat engine if it hasn't started yet or if resuming
    if (this.state.chatHistory.length === 0) {
      Chat.start();
    } else {
      Chat.restore();
    }
  },

  showScreen(screenName) {
    this.state.previousScreen = this.state.currentScreen;

    Object.values(this.screens).forEach(s => s.classList.remove('active'));
    this.screens[screenName].classList.add('active');
    this.state.currentScreen = screenName;

    if (screenName === 'gallery') {
      Gallery.render();
    }
  },

  // Points
  addPoints(amount) {
    this.state.points += amount;
    if (this.state.points < 0) this.state.points = 0;
    this.saveState();
    this.showPointsNotification(amount);
  },

  showPointsNotification(amount) {
    if (amount === 0) return;
    const notif = document.createElement('div');
    notif.className = `points-notification ${amount > 0 ? 'positive' : 'negative'}`;
    notif.textContent = amount > 0 ? `+${amount} 💕` : `${amount} 💔`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
  },

  // Photo unlock
  unlockPhoto(photoPath) {
    if (this.state.unlockedPhotos.includes(photoPath)) return;
    this.state.unlockedPhotos.push(photoPath);
    this.saveState();
    this.showPhotoUnlockNotification(photoPath);
  },

  showPhotoUnlockNotification(photoPath) {
    // Find photo info from gallery
    const photoInfo = PHOTO_GALLERY.find(p => p.path === photoPath);
    const tierNames = { easy: 'Обычное', medium: 'Среднее', hard: 'Хард' };

    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    const notif = document.createElement('div');
    notif.className = 'photo-unlock-notification';
    notif.innerHTML = `
      <div class="unlock-icon">🔓</div>
      <div class="unlock-text">Фото разблокировано!</div>
      <div class="unlock-sub">${photoInfo ? photoInfo.name : 'Новое фото'} • ${tierNames[photoInfo?.tier] || ''}</div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(notif);

    const dismiss = () => {
      overlay.remove();
      notif.remove();
    };

    overlay.addEventListener('click', dismiss);
    notif.addEventListener('click', dismiss);
    setTimeout(dismiss, 2500);
  },

  // Ending
  showEnding(type) {
    const totalPhotos = PHOTO_GALLERY.length;
    const unlocked = this.state.unlockedPhotos.length;
    const points = this.state.points;

    const endings = {
      good: {
        emoji: '💕',
        title: 'Хорошая концовка!',
        message: 'Ты покорил сердце Хамари! Она доверилась тебе полностью. Это было незабываемое приключение...',
      },
      neutral: {
        emoji: '🤔',
        title: 'Нейтральная концовка',
        message: 'Хамари была не до конца уверена в тебе. Может, если попробуешь снова, результат будет другим?',
      },
      bad: {
        emoji: '💔',
        title: 'Плохая концовка',
        message: 'Увы, Хамари не почувствовала достаточной связи. Попробуй заново и будь более внимательным к её чувствам.',
      },
    };

    const ending = endings[type] || endings.neutral;

    const overlay = document.createElement('div');
    overlay.className = 'ending-overlay';
    overlay.innerHTML = `
      <div class="ending-emoji">${ending.emoji}</div>
      <h2 class="ending-title">${ending.title}</h2>
      <div class="ending-stats">
        <div class="ending-stat">
          <div class="ending-stat-value">${points}</div>
          <div class="ending-stat-label">Очков</div>
        </div>
        <div class="ending-stat">
          <div class="ending-stat-value">${unlocked}/${totalPhotos}</div>
          <div class="ending-stat-label">Фото</div>
        </div>
      </div>
      <p class="ending-message">${ending.message}</p>
      <div class="ending-buttons">
        <button class="btn btn-primary" id="ending-gallery-btn">
          <span class="btn-icon">📸</span> Посмотреть галерею
        </button>
        <button class="btn btn-secondary" id="ending-restart-btn">
          <span class="btn-icon">🔄</span> Начать заново
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Emoji rain for good ending
    if (type === 'good') {
      this.startEmojiRain();
    }

    document.getElementById('ending-gallery-btn').addEventListener('click', () => {
      overlay.remove();
      this.showScreen('gallery');
    });

    document.getElementById('ending-restart-btn').addEventListener('click', () => {
      overlay.remove();
      this.restart();
    });
  },

  startEmojiRain() {
    const container = document.createElement('div');
    container.className = 'emoji-rain';
    document.body.appendChild(container);

    const emojis = ['💕', '💖', '✨', '🌸', '💗', '💫', '❤️', '🦋'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDuration = (2 + Math.random() * 2) + 's';
        span.style.fontSize = (16 + Math.random() * 20) + 'px';
        container.appendChild(span);
      }, i * 100);
    }

    setTimeout(() => container.remove(), 5000);
  },

  // Restart
  showRestartConfirm() {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
      <h3>Начать заново? 🔄</h3>
      <p>Прогресс чата будет сброшен, но галерея останется.</p>
      <div class="confirm-buttons">
        <button class="btn btn-secondary" id="confirm-cancel">Отмена</button>
        <button class="btn btn-primary" id="confirm-restart">Да, заново</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(dialog);

    document.getElementById('confirm-cancel').addEventListener('click', () => {
      overlay.remove();
      dialog.remove();
    });

    overlay.addEventListener('click', () => {
      overlay.remove();
      dialog.remove();
    });

    document.getElementById('confirm-restart').addEventListener('click', () => {
      overlay.remove();
      dialog.remove();
      this.restart();
    });
  },

  restart() {
    // Keep unlocked photos and player name, reset everything else
    const keepPhotos = [...this.state.unlockedPhotos];
    const keepName = this.state.playerName;

    this.state = {
      playerName: keepName,
      points: 0,
      currentNode: 'start',
      unlockedPhotos: keepPhotos,
      chatHistory: [],
      completedNodes: [],
      currentScreen: 'chat',
      previousScreen: null,
    };
    this.saveState();

    // Clear chat messages
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '<div class="chat-date"><span>Сегодня</span></div>';

    // Hide choices
    const choicesPanel = document.getElementById('choices-panel');
    choicesPanel.innerHTML = '';
    choicesPanel.classList.add('hidden');

    // Reset progress bar
    document.getElementById('progress-fill').style.width = '2%';

    // Start fresh
    this.showScreen('chat');
    Chat.start();
  },

  // Replace {name} placeholder
  formatText(text) {
    return text.replace(/\{name\}/g, this.state.playerName);
  },

  // Persistence
  saveState() {
    try {
      localStorage.setItem('hamari_chat_state', JSON.stringify(this.state));
    } catch (e) {
      // localStorage might be unavailable
    }
  },

  loadState() {
    try {
      const saved = localStorage.getItem('hamari_chat_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      // Use default state
    }
  },

  // Get total node count for progress
  getTotalNodes() {
    return Object.keys(STORY_NODES).length;
  },

  updateProgress() {
    const total = this.getTotalNodes();
    const completed = this.state.completedNodes.length;
    const pct = Math.max(2, Math.round((completed / total) * 100));
    document.getElementById('progress-fill').style.width = pct + '%';
  },
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
