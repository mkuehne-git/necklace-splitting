![Necklace-splitting](./src/images/necklace.png)
# necklace-splitting
This HTML-5 application features an explorable visualization of the [Necklace splitting problem](https://en.wikipedia.org/wiki/Necklace_splitting_problem) and its connection to the [Borsuk-Ulam theorem](https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem). Online available, [here](https://mkuehne-git.github.io/necklace-splitting/).

After watching the [3blue1brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw) video [The Borsuk-Ulam theorem and stolen necklaces](https://youtu.be/yuVqxCSsE7c) a couple of times, I wondered, how the mapping of the necklace splitting onto a sphere would actually look like.

Each point (x,y,z) on the sphere denotes a necklace cut - note the white indicator on the image. The cut splits the necklace in maximal three segments of length (x²,y²,z²). The sign of each ordinate assigns the segment to either thief A or B.

The coloring indicates how much one thief owns per jewel type. The colors red and green are used to distinguish between the jewel types. Bright yellow (mix between red and green) for instance indicates that one thief owns the majority of both jewel types.

## Solving the Necklace-Splitting
If both jewel types are equally split between the two thiefs, the length of the necklace segments assigned to each thief must be identifical. The orange line around the sphere shows this *Solution Band*. All solutions must exist on this line. This means, that the second cut position is defined by the first cut position. Furthemore, the *Solutions* (higlighted in blue) can be calculated in linear time.

![Solving necklace-split](./src/images/necklace-with-solution.png)

## Octants
The sphere can be divided into eight octants. The octants can be binary enumerated using the polarity of (x,y,z). The octants are kind of symmetrical to the origin. Mirrowing an octant at the origin means swapping the thiefs. The octants with number 000 and 111 are kind of boring, since they assign all jewels to just one thief. There is an option to remove these octants from the view.

In contrast, the octants with number 010 and 101 show most diversity. There is the slider ***Octant Offset***, which extrudes the octants from the sphere.

![necklace-octants-removed](./src/images/necklace-octants.png)

## Observing antipodal Points on Sphere
In addition to the necklace-splitting sphere a few other show cases are provided. All of them color the sphere continously with three colors. To better recognize the antipodal points on the sphere it is sometimes useful to remove one color.

# Getting started

## Online
View live on GitHub-Pages [https://mkuehne-git.github.io/necklace-splitting/](https://mkuehne-git.github.io/necklace-splitting/)

## Local Installation
* Download this repository to your local machine and run

    ```bash
    $ npm install
    $ npm ci
    $ npm run imprint
    $ npm run dev
    ```

    ```
    > stolen-necklace@0.2.2 expose
    > vite --host

    
      vite v2.7.10 dev server running at:

      > Local: http://localhost:3000/
      > Network: use `--host` to expose

      ready in 152ms.
    ```

* Open [localhost:3000](http://localhost:3000) to launch the application. The port may differ. If you want to expose it to other clients in your network, use

    ```bash
    $ npm run expose
    ```  
    instead.
   
## Build and Deploy

If you want to create your own build or deployment - please check out the [instructions](BUILD.md).

# Keyboard

|Key|Description|
|---|---|
|```h```, ```H```|Toggle visibility of control panel|
|```CTRL + #```|Take screen capture|
|```Esc```|Close imprint dialog|

# References

## Explain Necklace-Splitting

* [Sneaky Topology | The Borsuk-Ulam theorem and stolen necklaces](https://youtu.be/yuVqxCSsE7c) - Video
* [Necklace splitting problem](https://en.wikipedia.org/wiki/Necklace_splitting_problem) - Wikipedia
* [Borsuk–Ulam theorem](https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem) - Wikipedia

## Implementation

* *Lewy Blue,* [Discover three.js](https://discoverthreejs.com/)
    * [WebGLProgram](https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram) Built-in uniforms and attributes
* *Patricio Gonzalez Vivo, Jen Lowe,* [The Book of Shaders](https://thebookofshaders.com/)

# Acknowledgments

* [Vite](https://github.com/vitejs/vite) - Next Generation Frontend Tooling
* [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl) - Recursively imports and inlines shader chunks within GLSL files relative to their directory.
* [rollup-plugin-dynamic-import-variables](https://www.npmjs.com/package/rollup-plugin-dynamic-import-variables)
* WebGL [three.js](https://threejs.org/)
* Settings with [dat.gui](https://github.com/dataarts/dat.gui)

# License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mkuehne-git/necklace-splitting/blob/main/LICENSE) file for details
