(function() {
  'use strict';

  const CHATBOT_CONFIG = {
    baseUrl: window.location.origin,
    tailwindCDN: 'https://cdn.tailwindcss.com'
  };

  function loadTailwind() {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src*="tailwindcss"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = CHATBOT_CONFIG.tailwindCDN;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .chat-widget-open {
        animation: slideIn 0.3s ease-out;
      }

      .message-fade-in {
        animation: fadeIn 0.3s ease-out;
      }

      .chat-widget-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }

      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .pulse-animation {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: .5;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function injectChatbotHTML() {
    const chatbotHTML = `
      <div id="chatbot-widget" class="chat-widget-container">
        <!-- Floating Button -->
        <div id="chat-toggle-btn" class="fixed bottom-6 right-6 z-50 cursor-pointer group">
          <div class="relative">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div id="notification-badge" class="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              1
            </div>
          </div>
        </div>

        <!-- Chat Window -->
        <div id="chat-window" class="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex-col hidden chat-widget-open">
          <!-- Header -->
          <div class="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <svg class="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                </div>
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600"></div>
              </div>
              <div>
                <h3 class="font-semibold text-lg">AI Assistant</h3>
                <p class="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button id="sound-btn" class="hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                </svg>
              </button>
              <button id="notification-btn" class="hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              <button id="clear-btn" class="hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
              <button id="minimize-btn" class="hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Messages Area -->
          <div id="messages-container" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
            <!-- Messages will be added here dynamically -->
          </div>

          <!-- Input Area -->
          <div class="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
            <div class="flex items-center space-x-2">
              <button id="attach-btn" class="text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
              <input
                type="text"
                id="message-input"
                placeholder="Write a message..."
                class="flex-1 border-0 focus:ring-0 focus:outline-none text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-2"
              />
              <button id="emoji-btn" class="text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-2 text-center">Powered by AI • Press Enter to send</p>
          </div>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = chatbotHTML;
    document.body.appendChild(container);
  }

  function loadChatbotScript() {
    const chatbotJS = `
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
          avatar.className = \`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 \${
            isBot ? 'bg-blue-600' : 'bg-gray-800'
          }\`;

          if (isBot) {
            avatar.innerHTML = \`
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
              </svg>
            \`;
          } else {
            avatar.innerHTML = \`
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            \`;
          }

          const contentDiv = document.createElement('div');
          contentDiv.className = 'flex-1';

          const messageBubble = document.createElement('div');
          messageBubble.className = \`rounded-2xl p-3 shadow-sm \${
            isBot
              ? 'bg-white rounded-tl-none'
              : 'bg-blue-600 rounded-tr-none text-white ml-auto'
          }\`;
          messageBubble.style.maxWidth = '85%';
          if (!isBot) {
            messageBubble.style.marginLeft = 'auto';
          }

          const messageText = document.createElement('p');
          messageText.className = \`text-sm \${isBot ? 'text-gray-800' : 'text-white'}\`;
          messageText.textContent = text;

          messageBubble.appendChild(messageText);

          const timestampDiv = document.createElement('div');
          timestampDiv.className = 'flex items-center space-x-2 mt-1';

          const timestampText = document.createElement('p');
          timestampText.className = \`text-xs text-gray-400 \${isBot ? 'ml-2' : 'mr-2 text-right'}\`;
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
          return \`\${hours}:\${minutesStr} \${ampm}\`;
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

              const fileMessage = \`📎 File attached: \${fileName} (\${fileSize} MB)\`;
              this.sendMessage(fileMessage);

              setTimeout(() => {
                const botResponse = \`I've received your file "\${fileName}". File upload functionality is ready for backend integration!\`;
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

      window.chatbotInstance = new Chatbot();
    `;

    const script = document.createElement('script');
    script.textContent = chatbotJS;
    document.body.appendChild(script);
  }

  async function initChatbot() {
    try {
      await loadTailwind();
      injectStyles();
      injectChatbotHTML();

      setTimeout(() => {
        loadChatbotScript();
      }, 100);
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
