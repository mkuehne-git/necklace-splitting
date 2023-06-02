## Changelog
### v0.4.3
* Screen capture with ***alt-s***
* Redraw imprint on theme change
### v0.4.2
* Update packages
* Improve README.md
* Controller UI with Settings icon

### v0.4.1
* Fix sizing of Imprint, no horizontal scrollbar
* Fix mulitple clicks on Imprint, breaking Close button
* Update dependencies

### v0.4.0
* Replace `dat.gui` by `lil-gui`
* Update versions of dependent libraries
* Remove dynamic import for imprint
* Update README.md

### v0.3.1
* Fix calculation of necklace configuration

### v0.3.0
#### Features
* Visualize Borsuk-Ulam proof (WIP)

#### Other
* Fix gauge color
* Rotation specified in Hz.
* npm update

### v0.2.3
#### Features
* Enter necklace configuration as text
* Show possible solution area
* Show solutions

#### Other
* Remove showcases ***Segments only***, and ***Test Position Ranges***
* Remove options ***absolute/relative***, and ***Assert Ranges***
* Remove slider ***Scaling***
* Screen capture now uses CTRL + #.

### v0.2.2
* Fix difference between discrete and continous split.
* Hide mouse pointer when hovering over sphere.
 
#### Features
* Close imprint dialog with Esc.
* Imprint only, if imprint-gen.js available

### v0.2.0
#### Features
* Allow to separate the *octants* of the sphere by adding an *octant* specific offset vector
 to each point calculated by the vertex shader.

#### Technical Refactoring
* Migrate from Javascript to Typescript
* Create classes for Neckace and Sphere
* Introduce event to publish changes of settings.

### v0.1.0

#### Main Features
* Interactive Sphere showing the Borsuk-Ulam color mapping
* Interactive Necklace showing the jewel split among the thiefs, based on point on sphere.
* Gauge rating the *fairness* of the split.
* Selective screeen capture, and file download
