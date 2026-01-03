class Chatbot {
  constructor() {
    this.isOpen = false;
    this.soundEnabled = true;
    this.messages = [];
    this.init();
  }

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.loadInitialMessages();
  }

  cacheElements() {
    this.toggleBtn = document.getElementById('chat-toggle-btn');
    this.chatWindow = document.getElementById('chat-window');
    this.minimizeBtn = document.getElementById('minimize-btn');
    this.messageInput = document.getElementById('message-input');
    this.messagesContainer = document.getElementById('messages-container');
    this.soundBtn = document.getElementById('sound-btn');
    this.clearBtn = document.getElementById('clear-btn');
    this.notificationBadge = document.getElementById('notification-badge');
    this.emojiBtn = document.getElementById('emoji-btn');
    this.attachBtn = document.getElementById('attach-btn');
  }

  attachEventListeners() {
    this.toggleBtn.addEventListener('click', () => this.toggleChat());
    this.minimizeBtn.addEventListener('click', () => this.toggleChat());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.messageInput.value.trim()) {
        this.sendMessage(this.messageInput.value.trim());
        this.messageInput.value = '';
      }
    });
    this.soundBtn.addEventListener('click', () => this.toggleSound());
    this.clearBtn.addEventListener('click', () => this.clearChat());
    this.emojiBtn.addEventListener('click', () => this.showEmojiPicker());
    this.attachBtn.addEventListener('click', () => this.handleAttachment());
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatWindow.classList.remove('hidden');
      this.chatWindow.classList.add('flex');
      this.notificationBadge.classList.add('hidden');
      this.messageInput.focus();
    } else {
      this.chatWindow.classList.add('hidden');
      this.chatWindow.classList.remove('flex');
    }
  }

  loadInitialMessages() {
    const initialMessages = [
      {
        text: "Thanks for reaching out! I'm here to assist you.",
        isBot: true,
        timestamp: this.getCurrentTime()
      }
    ];

    initialMessages.forEach(msg => {
      this.addMessageToUI(msg.text, msg.isBot, msg.timestamp);
    });
  }

  sendMessage(text) {
    const timestamp = this.getCurrentTime();
    this.addMessageToUI(text, false, timestamp);

    setTimeout(() => {
      this.generateBotResponse(text);
    }, 1000);
  }

  generateBotResponse(userMessage) {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand what you're looking for. Here's what I can tell you...",
      "Thanks for asking! I'd be happy to assist with that.",
      "Interesting! Let me provide you with some information about that.",
      "I'm here to help! Let me answer your question.",
      "Great point! Here's what you need to know..."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const timestamp = this.getCurrentTime();

    this.addMessageToUI(randomResponse, true, timestamp);

    if (this.soundEnabled) {
      this.playNotificationSound();
    }

    if (!this.isOpen) {
      this.notificationBadge.classList.remove('hidden');
    }
  }

  addMessageToUI(text, isBot, timestamp, reactions = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-2 message-fade-in';

    if (!isBot) {
      messageDiv.classList.add('flex-row-reverse', 'space-x-reverse');
    }

    const avatar = document.createElement('div');
    avatar.className = `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
      isBot ? 'bg-blue-600' : 'bg-gray-800'
    }`;

    if (isBot) {
      avatar.innerHTML = `
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
        </svg>
      `;
    } else {
      avatar.innerHTML = `
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
        </svg>
      `;
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'flex-1';

    const messageBubble = document.createElement('div');
    messageBubble.className = `rounded-2xl p-3 shadow-sm ${
      isBot
        ? 'bg-white rounded-tl-none'
        : 'bg-blue-600 rounded-tr-none text-white ml-auto'
    }`;
    messageBubble.style.maxWidth = '85%';
    if (!isBot) {
      messageBubble.style.marginLeft = 'auto';
    }

    const messageText = document.createElement('p');
    messageText.className = `text-sm ${isBot ? 'text-gray-800' : 'text-white'}`;
    messageText.textContent = text;

    messageBubble.appendChild(messageText);

    const timestampDiv = document.createElement('div');
    timestampDiv.className = 'flex items-center space-x-2 mt-1';

    const timestampText = document.createElement('p');
    timestampText.className = `text-xs text-gray-400 ${isBot ? 'ml-2' : 'mr-2 text-right'}`;
    timestampText.textContent = timestamp;

    if (!isBot) {
      const checkmarks = document.createElement('span');
      checkmarks.className = 'text-blue-300';
      checkmarks.innerHTML = '✓✓';
      timestampDiv.appendChild(timestampText);
      timestampDiv.appendChild(checkmarks);
      timestampDiv.style.justifyContent = 'flex-end';
    } else {
      timestampDiv.appendChild(timestampText);
    }

    contentDiv.appendChild(messageBubble);
    contentDiv.appendChild(timestampDiv);

    if (!isBot && reactions) {
      const reactionDiv = document.createElement('div');
      reactionDiv.className = 'flex space-x-1 mt-1 justify-end mr-2';
      reactionDiv.innerHTML = reactions;
      contentDiv.appendChild(reactionDiv);
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();

    if (!isBot) {
      setTimeout(() => {
        this.addReactionButton(messageBubble);
      }, 500);
    }
  }

  addReactionButton(messageBubble) {
    const existingReactions = messageBubble.parentElement.querySelector('.reaction-container');
    if (existingReactions) return;

    const reactionContainer = document.createElement('div');
    reactionContainer.className = 'reaction-container flex space-x-1 mt-1 justify-end';

    const reactionEmojis = ['👍', '❤️', '😊', '🎉', '👏'];
    const reactionCounts = {};

    reactionEmojis.forEach(emoji => {
      reactionCounts[emoji] = 0;

      const emojiBtn = document.createElement('button');
      emojiBtn.className = 'text-base px-2 py-1 hover:bg-gray-100 rounded-full transition-all cursor-pointer bg-gray-50 border border-gray-200';

      const emojiSpan = document.createElement('span');
      emojiSpan.textContent = emoji;

      const countSpan = document.createElement('span');
      countSpan.className = 'ml-1 text-xs text-gray-600 font-semibold';
      countSpan.textContent = '';
      countSpan.style.display = 'none';

      emojiBtn.appendChild(emojiSpan);
      emojiBtn.appendChild(countSpan);

      emojiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        reactionCounts[emoji]++;

        countSpan.textContent = reactionCounts[emoji];
        countSpan.style.display = 'inline';

        emojiBtn.classList.add('bg-blue-100', 'border-blue-300');
        emojiBtn.classList.remove('bg-gray-50', 'border-gray-200');

        const scaleEffect = emojiSpan;
        scaleEffect.style.transform = 'scale(1.5)';
        setTimeout(() => {
          scaleEffect.style.transform = 'scale(1)';
        }, 200);

        if (this.soundEnabled) {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = 1000;
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        }
      });

      reactionContainer.appendChild(emojiBtn);
    });

    messageBubble.parentElement.appendChild(reactionContainer);
  }

  getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.soundBtn.style.opacity = this.soundEnabled ? '1' : '0.5';
  }

  clearChat() {
    if (confirm('Are you sure you want to clear all messages?')) {
      this.messagesContainer.innerHTML = '';
      this.loadInitialMessages();
    }
  }

  playNotificationSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  showEmojiPicker() {
    const existingPicker = document.getElementById('emoji-picker-popup');
    if (existingPicker) {
      existingPicker.remove();
      return;
    }

    const emojis = [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
      '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
      '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
      '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮',
      '🤧', '🥵', '🥶', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️',
      '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥',
      '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱',
      '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
      '👆', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤝', '💪',
      '🙏', '✍️', '💅', '🤳', '💃', '🕺', '👯', '🧘', '🛀', '🛌',
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
      '✨', '💫', '⭐', '🌟', '✳️', '❇️', '🔥', '💥', '💯', '🎉',
      '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⚽', '🏀', '🏈'
    ];

    const pickerPopup = document.createElement('div');
    pickerPopup.id = 'emoji-picker-popup';
    pickerPopup.className = 'absolute bottom-16 right-4 bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-200';
    pickerPopup.style.width = '320px';
    pickerPopup.style.maxHeight = '300px';
    pickerPopup.style.overflowY = 'auto';

    const title = document.createElement('div');
    title.className = 'font-semibold text-gray-700 mb-2 pb-2 border-b border-gray-200';
    title.textContent = 'Pick an emoji';

    const emojiGrid = document.createElement('div');
    emojiGrid.className = 'grid grid-cols-8 gap-2';

    emojis.forEach(emoji => {
      const emojiBtn = document.createElement('button');
      emojiBtn.className = 'text-2xl hover:bg-gray-100 rounded p-1 transition-all hover:scale-125 cursor-pointer';
      emojiBtn.textContent = emoji;
      emojiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.messageInput.value += emoji;
        this.messageInput.focus();
        pickerPopup.remove();
      });
      emojiGrid.appendChild(emojiBtn);
    });

    pickerPopup.appendChild(title);
    pickerPopup.appendChild(emojiGrid);

    const inputArea = this.messageInput.closest('.p-4');
    inputArea.style.position = 'relative';
    inputArea.appendChild(pickerPopup);

    setTimeout(() => {
      document.addEventListener('click', function closeEmojiPicker(e) {
        if (!pickerPopup.contains(e.target) && e.target !== this.emojiBtn) {
          pickerPopup.remove();
          document.removeEventListener('click', closeEmojiPicker);
        }
      }.bind(this));
    }, 100);
  }

  handleAttachment() {
    const existingInput = document.getElementById('file-input-hidden');
    if (existingInput) {
      existingInput.remove();
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'file-input-hidden';
    fileInput.style.display = 'none';
    fileInput.accept = 'image/*,.pdf,.doc,.docx,.txt';

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        const fileName = file.name;

        const fileMessage = `📎 File attached: ${fileName} (${fileSize} MB)`;
        this.sendMessage(fileMessage);

        setTimeout(() => {
          const botResponse = `I've received your file "${fileName}". File upload functionality is ready for backend integration!`;
          this.addMessageToUI(botResponse, true, this.getCurrentTime());

          if (this.soundEnabled) {
            this.playNotificationSound();
          }
        }, 1000);
      }
      fileInput.remove();
    });

    document.body.appendChild(fileInput);
    fileInput.click();
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.chatbotInstance = new Chatbot();
  });
}
