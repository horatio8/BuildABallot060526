# Behaviors — buildaballot.org.au

## Header (NavBar)
- Sticky/fixed at top (`.new-nav.w-nav` class is Webflow nav)
- TopBanner (above nav) and NavBar both visible at scroll position 0
- On scroll past hero, NavBar gets a slight bg shadow / floating treatment (Webflow standard)
- Mobile: hamburger toggles full overlay menu

## Hero
- Static background image (Farrer landscape) — no parallax
- Headline pills (FARRER, BY-ELECTION) are positioned inline within h1 with slight negative margins making them overlap word boundaries
- Pills appear NOT to animate on entry

## How It Works
- 3 mockup images appear above 3 text columns
- All static — no scroll-driven animation observed in screenshots

## Testimonials Section
- Two rows of testimonial cards that scroll horizontally automatically (Webflow marquee/infinite-loop animation)
- Likely uses CSS `@keyframes` translateX(-100%) infinite, with row 2 going opposite direction
- Cards are not interactive (just hover hint may apply)

## FAQ
- Click question → opens accordion with the answer
- Plus icon rotates to X / minus on open
- Standard Webflow accordion (height transition)

## Submit Form
- Standard Webflow form submission with success/error states inline

## Footer
- Same Get updates form as in section 10 (duplicate)

## Responsive
- Desktop (1440): 1280px container, multi-column layouts
- Tablet (~768): columns may stack to 2-up or single
- Mobile (<480): everything stacks single column

## Smooth scroll
- No Lenis/Locomotive detected — uses native browser scroll
