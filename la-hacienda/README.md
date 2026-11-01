# La Hacienda — CB NSW 30 CBD & East

A static Melbourne Cup 2026 office draw, designed for a shared meeting-room screen. Open `index.html` through a static web server; no account, backend, analytics or paid services required.

## Run

`npm start` serves port 3000. `npm ci && npm test` checks the draw, saved-state validation and Excel workbook export. The site can be hosted at any GitHub Pages subdirectory; all assets use relative paths.

## Play

Optionally enter a player's name, then pick a numbered stable door. Horses are cryptographically shuffled once per new draw. A door stays open and cannot be claimed twice. Clicking it again displays its existing assignment. Progress is saved in localStorage on that browser, not shared across devices. Download picks as a genuine `.xlsx` Excel workbook before changing computers or clearing browser data. The workbook includes player, horse, race number, barrier, trainer and jockey, with filters and a frozen header. New draw requires confirmation.

Music uses an inline, visible YouTube player for Vevo’s **Feel Good Party Anthems**: https://www.youtube.com/playlist?list=PL9tY0BWXOZFvZwC6kZUw0iszAmAEXjZuN. This is a similar daytime-party mix, not the exact Spotify playlist. It includes popular vocal recordings and may contain explicit lyrics. Click Load party playlist, then Play in YouTube's controls. The player stays mounted when horses are revealed or a new draw starts. Playlist repeat is enabled. YouTube controls ads, sign-in requirements, embedding and regional availability; uninterrupted playback is not guaranteed. No media is downloaded or rehosted, and no YouTube connection is made until the user loads the player. Office-event music permissions remain the organiser's responsibility.

Full screen is offered on supported browsers. Keyboard buttons, native modal dialogs, visible focus, reduced-motion support and responsive layouts are included. Hidden horses are not placed in the accessibility tree until revealed; this is a casual game, not a tamper-resistant lottery (the data is available in the source).

## Field and artwork

24 final acceptances, VRC 31 October 2026, checked 1 November 2026:
https://www.vrc.com.au/latest-news/lexus-melbourne-cup-field-and-barriers-announced-for-166th-running/

Trainer and jockey details:
https://www.vrc.com.au/latest-news/every-runner-in-the-2026-lexus-melbourne-cup/

Late scratchings are possible. Check the VRC before playing. This snapshot is not a live race feed. Shockletz's jockey was unspecified in the VRC runner guide and is shown as “To be confirmed”.

Estate and horse images are original AI-generated decorative artwork, not actual photographs of runners. Fonts: Cormorant Garamond and DM Sans via Google Fonts, with local fallback fonts. All other assets are local. No affiliation with the VRC.

ExcelJS 4.4.0 is locally bundled under its MIT license in `assets/vendor/`. The matching npm dev dependency is used only to verify workbook round trips. No build or npm install is required to serve the website.
