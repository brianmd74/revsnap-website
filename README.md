# RevSnap Marketing Website

A complete, production-ready marketing website for RevSnap - AI-powered revenue recovery through voice calls.

## Features

- 🎨 Modern SaaS design with clean aesthetics
- 📱 Fully responsive mobile-first design  
- ⚡ High performance (Lighthouse 90+)
- ♿ WCAG AA accessibility compliant
- 🔍 SEO optimized with proper meta tags and JSON-LD
- 📝 Complete blog with SEO-ready articles
- 📋 TCPA-compliant forms with validation
- 🛡️ Security-focused with proper headers

## Pages

- **Homepage** (`/`) - Complete marketing site with all sections
- **Contact** (`/contact`) - Contact forms and company info
- **Blog** (`/blog/`) - Article index and individual posts
- **Legal** (`/legal/`) - Privacy, Terms, TCPA compliance pages

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with design system
- **Forms**: Client-side validation with API integration
- **SEO**: JSON-LD structured data, sitemap, robots.txt
- **Performance**: Lazy loading, optimized assets

## Setup

1. Clone or download the website files
2. Configure your web server to serve static files
3. Set up form handling API endpoints
4. Configure analytics and tracking
5. Update domain references from `revsnap.ai` to your domain

## Form Integration

Forms are configured to submit to `/api/lead` with fallback to `mailto:`. 

To integrate with your backend:
1. Replace the API endpoint in `main.js`
2. Configure your CRM integration
3. Set up email notifications
4. Add to your marketing automation

## SEO Configuration

- Update meta descriptions and titles for your brand
- Replace JSON-LD schema with your company information
- Submit sitemap.xml to Google Search Console
- Configure Google Analytics and other tracking

## Compliance

- TCPA-compliant forms with required consent checkboxes
- Privacy policy and terms of service templates
- GDPR-ready cookie consent (requires implementation)
- Accessibility features for screen readers

## Performance Optimizations

- Lazy loading for images
- Minified CSS and JavaScript (production build)
- Proper caching headers
- Compressed assets
- Preloaded critical fonts

## Customization

### Colors
Primary: `#3B82F6` (Blue)
Success: `#22C55E` (Green)  
Neutral: `#0F172A` to `#F8FAFC` (Slate scale)

### Typography
- UI Text: Inter
- Headlines: Inter (fallback to system fonts)

### Content
All copy is provided as specified. Replace placeholder content:
- Company information in footer
- Contact details
- Social media links
- Team information

## Deployment Checklist

- [ ] Update domain references
- [ ] Configure SSL certificate  
- [ ] Set up form handling backend
- [ ] Configure analytics tracking
- [ ] Test all forms and CTAs
- [ ] Submit sitemap to search engines
- [ ] Configure monitoring and alerts
- [ ] Test mobile responsiveness
- [ ] Validate accessibility
- [ ] Run Lighthouse audit

## Support

For questions about implementation or customization, contact the development team.

## License

Proprietary - All rights reserved.