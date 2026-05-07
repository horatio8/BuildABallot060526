# Page Topology — buildaballot.org.au

Total page height (desktop 1440px): ~7075px
Container max-width: 1280px
Section padding: 48px
Tech: Webflow site (data-wf-page attribute present)

## Sections (top to bottom)

1. **TopBanner** — full-width dark bar (~33px tall): "Get ready to vote in the Farrer by-election" centered + small links (About, Donate, Contact) right
2. **Header / NavBar** — sticky, transparent over hero (turns dark on scroll past hero), logo "BUILD A BALLOT" left, nav (Elections 101, Get involved▼, FAQs) right + lime green "Get updates" button. ~80px tall
3. **HeroSection** — full-viewport, scenic Farrer landscape bg, huge serif headline "Hey [FARRER pill] Farrer! Plan your vote for the by-election [BY-ELECTION pill]" centered, white text, paragraph, lime "Plan your vote" CTA
4. **HowItWorksSection** — light grey/off-white bg. "How it works" eyebrow + "Build a Ballot makes doing your research easy" h2 + paragraph. Then 3 mockup images in row (Frame 1163, Group 1207, Build a Ballot mockup variants). Then 3 step columns (STEP 1/2/3 chips + descriptions).
5. **TestimonialsSection** — slightly darker grey bg (#EAE9E8). Centered "Trusted by 600,000+ Australians" h2 + small purple "Get updates" pill button. Below: 2 horizontal-scrolling rows of testimonial cards (auto-scroll marquee), each card = quote + name pill (lime green).
6. **BigStatementSection** — full lime-green panel (#CFFC8F). Centered eyebrow "Think your vote doesn't count?" + giant serif headline "Governments shape our future and we get to shape our government" with [GET pill] purple and [READY pill] grey inline + lime "Build your ballot" CTA below.
7. **ThreeColumnSection** — light bg. 3 vertical columns separated by thin vertical lines, each: title (sans), paragraph, dark CTA button.
8. **FaqSection** — light bg. Centered "FAQS" lime pill + "Frequently Asked Questions" h2 + subline "Have a question that hasn't been answered below? Submit a question here." Then 9 accordion items with + icons that expand.
9. **FundedByYouSection** — light bg. Centered "For you, funded by you" h2 + 2 paragraphs + lime green "Donate" CTA.
10. **SignupSection** — light bg. 2-column: left = headline "It's your vote, make sure it reflects your values" (with italic word), paragraph, form (Name, Email, I'm a... select, I'm based in... select, checkboxes, dark "Submit" button); right = phone mockup image (hand holding phone showing the app).
11. **Footer** — full-width dark (#232323). Logo top-left, social icons top-right (IG, TikTok, LI). 3 link columns (Elections 101 / Support / About) + Get updates form right. Bottom row: small "Build a Ballot is a tool by Project Planet (ABN..)" + Privacy Policy / Terms / Site by Tilt Studio.

## Z-index / Layering
- TopBanner + NavBar are sticky (TopBanner above NavBar)
- Hero bg image fills section behind text
- Pills inside h1 are `display: inline-block` overlapping word boundaries (negative-margin, slightly rotated/positioned)

## Inline pill labels (`.in-line-label`)
- `.in-line-label.green.neg-right` — lime green "Farrer" pill, negative right margin (overlaps next word)
- `.in-line-label.purple.neg-left` — purple "By-election" pill
- `.in-line-label.grey` — grey "Ready" pill
- All: 1px solid #232323, 4px radius, 0 8px padding, Space Mono 12px, uppercase, letter-spacing -0.02px
