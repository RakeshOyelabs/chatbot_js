# AI Chatbot Widget

A lightweight, customizable chatbot widget that can be easily integrated into any website. Built with vanilla JavaScript and Tailwind CSS for maximum compatibility and performance.

## Features

- 🚀 **Easy Integration**: Add with a single line of code
- 🎨 **Customizable**: Change colors, position, and behavior
- 🌓 **Themes**: Light and dark mode support
- 📱 **Responsive**: Works on all device sizes
- 🎵 **Sound Notifications**: Optional sound alerts for new messages
- ⚡ **Fast**: Lightweight and optimized for performance
- 🔌 **No Dependencies**: Works out of the box

## Installation

### Option 1: Direct Script Include (Easiest)

Add this code to your website's `<head>` section:

```html
<!-- Configuration (optional) -->
<script>
  window.ChatbotConfig = {
    position: 'bottom-right',  // 'bottom-right' or 'bottom-left'
    theme: 'light',           // 'light' or 'dark'
    autoOpen: false,          // Open chat automatically
    sound: true,              // Enable/disable sound
    onReady: function() {
      console.log('Chatbot is ready!');
    },
    onMessage: function(message) {
      console.log('New message:', message);
    }
  };
</script>

<!-- Load the chatbot widget -->
<script src="https://your-domain.com/embed.js" defer></script>
```

### Option 2: NPM Package (Coming Soon)

```bash
npm install @your-org/chatbot-widget
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| position | string | 'bottom-right' | Position of the chat widget |
| theme | string | 'light' | Color theme ('light' or 'dark') |
| autoOpen | boolean | false | Open chat automatically on page load |
| sound | boolean | true | Enable/disable sound notifications |
| onReady | function | null | Called when widget is loaded |
| onOpen | function | null | Called when chat is opened |
| onClose | function | null | Called when chat is closed |
| onMessage | function | null | Called on new messages |
| onError | function | null | Called on errors |

## JavaScript API

Control the widget programmatically:

```javascript
// Open the chat
window.ChatbotWidget?.open();

// Close the chat
window.ChatbotWidget?.close();

// Toggle the chat
window.ChatbotWidget?.toggle();

// Send a message
window.ChatbotWidget?.sendMessage('Hello!');

// Update configuration
window.ChatbotWidget?.updateConfig({
  theme: 'dark',
  position: 'bottom-left',
  sound: false
});
```

## Development

### Prerequisites
- Node.js 14+
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Deployment

1. Build the project: `npm run build`
2. Deploy the contents of the `dist` directory to your web server
3. Update the script URL in your integration code

## License

MIT

## Files Overview

- `embed.js` - The main embed script for third-party integration
- `chatbot-widget.html` - Standalone chatbot widget page
- `chatbot.js` - Chatbot functionality and logic
- `index.html` - Demo and documentation page
- `third-party-example.html` - Example of chatbot embedded in a third-party site

## Usage

### Opening the Chat

Click the blue floating button in the bottom-right corner of the page.

### Sending Messages

1. Type your message in the input field
2. Press Enter or click send
3. The AI will respond automatically

### Features

- **Emoji Picker**: Click the emoji button to add emojis to your messages
- **Reactions**: Click on reaction emojis below messages to react
- **Sound Toggle**: Click the speaker icon to enable/disable notification sounds
- **Clear Chat**: Click the trash icon to clear all messages
- **Minimize**: Click the down arrow to close the chat window

## Customization

You can customize the chatbot by modifying the `embed.js` file:

### Change Bot Responses

Edit the `responses` array in the `generateBotResponse` method:

```javascript
const responses = [
  "Your custom response here",
  "Another response",
  // Add more responses...
];
```

### Change Colors

The chatbot uses Tailwind CSS. You can customize colors by modifying the class names in the HTML structure.

### Change Bot Name

Replace "AI Assistant" with your preferred name in the HTML structure.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technical Details

- **Framework**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **No Build Required**: Works directly in the browser
- **Size**: ~40KB total (uncompressed)

## Integration Examples

### Basic HTML Website

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to my website</h1>

  <!-- Add chatbot -->
  <script src="https://your-domain.com/embed.js"></script>
</body>
</html>
```

### WordPress

Add the embed code to your theme's footer.php or use a custom HTML widget.

### React/Vue/Angular

Add the script tag to your index.html file or load it dynamically in your component.

## Development

To modify the chatbot:

1. Edit `chatbot.js` for functionality changes
2. Edit `chatbot-widget.html` for structure changes
3. Test your changes in the browser
4. Run `npm run build` to create the production version

## Deployment

After building, deploy these files to your web server:

- `embed.js` - Main embed script
- Any additional assets (if added)

## License

MIT License - Feel free to use in personal and commercial projects.

## Support

For issues or questions, please contact support or open an issue in the repository.
