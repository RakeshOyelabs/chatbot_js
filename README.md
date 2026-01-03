# AI Assistant Chatbot Widget

A beautiful, embeddable chatbot widget built with HTML, Tailwind CSS, and JavaScript. Perfect for adding AI-powered chat functionality to any website.

## Features

- Real-time messaging with AI responses
- Emoji support and reactions
- Sound notifications (toggle on/off)
- Message timestamps
- Read receipts
- Responsive design
- Easy one-line integration
- No external dependencies required

## Quick Start

### Option 1: Use as Standalone Widget

Open `chatbot-widget.html` in your browser to see the chatbot in action.

### Option 2: Embed in Your Website

Add this single line of code before the closing `</body>` tag in your HTML:

```html
<script src="https://your-domain.com/embed.js"></script>
```

That's it! The chatbot will automatically appear on your website.

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
