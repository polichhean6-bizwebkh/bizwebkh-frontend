# Hearing Solution Cambodia Website

Static, responsive public website for Hearing Solution Cambodia. It includes services, products, hearing-health articles, a modal reader, FAQ, contact details, and an appointment-request interface.

## Preview

Open `index.html` directly in a browser, or serve this folder with any simple static web server.

## Structure

```text
index.html / 404.html   Site pages
css/                    Site, motion, icon, content, modal, and location styles
js/                     Navigation, modal/FAQ, and motion scripts
assets/logo/            Site logo
assets/icons/           Local SVG sprite
assets/images/          Optimized WebP image assets
```

## Official contact

- Address: No. 14E, St. 6B, Sangkat Donkor, Khna Dongkor, Phnom Penh
- Phone: 088 696 8838, 070 743 706, 078 219 220
- Map: https://www.google.com/maps?q=11.524063,104.877820&ll=11.524063,104.877820&z=16

## Important notes

The appointment form is demo UI until it is connected to the production booking API. Demo testimonials must be replaced with approved customer feedback before a production launch. People shown in stock images are not actual staff or customers.

## Deployment

All project asset paths are relative, so the site can be deployed to a subfolder such as `https://www.bizwebkh.com/c022-hearing-solution/`. Upload this folder's contents to that subfolder; do not change asset paths to root-relative paths.
