# Sushobhit Rajan - Personal Website

Personal website and technical blog showcasing Software Engineering, Machine Learning, and Tech Design articles.

🌐 **Live Site**: [sushobhitrajan.in](https://sushobhitrajan.in) | [sushobhitrajan.github.io](https://sushobhitrajan.github.io)

## 📋 Features

- **Tech Blocks**: Curated technology resources, tools, and frameworks
- **Software Engineering Guidelines**: Best practices and principles for building quality software
- **Tech Design Articles**: Insights on software design, architecture, and technology
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean & Modern UI**: Minimalist design with smooth animations
- **Fast Loading**: Lightweight HTML, CSS, and JavaScript for optimal performance

## 🛠️ Tech Stack

This website uses a simple, modern tech stack:

- **HTML5**: Semantic markup for content structure
- **CSS3**: Modern styling with CSS variables and Flexbox/Grid
- **JavaScript (Vanilla)**: Interactive features and navigation
- **GitHub Pages**: Hosting and deployment
- **Custom Domain**: [sushobhitrajan.in](https://sushobhitrajan.in)

## 📁 Project Structure

```
sushobhitrajan.github.io/
├── index.html              # Homepage
├── tech-blocks.html        # Tech Blocks page
├── guidelines.html         # Software Engineering Guidelines
├── articles.html           # Tech Design Articles
├── css/
│   └── styles.css         # All stylesheets
├── js/
│   └── main.js            # JavaScript functionality
├── assets/
│   ├── images/            # Image assets
│   └── icons/             # Icon assets
├── CNAME                   # Custom domain configuration
├── package.json            # Project metadata
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, or Edge)
- Git (optional, for cloning the repository)
- Python 3 (optional, for local development server)

### Running Locally

1. **Clone the repository** (if you have Git):
   ```bash
   git clone https://github.com/sushobhitrajan/sushobhitrajan.github.io.git
   cd sushobhitrajan.github.io
   ```

2. **Open directly in browser**:
   - Simply open `index.html` in your browser, or
   - Drag and drop `index.html` into your browser

3. **Using a local development server** (recommended):
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

   ```bash
   # Node.js (if you have it installed)
   npx http-server -p 8000
   ```

### Viewing the Website

Once the server is running, open your browser and navigate to:
- **Local**: `http://localhost:8000`
- **Live**: [https://sushobhitrajan.in](https://sushobhitrajan.in)

## 📝 Pages

### Homepage (`index.html`)
Welcome page with navigation to all sections.

### Tech Blocks (`tech-blocks.html`)
Curated collection of technology resources organized in card layouts. Features various tech stacks and tools.

### Guidelines (`guidelines.html`)
Software engineering best practices covering:
- Code Quality
- Version Control
- Testing
- Documentation
- Performance
- Security

### Articles (`articles.html`)
Tech design articles and blog posts about software architecture, design patterns, and technology insights.

## 🎨 Customization

### Adding Content

1. **Tech Blocks**: Edit `tech-blocks.html` and add new cards in the `.tech-grid` section
2. **Guidelines**: Update sections in `guidelines.html`
3. **Articles**: Add new article items in `articles.html`

### Styling

- **Colors**: Modify CSS variables in `css/styles.css` (under `:root`)
- **Fonts**: Change the Google Fonts import in the HTML `<head>`
- **Layout**: Adjust container max-widths and spacing in CSS

### Adding Images

Place images in `assets/images/` and reference them:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

## 🌐 Deployment

This site is automatically deployed to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Pages automatically rebuilds the site
3. Changes go live at:
   - Custom domain: [sushobhitrajan.in](https://sushobhitrajan.in)
   - GitHub Pages: [sushobhitrajan.github.io](https://sushobhitrajan.github.io)

### Custom Domain

The site uses a custom domain configured via the `CNAME` file. To update:
1. Edit `CNAME` with your domain
2. Configure DNS settings with your domain provider
3. Ensure DNS points to GitHub Pages

## 🔧 Development

### File Organization

- Keep HTML semantic and accessible
- CSS organized by sections (see comments in `styles.css`)
- JavaScript functions are modular and commented
- Images optimized for web

### Best Practices

- Validate HTML using W3C Validator
- Test responsive design on multiple devices
- Optimize images before adding to `assets/images/`
- Keep CSS organized with clear section comments

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C Web Standards](https://www.w3.org/standards/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sushobhit Rajan**
- Website: [sushobhitrajan.in](https://sushobhitrajan.in)
- LinkedIn: [linkedin.com/in/susrajan](https://www.linkedin.com/in/susrajan/)
- GitHub: [@sushobhitrajan](https://github.com/sushobhitrajan)

## 🙏 Acknowledgments

- Background image from [Unsplash](https://unsplash.com)
- Font: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts
- Inspired by modern minimalist web design

---

**Built with ❤️ using HTML, CSS, and JavaScript**
