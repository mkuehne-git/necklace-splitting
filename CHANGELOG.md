# Changelog

## v2.3.1 · 2026-10-01

* No functional change. The plan for this release is marked done.

## v2.3.0 · 2026-10-01 · [739bc80](https://github.com/mkuehne-git/necklace-splitting/commit/739bc80)

* **Roll the dice** for a new necklace to cut: in *Cut the necklace*, the dice left of the fairness meter rolls a new necklace with the number of jewels set, and starts the game over, with the solutions hidden again. When the number of jewels is even, each kind comes in an even number, so a fair split exists even with Discrete necklace.

## v2.2.0 · 2026-10-01 · [5d4b206](https://github.com/mkuehne-git/necklace-splitting/commit/5d4b206)

* The necklace has its own Discrete switch, **Discrete necklace**, and it is off by default: the necklace, its handles and the fairness meter now split jewels at the cuts, while the sphere still counts whole jewels (**Discrete sphere**). Where the two differ, the sphere's solutions are only nearly fair on the necklace - set both alike to see them agree.

## v2.1.0 · 2026-10-01 · [e849438](https://github.com/mkuehne-git/necklace-splitting/commit/e849438)

* A roomier layout: the sphere sits higher, clear of the necklace; the necklace's rows for thief A and thief B stand further apart; and the fairness meter is a little smaller, with more space above it.

## v2.0.8 · 2026-10-01 · [28de4eb](https://github.com/mkuehne-git/necklace-splitting/commit/28de4eb)

* No functional change. A plan for the next features: the necklace's own Discrete switch, a dice for a new necklace, and a roomier layout.

## v2.0.7 · 2026-10-01 · [de1c753](https://github.com/mkuehne-git/necklace-splitting/commit/de1c753)

* No functional change. The roadmap lists only what is still open.

## v2.0.6 · 2026-10-01 · [19d45d6](https://github.com/mkuehne-git/necklace-splitting/commit/19d45d6)

* Fixed: when the browser took the graphics processor away, for example on a phone short of memory, the sphere stayed empty until you touched it. It now comes back by itself, and a message says what happened meanwhile.

## v2.0.5 · 2026-10-01 · [bcb80fe](https://github.com/mkuehne-git/necklace-splitting/commit/bcb80fe)

* No functional change. The imprint no longer needs the outdated crypto-js library, which makes it smaller to load.

## v2.0.4 · 2026-10-01 · [89479b1](https://github.com/mkuehne-git/necklace-splitting/commit/89479b1)

* Until you choose a theme with its button, the app now follows your system's light or dark mode also when it changes while the app is open, not only at startup.

## v2.0.3 · 2026-10-01 · [6dc0ce7](https://github.com/mkuehne-git/necklace-splitting/commit/6dc0ce7)

* No functional change. The build takes the app's version from the project itself, so the version shown is right however the build is started.

## v2.0.2 · 2026-10-01 · [d5ca448](https://github.com/mkuehne-git/necklace-splitting/commit/d5ca448)

* No functional change. An automatic test of the morph player no longer trips over a slow machine.

## v2.0.1 · 2026-10-01 · [5f10903](https://github.com/mkuehne-git/necklace-splitting/commit/5f10903)

* Fixed: without Discrete, the necklace drew a jewel that a cut runs through entirely on one side, so it jumped from one row to the other while the cut moved smoothly through it. It is now split at the cut, each thief's part in its row, as the split is computed.

## v2.0.0 · 2026-09-30 · [17936c2](https://github.com/mkuehne-git/necklace-splitting/commit/17936c2)

Necklace Splitting 2.0 brings together what came since 1.2:

* **Cut the necklace yourself.** Drag two handles along the necklace and give its pieces to the thieves; the marker on the sphere follows. The solutions are hidden meanwhile, so you find a fair split yourself, and the app celebrates it.
* **Three scenes** in the upper left corner: pointing at the sphere, cutting the necklace, and the Borsuk-Ulam shape.
* **The sphere morphs into the Borsuk-Ulam shape**, with a slider and player buttons to watch it form, pause it and play it back; lighting makes the shape's facets stand out.
* **Settings explain themselves**: the ⓘ behind a setting opens a short explanation.
* Before this version, the whole code was reviewed; the fixes are in v1.7.2 to v1.7.9.

