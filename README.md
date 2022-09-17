# Canvas Text Animation (CTA-JS)
A mini library for drawing basic text animations to canvas

## Usage
1. Create canvas element in your html
    ```html
    <canvas id="ctajs-canvas"></canvas>
    ```
1. Connect JavaScript to your HTML with CDN
    ```html
    <script defer src="https://cdn.jsdelivr.net/gh/marcobuontempo/canvas-text-animator@latest/cta-library.js"></script>
    ```
1. Initialise animation object
    ```js
    const H = 300
    const W = 500

    const ctaOptions = {
    height: H,
    width: W,
    backgroundColour: "#22CC22",
    domID: "ctajs-canvas"
    }

    const ctaJS = new CanvasTextAnimation(ctaOptions)
    ```
1. Create "word objects" to use in each scene
    ```js
    const wordOptions = {
        text:"DEMO TEXT", 
        font:"Comic Sans MS", 
        fillColour:"#000FFF",
        lineColour:"#FF00BB",
        lineWidth: 2,
        fontSize:32,
        xInitial:ctaJS.WIDTH/2, 
        yInitial:0, 
        xEnd:ctaJS.WIDTH/2,
        yEnd:ctaJS.HEIGHT/2, 
        duration:5000, 
        sceneNumber:1
        }

    ctaJS.createWord(wordOptions)
    ```
1. Create scene
    ```js
    const sceneOptions = {
        duration: 5000,
        zoom: 1.1
    }

    ctaJS.setSceneOptions(1, sceneOptions)
    ```
1. Animate scenes
    ```js
    ctaJS.animateAll()
    ```

