/* ========================================
   CHAT.JS — Движок чата
   ======================================== */

const Chat = {
  messagesContainer: null,
  choicesPanel: null,
  isAnimating: false,
  messageQueue: [],
  lastPhotoSentInNode: false,

  init() {
    this.messagesContainer = document.getElementById('chat-messages');
    this.choicesPanel = document.getElementById('choices-panel');
  },

  start() {
    this.init();
    this.lastPhotoSentInNode = false;
    this.playNode('start');
  },

  restore() {
    this.init();
    // Re-render saved chat history
    this.messagesContainer.innerHTML = '<div class="chat-date"><span>Сегодня</span></div>';

    for (const entry of App.state.chatHistory) {
      if (entry.type === 'incoming') {
        this.renderMessageImmediate('incoming', entry.content, entry.isPhoto);
      } else if (entry.type === 'outgoing') {
        this.renderMessageImmediate('outgoing', entry.content, false);
      }
    }

    // Resume from current node if there are choices left
    const currentNode = STORY_NODES[App.state.currentNode];
    if (currentNode && !currentNode.isEnding) {
      this.showChoices(currentNode, App.state.currentNode);
    }

    this.scrollToBottom();
  },

  async playNode(nodeId) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.lastPhotoSentInNode = false;

    const node = STORY_NODES[nodeId];
    if (!node) {
      console.error('Node not found:', nodeId);
      this.isAnimating = false;
      return;
    }

    App.state.currentNode = nodeId;
    if (!App.state.completedNodes.includes(nodeId)) {
      App.state.completedNodes.push(nodeId);
    }
    App.updateProgress();
    App.saveState();

    // Hide choices
    this.choicesPanel.classList.add('hidden');
    this.choicesPanel.innerHTML = '';

    // Play base messages
    if (node.messages && node.messages.length > 0) {
      await this.playMessages(node.messages);
    }

    // Handle photo checks
    if (node.photoChecks && node.photoChecks.length > 0) {
      // Multiple photo check tiers - check from highest to lowest
      let matched = false;
      for (const check of node.photoChecks) {
        if (App.state.points >= check.minPoints) {
          // Unlock photos
          if (check.photos) {
            check.photos.forEach(p => App.unlockPhoto(p));
          }
          // Play success messages
          if (check.successMessages && check.successMessages.length > 0) {
            await this.playMessages(check.successMessages);
            this.lastPhotoSentInNode = true;
          }
          matched = true;
          break;
        }
      }
      if (!matched) {
        // Use failMessages from the last (lowest tier) check
        const lastCheck = node.photoChecks[node.photoChecks.length - 1];
        if (lastCheck.failMessages && lastCheck.failMessages.length > 0) {
          await this.playMessages(lastCheck.failMessages);
        }
      }
    } else if (node.photoCheck) {
      // Single photo check
      if (App.state.points >= node.photoCheck.minPoints) {
        if (node.photoCheck.photos) {
          node.photoCheck.photos.forEach(p => App.unlockPhoto(p));
        }
        if (node.photoCheck.successMessages && node.photoCheck.successMessages.length > 0) {
          await this.playMessages(node.photoCheck.successMessages);
          this.lastPhotoSentInNode = true;
        }
      } else {
        if (node.photoCheck.failMessages && node.photoCheck.failMessages.length > 0) {
          await this.playMessages(node.photoCheck.failMessages);
        }
      }
    }

    this.isAnimating = false;

    // Check if this is an ending
    if (node.isEnding) {
      App.saveState();
      setTimeout(() => {
        App.showEnding(node.endingType || 'neutral');
      }, 1500);
      return;
    }

    // Show choices
    if (node.choices && node.choices.length > 0) {
      this.showChoices(node, nodeId);
    }
  },

  async playMessages(messages) {
    for (const msg of messages) {
      const delay = msg.delay || (msg.type === 'photo' ? 2000 : 800 + Math.random() * 1200);

      // Show typing indicator
      this.showTyping();
      await this.wait(delay);
      this.hideTyping();

      if (msg.type === 'photo') {
        const formattedText = msg.src;
        this.addMessage('incoming', formattedText, true);
      } else {
        const formattedText = App.formatText(msg.text);
        this.addMessage('incoming', formattedText, false);
      }

      this.scrollToBottom();
    }
  },

  addMessage(direction, content, isPhoto) {
    const msgEl = document.createElement('div');
    msgEl.className = `message message-${direction}`;

    const bubble = document.createElement('div');
    bubble.className = `message-bubble${isPhoto ? ' message-photo' : ''}`;

    if (isPhoto) {
      const img = document.createElement('img');
      img.src = content;
      img.alt = 'Фото';
      img.loading = 'lazy';
      img.addEventListener('click', () => {
        Gallery.openLightbox(content);
      });
      bubble.appendChild(img);
    } else {
      bubble.textContent = content;
    }

    msgEl.appendChild(bubble);

    // Timestamp
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = this.getCurrentTime();
    msgEl.appendChild(time);

    this.messagesContainer.appendChild(msgEl);

    // Save to history
    App.state.chatHistory.push({
      type: direction,
      content: content,
      isPhoto: isPhoto,
      time: time.textContent,
    });
    App.saveState();

    return msgEl;
  },

  renderMessageImmediate(direction, content, isPhoto) {
    const msgEl = document.createElement('div');
    msgEl.className = `message message-${direction}`;
    msgEl.style.animation = 'none';

    const bubble = document.createElement('div');
    bubble.className = `message-bubble${isPhoto ? ' message-photo' : ''}`;

    if (isPhoto) {
      const img = document.createElement('img');
      img.src = content;
      img.alt = 'Фото';
      img.loading = 'lazy';
      img.addEventListener('click', () => {
        Gallery.openLightbox(content);
      });
      bubble.appendChild(img);
    } else {
      bubble.textContent = content;
    }

    msgEl.appendChild(bubble);
    this.messagesContainer.appendChild(msgEl);
  },

  showChoices(node, nodeId) {
    this.choicesPanel.innerHTML = '';
    this.choicesPanel.classList.remove('hidden');

    const choices = node.choices.filter(choice => {
      // Filter choices based on photo conditions
      if (choice.requiresPhoto && !this.lastPhotoSentInNode) return false;
      if (choice.requiresNoPhoto && this.lastPhotoSentInNode) return false;
      return true;
    });

    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = App.formatText(choice.text);
      btn.style.animationDelay = (index * 0.08) + 's';

      btn.addEventListener('click', () => {
        this.makeChoice(choice);
      });

      this.choicesPanel.appendChild(btn);
    });

    this.scrollToBottom();
  },

  makeChoice(choice) {
    // Add outgoing message
    this.addMessage('outgoing', App.formatText(choice.text), false);

    // Add points
    if (choice.points) {
      App.addPoints(choice.points);
    }

    // Hide choices
    this.choicesPanel.classList.add('hidden');
    this.choicesPanel.innerHTML = '';

    // Go to next node
    if (choice.next) {
      setTimeout(() => {
        this.playNode(choice.next);
      }, 500);
    }

    this.scrollToBottom();
  },

  showTyping() {
    // Remove existing typing indicator if any
    this.hideTyping();

    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typing-indicator';
    typing.innerHTML = `
      <img src="photo/обычные/1.jpg" alt="" class="typing-avatar">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;

    this.messagesContainer.appendChild(typing);
    this.scrollToBottom();
  },

  hideTyping() {
    const existing = document.getElementById('typing-indicator');
    if (existing) existing.remove();
  },

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    });
  },

  getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
  },

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
};