## v1.7.15 · 2026-09-30 · [e0981de](https://github.com/mkuehne-git/necklace-splitting/commit/e0981de)

* No functional change. The description of the automated tests is up to date again.

## v1.7.14 · 2026-09-30 · [bc4a583](https://github.com/mkuehne-git/necklace-splitting/commit/bc4a583)

* No functional change. The automatic tests of the morph player get the time they need on slower machines.

## v1.7.13 · 2026-09-30 · [f7d4968](https://github.com/mkuehne-git/necklace-splitting/commit/f7d4968)

* No functional change. The automatic tests of drawing only on change allow a single redraw that a real browser event causes.

## v1.7.12 · 2026-09-30 · [a36923a](https://github.com/mkuehne-git/necklace-splitting/commit/a36923a)

* No functional change. The automatic tests that check the view rests when nothing changes wait for it to settle, also on slower machines.

## v1.7.11 · 2026-09-30 · [bf6bd88](https://github.com/mkuehne-git/necklace-splitting/commit/bf6bd88)

* No functional change. Three automatic tests of the morph failed on GitHub's slower machines; they no longer depend on how fast the machine is.

## v1.7.10 · 2026-09-30 · [9b3e120](https://github.com/mkuehne-git/necklace-splitting/commit/9b3e120)

* No functional change. Leftover debugging code and unused shader values are gone.

## v1.7.9 · 2026-09-30 · [c08c73a](https://github.com/mkuehne-git/necklace-splitting/commit/c08c73a)

* Fixed: Check for updates said nothing when it could not reach the server, for example offline. It now says the check failed.
* Fixed: a screen capture that failed ended silently. It now says so.

## v1.7.8 · 2026-09-30 · [4bd1dcb](https://github.com/mkuehne-git/necklace-splitting/commit/4bd1dcb)

* Fixed: Alt+S did not save a screen capture on a Mac, where it types "ß".

## v1.7.7 · 2026-09-30 · [f3b97c3](https://github.com/mkuehne-git/necklace-splitting/commit/f3b97c3)

* No functional change. The automatic tests on GitHub run with read-only access to the repository.

## v1.7.6 · 2026-09-30 · [404b618](https://github.com/mkuehne-git/necklace-splitting/commit/404b618)

* No functional change. The smaller findings of the code review that wait for later are listed in the roadmap.

## v1.7.5 · 2026-09-30 · [bf573e3](https://github.com/mkuehne-git/necklace-splitting/commit/bf573e3)

* Fixed: after changing the necklace or Discrete, the fairness meter showed the old split until the pointer moved again; after a new necklace it even contradicted the jewels shown. The cut now stays where it was and the meter follows at once. In the game, the handles no longer jump back to a third and two thirds when the necklace changes.

## v1.7.4 · 2026-09-30 · [b750114](https://github.com/mkuehne-git/necklace-splitting/commit/b750114)

* Fixed: with a necklace of only one kind of jewel, the solution band was missing. It marks where both thieves get equally long pieces, whatever the jewels, and now shows for such a necklace too.

## v1.7.3 · 2026-09-30 · [5889600](https://github.com/mkuehne-git/necklace-splitting/commit/5889600)

* Fixed: moving the mouse over the settings, the necklace or a button changed the cut on the part of the sphere behind them. Only the sphere itself sets the cut now.

## v1.7.2 · 2026-09-30 · [7b8a62f](https://github.com/mkuehne-git/necklace-splitting/commit/7b8a62f)

* Fixed: a long text as the necklace made the sphere disappear, and it stayed gone after a reload because the text was remembered. On some phones a few dozen characters were enough. The necklace now takes at most 192 jewels: as many whole characters of the text as fit, and a note below the text field says so.

## v1.7.1 · 2026-09-30 · [4fdf152](https://github.com/mkuehne-git/necklace-splitting/commit/4fdf152)

* No functional change. A new rule for the project: before a major version, the whole code is reviewed and its important issues are fixed.

## v1.7.0 · 2026-09-29 · [9d08e1e](https://github.com/mkuehne-git/necklace-splitting/commit/9d08e1e)

* Settings whose name does not say it all, such as Discrete, Epsilon or Undivided octants, have a small ⓘ behind them: it opens a short explanation below the setting.

