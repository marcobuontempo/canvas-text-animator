# Canvas Text Animator JavaScript (ctajs)
**A mini library for drawing basic text animations to canvas**
</br>
</br>

## ***Basic Features:***
- *Create multiple scenes*
- *Each scene can contain multiple text animations, a user defined background colour, zoom factor and duration*
- *Each word can have a custom defined start position, end position, font size, fill colour and duration*
</br>
</br>

## ***Usage:***
1. Create canvas element in your html document
    ```html
    <canvas id="ctajs-canvas"></canvas>
    ```
1. Connect JavaScript to your HTML using one of the following methods
    - ***jsDelivr***
    ```html
    <script src="https://cdn.jsdelivr.net/gh/marcobuontempo/canvas-text-animator@latest/cta-library.js"></script>
    ```
    - ***jsDelivr - Minified Version***
    ```html
    <script src="https://cdn.jsdelivr.net/gh/marcobuontempo/canvas-text-animator@latest/cta-library.min.js"></script>
    ```
    - ***Relative File (requires download of .js file from GitHub)***
    ```html
    <script src="cta-library.js"></script>
    ```
1. Initialise animation object
    ```js
    const ctaOptions = {
    height: 200,
    width: 1000,
    domID: "ctajs-canvas"
    };

    const ctaJS = new CanvasTextAnimation(ctaOptions);
    ```
1. Create word objects to use in each scene
    ```js
    const wordOptions = {
    text: "ctaJS",
    font: "Brush Script MT",
    fillColour: "#3F826D",
    lineColour: "#545E75",
    lineWidth: 2,
    fontSize: 72,
    xInitial: ctaJS.WIDTH / 2,
    yInitial: 0,
    xEnd: ctaJS.WIDTH / 2,
    yEnd: ctaJS.HEIGHT / 2,
    duration: 5000,
    sceneNumber: 1
    };

    ctaJS.createWord(wordOptions);
    ```
1. Create scene
    ```js
    const sceneOptions = {
    duration: 5000,
    zoom: 1.1,
    backgroundColour: "#F2D0A4"
    };

    ctaJS.setSceneOptions(1, sceneOptions)
    ```
1. Repeat steps 4 & 5 for your required words and scenes
1. Animate all scenes!
    ```js
    ctaJS.animateAll()
    ```
</br>
</br>

## ***Examples:***
*Note: the preview images below have reduced quality compared to the actual web rendering*
- [**Demo 1** *(as per the usage example above)*](https://codepen.io/marcobuontempo/pen/vYjxpLd)
<img src="demo-imgs/demo1.gif" alt="ctaJS Demo 1" width="100%"/>

- [**Demo 2**](https://codepen.io/marcobuontempo/pen/RwypQrm)
<img src="demo-imgs/demo2.gif" alt="ctaJS Demo 2" width="100%"/>

- [**Demo 3**](https://codepen.io/marcobuontempo/pen/JjvWLMd)
<img src="demo-imgs/demo3.gif" alt="ctaJS Demo 3" width="100%"/>
</br>
</br>

## ***Licence:***
[MIT](LICENSE)