## v1.6.0 · 2026-09-29 · [05aad93](https://github.com/mkuehne-git/necklace-splitting/commit/05aad93)

* The three buttons in the upper left corner are now scenes: pointing, cutting and the Borsuk-Ulam shape. While the shape is shown, the other two stay available and return to the sphere at once, instead of being disabled.
* Player buttons around the morph slider: ◀ plays the morph back to the sphere, ▶ into the shape, and while one plays it becomes a pause button (⏸); play again to go on. The slider stays to watch it all; before, turning the shape off hid the slider right away.
* Cutting the necklace yourself is now a real puzzle: the solution band and the solution markers are hidden while the handles set the cuts, so you find the fair splits yourself. Necklace › Solution band and › Solutions show them again for this game; your settings stay as they are, and pointing at the sphere shows them as before.

## v1.5.1 · 2026-09-29 · [67b9c43](https://github.com/mkuehne-git/necklace-splitting/commit/67b9c43)

* The marker on the sphere is now a white ring with a dark outline: the white glow was hard to see on the bright yellow. The color of the point shows inside the ring.
* When the handles move the marker towards the rim of the sphere, the view turns to it earlier, not only once it is out of sight.
* The handles reach a little beyond the necklace, so they are easier to see and to grab.
* The buttons for pointing, cutting and the Borsuk-Ulam shape have moved to the upper left corner, and the fairness meter is centered again on phones.

## v1.5.0 · 2026-09-29 · [d4ca4b1](https://github.com/mkuehne-git/necklace-splitting/commit/d4ca4b1)

* Cut the necklace yourself: a new button in the lower left corner lets two handles on the necklace set the cuts instead of the pointer on the sphere. Drag a handle along the necklace, tap a piece to give it to the other thief, and watch the marker on the sphere follow; the view turns to the marker when it is out of sight. The app remembers which way you chose.
* A fair split made with the handles is celebrated with a short message.
* On phones, the fairness meter moves aside so that it stays clear of the buttons in the corner.
* The handles work from the keyboard too: Tab reaches each handle and piece, the arrow keys move a handle by one jewel, and Enter gives a piece to the other thief.
* Before the pointer first moves over the sphere, the necklace is no longer cut at the point facing the camera.

## v1.4.0 · 2026-09-29 · [2ec1fff](https://github.com/mkuehne-git/necklace-splitting/commit/2ec1fff)

* A new button in the lower left corner switches to the Borsuk-Ulam shape: the sphere morphs into it within a second, and back again. The necklace and the fairness meter are hidden meanwhile, so the view is about the shape.
* A slider beside the button moves the view anywhere between sphere and shape, to watch the shape form step by step.
* The Borsuk-Ulam shape checkbox has left the settings; the button replaces it and remembers the choice as before.
* With Lighting on Shape, the light fades in as the sphere turns into the shape.

## v1.3.0 · 2026-09-29 · [5fe1aa4](https://github.com/mkuehne-git/necklace-splitting/commit/5fe1aa4)

* New setting View › Lighting: a light from the viewer's direction shades the Borsuk-Ulam shape, so its facets and the walls of the discrete shape stand out even without the mesh. Off leaves everything unlit as before, Always shades the sphere too. The colors keep their meaning: the light only dims them a little.

## v1.2.10 · 2026-09-29 · [44fe53f](https://github.com/mkuehne-git/necklace-splitting/commit/44fe53f)

* No functional change. The roadmap plans the next features: lighting, a view switcher with a morph from the sphere into the Borsuk-Ulam shape, and setting the cuts with handles on the necklace.

## v1.2.9 · 2026-09-29 · [41880f7](https://github.com/mkuehne-git/necklace-splitting/commit/41880f7)

* No functional change. The notes for developers describe how the Firefox tests got to run on GitHub.

## v1.2.8 · 2026-09-29 · [abe21b6](https://github.com/mkuehne-git/necklace-splitting/commit/abe21b6)

* No functional change. The end-to-end tests in Firefox run on a virtual display on GitHub.

## v1.2.7 · 2026-09-29 · [52145b4](https://github.com/mkuehne-git/necklace-splitting/commit/52145b4)

* No functional change. The end-to-end tests in Firefox get a graphics driver on GitHub.

## v1.2.6 · 2026-09-29 · [cc116c7](https://github.com/mkuehne-git/necklace-splitting/commit/cc116c7)

* No functional change. Fixes for the automatic checks on GitHub: the type check without the private imprint, and the end-to-end tests in Firefox.

## v1.2.5 · 2026-09-29 · [8bcf8de](https://github.com/mkuehne-git/necklace-splitting/commit/8bcf8de)

* No functional change. The end-to-end tests in Chromium and Firefox now also run on GitHub for every change.

## v1.2.4 · 2026-09-29 · [b35bddf](https://github.com/mkuehne-git/necklace-splitting/commit/b35bddf)

* No functional change. A new test checks that the colors of the sphere and the necklace below it split the jewels the same way.

## v1.2.3 · 2026-09-29 · [02f89b7](https://github.com/mkuehne-git/necklace-splitting/commit/02f89b7)

* No functional change. Automatic dependency updates no longer propose Node type definitions for a newer Node version than the one the app is built with.

## v1.2.2 · 2026-09-29 · [01fc082](https://github.com/mkuehne-git/necklace-splitting/commit/01fc082)

* No functional change. The code is now type-checked in strict mode, which catches missing values before they reach the app.

## v1.2.1 · 2026-09-29 · [9ec52fb](https://github.com/mkuehne-git/necklace-splitting/commit/9ec52fb)

* No functional change. The Borsuk-Ulam shape keeps following *Discrete*; the decision is recorded in the notes for developers.

## v1.2.0 · 2026-09-29 · [4c33f81](https://github.com/mkuehne-git/necklace-splitting/commit/4c33f81)

* **Borsuk-Ulam shape:** the shape is now a shape of its own, not a painted-over sphere. The mesh (*Advanced › Mesh*) follows it instead of staying a sphere around it.
* **Pointing at the Borsuk-Ulam shape:** the white marker and the fairness meter now follow the pointer on the shape. Before, they showed the cut of the hidden sphere behind it.
* **Discrete necklaces:** with *Discrete*, the shape jumps from value to value; the walls between its steps span these jumps. The explanation (info button) says so and no longer calls the shape a rough first view.
* **Mesh on the light theme:** *Advanced › Mesh* was white and so invisible on the light theme; it now takes the theme's color.
* **Faster:** the shape is computed once when the necklace changes, not again for every frame.

## v1.1.0 · 2026-09-28 · [f3da2a8](https://github.com/mkuehne-git/necklace-splitting/commit/f3da2a8)

* **Spread octants:** the octants now come apart cleanly. The dark walls, black patches and stair-shaped notches that appeared between them are gone, and the mesh (*Advanced › Mesh*) spreads with them.
* **Pointing at spread octants:** the white marker and the fairness meter now follow the pointer. Before, they showed the cut of a point on the closed sphere, off by the spread.
* **Faster:** *Spread octants* and *Undivided octants* move or hide the octants without rebuilding the sphere.
* **Advanced:** *Simple on-sphere check* is gone; it only worked around the old artifacts.

## v1.0.8 · 2026-09-28 · [bcf7c5f](https://github.com/mkuehne-git/necklace-splitting/commit/bcf7c5f)

* No functional change. Two old images that nothing used were removed from the repository, and the notes for developers were tidied up.

## v1.0.7 · 2026-09-28 · [ab904ec](https://github.com/mkuehne-git/necklace-splitting/commit/ab904ec)

* No functional change. The sphere keeps its current way of turning by drag; the decision is recorded in the roadmap.

## v1.0.6 · 2026-09-28 · [0ce5604](https://github.com/mkuehne-git/necklace-splitting/commit/0ce5604)

* **Settings:** *Mesh*, *Faces* and the *Colors* of the sphere moved from *View* to *Advanced*. *View* now holds only what helps to explore the necklace splitting; the drawing details are one section further down.

## v1.0.5 · 2026-09-28 · [d153e32](https://github.com/mkuehne-git/necklace-splitting/commit/d153e32)

* **Settings:** *View › Gauge* is now called *Fairness meter* (German: *Fairness-Anzeige*), after what it measures: how fair the current split is.
* **About this app:** explains the parts of the fairness meter: one line per thief, the dotted arc for a fair share, and the outer arc that turns from red to green as the split gets fairer.

## v1.0.4 · 2026-09-28 · [63f3c42](https://github.com/mkuehne-git/necklace-splitting/commit/63f3c42)

* **Settings:** *View › Octant offset* is now called *Spread octants* (German: *Oktanten spreizen*), which says what the slider does: it moves the octants away from the origin.

## v1.0.3 · 2026-09-28 · [36d7635](https://github.com/mkuehne-git/necklace-splitting/commit/36d7635)

* **Settings:** *View › Single thief's area* is now called *Undivided octants* (German: *Ungeteilte Oktanten*). The octants 000 and 111 give the whole necklace to one thief; the new name says what the checkbox shows or hides.

## v1.0.2 · 2026-09-28 · [a7bc821](https://github.com/mkuehne-git/necklace-splitting/commit/a7bc821)

* **About this app:** the argument for why a fair split always exists is laid out step by step: what has to be proved, and how the auxiliary function g(x) expresses it. The solution band is described more clearly.

## v1.0.1 · 2026-09-28 · [64d97f6](https://github.com/mkuehne-git/necklace-splitting/commit/64d97f6)

* **About this app:** the explanation is clearer and more precise. Equally long pieces are now named as a condition a fair split needs, not as enough for one; the band is called by its color; *Epsilon* and how the solutions are found are explained better; and the proof now says why a zero of g(x) is a fair split. The German text was revised throughout.

## v1.0.0 · 2026-09-27 · [a63045a](https://github.com/mkuehne-git/necklace-splitting/commit/a63045a)

Necklace Splitting 1.0 is a thoroughly renewed app. What changed since the version that was online until September 2026 (v0.4.13):

* **New settings:** the gear icon opens a panel on the right (full screen on phones) with the sections Necklace, View, Animation, Screen capture and Advanced. The controls are larger, work with touch, mouse and keyboard, and follow the light and dark theme. The **h** key opens and closes the panel.
* **Remembered:** your settings, the necklace, the theme and the view of the sphere are still there when you come back; **Restore defaults** starts over.
* **About this app:** the info button explains how the sphere maps the necklace, where the solutions are, the octants and why a fair split always exists.
* **Deutsch:** the app is available in English and German.
* **Changelog and What's new:** the version number in the corner shows what changed; after an update, the app tells you once what is new.
* **Updates on your terms:** the app asks before it reloads into a new version, and **Check for updates** looks for one.
* **Less battery, faster start:** the sphere is only drawn when something changes, and screen captures load when first used.
* **Necklace only:** the other showcases (Shader Lamp, Space Colors, Sinusoid) are gone.

Details in the entries v0.4.14 to v0.12.2 below.

## v0.12.2 · 2026-09-27 · [d525bd8](https://github.com/mkuehne-git/necklace-splitting/commit/d525bd8)

* Add a roadmap of what remains (`ROADMAP.md`) and update the development checklist. No functional change.

## v0.12.1 · 2026-09-27 · [4fc82e1](https://github.com/mkuehne-git/necklace-splitting/commit/4fc82e1)

* The README describes the app as it is now, with new screenshots taken by a script (`npm run screenshots`). No functional change.

## v0.12.0 · 2026-09-27 · [b7b390c](https://github.com/mkuehne-git/necklace-splitting/commit/b7b390c)

* The app now shows the necklace only: the showcases Shader Lamp, Space Colors and Sinusoid, and the Showcase buttons in the settings, are gone.

## v0.11.0 · 2026-09-27 · [27c7726](https://github.com/mkuehne-git/necklace-splitting/commit/27c7726)

* **Deutsch:** the app is available in German - buttons, settings, messages and the explanation behind the info button. It follows the browser's language; **Language** in the settings chooses one. The changelog stays in English.

## v0.10.0 · 2026-09-27 · [c5cb1fb](https://github.com/mkuehne-git/necklace-splitting/commit/c5cb1fb)

* **About this app:** the new info button at the top right explains what you see - how each point of the sphere cuts the necklace, what the colors mean, where the solutions are, the octants, and why a fair split always exists (the Borsuk-Ulam theorem) - and which settings show what.

## v0.9.0 · 2026-09-27 · [bce60b7](https://github.com/mkuehne-git/necklace-splitting/commit/bce60b7)

* **Changelog:** click the version number in the lower right corner, or at the bottom of the settings, to see what changed in each version.
* **What's new:** after an update, the app shows once what changed since you last used it.

## v0.8.1 · 2026-09-27 · [fdade8b](https://github.com/mkuehne-git/necklace-splitting/commit/fdade8b)

* Fix: checkboxes, number fields and scrollbars follow the app's theme. When the system used the dark theme and the app the light one, some of them were drawn dark.

## v0.8.0 · 2026-09-27 · [5cc438d](https://github.com/mkuehne-git/necklace-splitting/commit/5cc438d)

* **New settings panel:** the settings open in a panel on the right (full screen on phones) with clear sections - Necklace, View, Animation, Screen capture and Advanced - and larger controls that are easier to use on touch screens.
  * The four showcases are buttons at the top of the Necklace section.
  * The configuration and the necklace text are regular input fields; a configuration too large for the number of jewels is limited to the largest possible one.
  * Imprint, Check for updates and Restore defaults are always at the bottom. Restore defaults asks before it resets anything.
  * A screen capture of everything no longer includes the open settings panel.
* The **h** key opens and closes the settings right from the start (before, the first press did nothing), and not while you type in a field. Escape closes them.
* All controls can be used with the keyboard and are labelled for screen readers.

## v0.7.1 · 2026-09-27 · [36466c2](https://github.com/mkuehne-git/necklace-splitting/commit/36466c2)

* Fix: when updates are not available, Check for updates now names the reason - a page opened over plain HTTP, or a private window - instead of claiming the browser does not support them.

## v0.7.0 · 2026-09-27 · [a1e0dfe](https://github.com/mkuehne-git/necklace-splitting/commit/a1e0dfe)

* **Your settings are remembered:** the showcase, the necklace (also one entered as text), the view, color and rotation settings, the theme and the camera position are still there after a reload or when you open the app again.
* **Restore defaults** in the settings goes back to the original settings.

## v0.6.0 · 2026-09-27 · [354381a](https://github.com/mkuehne-git/necklace-splitting/commit/354381a)

* **The imprint closes with an X** at the top right, where the settings button is. It stays in view while you scroll, and is there right away, before the imprint has finished loading. Escape still closes it.
* The settings and theme buttons can be used with the keyboard (Tab, then Enter or Space), and screen readers announce what they do.

## v0.5.0 · 2026-09-27 · [79b3f18](https://github.com/mkuehne-git/necklace-splitting/commit/79b3f18)

* **Updates on your terms:** when a new version of the app is available, it asks whether to reload now or later, instead of switching to the new version on its own.
* **Check for updates** in the settings looks for a new version right away and tells you whether there is one.

## v0.4.35 · 2026-09-27 · [44e1eeb](https://github.com/mkuehne-git/necklace-splitting/commit/44e1eeb)

* Faster start: the code for screen captures and the imprint (about 200 kB) loads when first used instead of at startup.

## v0.4.34 · 2026-09-27 · [4a0c1d7](https://github.com/mkuehne-git/necklace-splitting/commit/4a0c1d7)

* Add tests that changing settings does not use more and more graphics memory. No functional change.

## v0.4.33 · 2026-09-27 · [8a8b2a0](https://github.com/mkuehne-git/necklace-splitting/commit/8a8b2a0)

* Less battery: the 3D view is drawn again only when something changes - you turn it, point at it, change a setting, the window or the theme - and every frame only while the rotation animation runs. Before, it was redrawn at the display's full frame rate all the time.
* The marker under the pointer follows it one frame sooner.

## v0.4.32 · 2026-09-27 · [2166b89](https://github.com/mkuehne-git/necklace-splitting/commit/2166b89)

* Split the styles into one file per area. No functional change.

## v0.4.31 · 2026-09-27 · [2f7361a](https://github.com/mkuehne-git/necklace-splitting/commit/2f7361a)

* Group the source files by area (`sphere/`, `necklace/`, `settings/`, `ui/`, `imprint/`); the README images move to `docs/images/`. No functional change.

## v0.4.30 · 2026-09-27 · [f730f41](https://github.com/mkuehne-git/necklace-splitting/commit/f730f41)

* Check types, tests and the build on GitHub for every change, and keep the dependencies up to date with Dependabot. No functional change.

## v0.4.29 · 2026-09-27 · [3dbd43d](https://github.com/mkuehne-git/necklace-splitting/commit/3dbd43d)

* Add end-to-end tests in Chromium and Firefox (Playwright). No functional change.

## v0.4.28 · 2026-09-27 · [72752c5](https://github.com/mkuehne-git/necklace-splitting/commit/72752c5)

* Add tests for the icon buttons and the imprint. No functional change.

## v0.4.27 · 2026-09-27 · [f1b9399](https://github.com/mkuehne-git/necklace-splitting/commit/f1b9399)

* Add unit tests for the necklace model (Vitest). No functional change.

## v0.4.26 · 2026-09-27 · [482cbb5](https://github.com/mkuehne-git/necklace-splitting/commit/482cbb5)

* Add a TypeScript type check (`npm run typecheck`) and fix the errors it found. No functional change.

## v0.4.25 · 2026-09-27 · [eb36339](https://github.com/mkuehne-git/necklace-splitting/commit/eb36339)

* Fix: Escape closes the imprint even while the settings panel is open.

## v0.4.24 · 2026-09-27 · [e4e6ec3](https://github.com/mkuehne-git/necklace-splitting/commit/e4e6ec3)

* Development: `npm run dev` serves over HTTPS and is reachable from other devices, replacing `npm run expose`; `npm run dev:http` serves over plain HTTP. No functional change.

## v0.4.23 · 2026-09-27 · [0f1b8cd](https://github.com/mkuehne-git/necklace-splitting/commit/0f1b8cd)

* Update the build tools (Vite 6 -> 8 and its plugins). The known security advisories in the build dependencies are resolved. No functional change.

## v0.4.22 · 2026-09-27 · [74c0e2f](https://github.com/mkuehne-git/necklace-splitting/commit/74c0e2f)

* Fix: the imprint is bundled with the app, so it can no longer go missing on GitHub Pages.

## v0.4.21 · 2026-09-27 · [459f917](https://github.com/mkuehne-git/necklace-splitting/commit/459f917)

* Update three.js 0.170 -> 0.186. No functional change.

## v0.4.20 · 2026-09-27 · [15a2e51](https://github.com/mkuehne-git/necklace-splitting/commit/15a2e51)

* Clean up the dependency list: runtime packages are listed once, the unused `@types/stats` is gone. No functional change.

## v0.4.19 · 2026-09-27 · [86c09c9](https://github.com/mkuehne-git/necklace-splitting/commit/86c09c9)

* Add a release checklist for preparing each version. No functional change.

## v0.4.18 · 2026-09-27 · [2094412](https://github.com/mkuehne-git/necklace-splitting/commit/2094412)

* The build and deployment instructions moved from `BUILD.md` into the README. No functional change.

## v0.4.17 · 2026-09-27 · [491bd3c](https://github.com/mkuehne-git/necklace-splitting/commit/491bd3c)

* Add the date and commit to every changelog entry. No functional change.

## v0.4.16 · 2026-09-27 · [22efd67](https://github.com/mkuehne-git/necklace-splitting/commit/22efd67)

* Document the versioning rule and commit message format. No functional change.

## v0.4.15 · 2026-09-27 · [c910557](https://github.com/mkuehne-git/necklace-splitting/commit/c910557)

* Pin the Node.js version for development (`.nvmrc`: Node 24; `engines`: 22.12 or newer). No functional change.

## v0.4.14 · 2026-09-27 · [1d07b86](https://github.com/mkuehne-git/necklace-splitting/commit/1d07b86)

* Add project instructions (`CLAUDE.md`) and the modernization plan (`MODERNIZATION.md`). No functional change.

## v0.4.13 · 2025-05-24 · [d61beec](https://github.com/mkuehne-git/necklace-splitting/commit/d61beec)

* Bump `vite` from 5.4.10 -> 6.3.5

## v0.4.12 · 2024-11-10 · [f64117c](https://github.com/mkuehne-git/necklace-splitting/commit/f64117c)

* Update three.js 0.161.0 -> 0.170.0

## v0.4.11 · 2024-10-19 · [336a49a](https://github.com/mkuehne-git/necklace-splitting/commit/336a49a)

* Fix: Rollup cve, update packages.

## v0.4.10 · 2024-02-01 · [dda8432](https://github.com/mkuehne-git/necklace-splitting/commit/dda8432)

* Fix: Upgrade `vite` and `three` packages.

## v0.4.9 · 2023-11-02 · [4b14407](https://github.com/mkuehne-git/necklace-splitting/commit/4b14407)

* Refactor, extract SVGToggleButton as own class.
* Use for Settings and ThemeSwitcher.
* Update packages, fixing `cryptho-js`` issue

## v0.4.8 · 2023-10-16 · [6442550](https://github.com/mkuehne-git/necklace-splitting/commit/6442550)

* Animate Setting/Theme-icons.

## v0.4.7 · 2023-10-15 · [7393562](https://github.com/mkuehne-git/necklace-splitting/commit/7393562)

* Use icon-buttons to switch themes.

## v0.4.6 · 2023-10-14 · [8fa2f44](https://github.com/mkuehne-git/necklace-splitting/commit/8fa2f44)

* Replace `> control` button in settings menu by close icon.
* Setting menu supporting light and dark theme.

## v0.4.5 · 2023-09-02 · [ad7671a](https://github.com/mkuehne-git/necklace-splitting/commit/ad7671a)

* Fix PWA implementation, replace `manifest.json` with `manifest.webmanifest`, generated by `vite-plugin-pwa`.
* Add `ServiceWorker`, which allows offline usage.
* Change PWA icon background to white.

## v0.4.4 · 2023-08-31 · [70497cd](https://github.com/mkuehne-git/necklace-splitting/commit/70497cd)

* Add `manifest.json` to create PWA
* Create `icons` for PWA
* Fix rendering issue (not showing full content) for imprint
* Add version info at lower right corner

## v0.4.3 · 2023-06-02 · [40b1298](https://github.com/mkuehne-git/necklace-splitting/commit/40b1298)

* Screen capture with ***alt-s***
* Redraw imprint on theme change

## v0.4.2 · 2023-05-30 · [5d525ce](https://github.com/mkuehne-git/necklace-splitting/commit/5d525ce)

* Update packages
* Improve README.md
* Controller UI with Settings icon

## v0.4.1 · 2023-05-18 · [426ad52](https://github.com/mkuehne-git/necklace-splitting/commit/426ad52)

* Fix sizing of Imprint, no horizontal scrollbar
* Fix mulitple clicks on Imprint, breaking Close button
* Update dependencies

## v0.4.0 · 2022-11-13 · [7117ba8](https://github.com/mkuehne-git/necklace-splitting/commit/7117ba8)

* Replace `dat.gui` by `lil-gui`
* Update versions of dependent libraries
* Remove dynamic import for imprint
* Update README.md

## v0.3.1 · 2022-02-05 · [9ca5be0](https://github.com/mkuehne-git/necklace-splitting/commit/9ca5be0)

* Fix calculation of necklace configuration

## v0.3.0 · 2022-02-05 · [1ab6e86](https://github.com/mkuehne-git/necklace-splitting/commit/1ab6e86)

### Features

* Visualize Borsuk-Ulam proof (WIP)

### Other

* Fix gauge color
* Rotation specified in Hz.
* npm update

## v0.2.3 · 2022-01-14 · [6ef02b7](https://github.com/mkuehne-git/necklace-splitting/commit/6ef02b7)

### Features

* Enter necklace configuration as text
* Show possible solution area
* Show solutions

### Other

* Remove showcases ***Segments only***, and ***Test Position Ranges***
* Remove options ***absolute/relative***, and ***Assert Ranges***
* Remove slider ***Scaling***
* Screen capture now uses CTRL + #.

## v0.2.2 · 2022-01-02 · [6703792](https://github.com/mkuehne-git/necklace-splitting/commit/6703792)

* Fix difference between discrete and continous split.
* Hide mouse pointer when hovering over sphere.

### Features

* Close imprint dialog with Esc.
* Imprint only, if imprint-gen.js available

## v0.2.0

### Features

* Allow to separate the *octants* of the sphere by adding an *octant* specific offset vector
 to each point calculated by the vertex shader.

### Technical Refactoring

* Migrate from Javascript to Typescript
* Create classes for Neckace and Sphere
* Introduce event to publish changes of settings.

## v0.1.0

### Main Features

* Interactive Sphere showing the Borsuk-Ulam color mapping
* Interactive Necklace showing the jewel split among the thiefs, based on point on sphere.
* Gauge rating the *fairness* of the split.
* Selective screeen capture, and file download
