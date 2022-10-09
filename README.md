# Canvas Text Animator JavaScript (ctajs)

**A mini library for drawing basic text animations to canvas**
</br>

## **_Basic Features:_**

- _Create multiple scenes_
- _Each scene can contain multiple text animations, a user defined background colour, zoom factor and duration_
- _Each word can have a custom defined start position, end position, font size, fill colour and duration_
  </br>

## **_Usage:_**

1. Create canvas element in your html document
   ```html
   <canvas id="ctajs-canvas"></canvas>
   ```
1. Connect JavaScript to your HTML using one of the following methods
   - **_jsDelivr_**
   ```html
   <script src="https://cdn.jsdelivr.net/gh/marcobuontempo/canvas-text-animator@latest/cta-library.js"></script>
   ```
   - **_jsDelivr - Minified Version_**
   ```html
   <script src="https://cdn.jsdelivr.net/gh/marcobuontempo/canvas-text-animator@latest/cta-library.min.js"></script>
   ```
   - **_Relative File (requires download of .js file from GitHub)_**
   ```html
   <script src="cta-library.js"></script>
   ```
1. Initialise animation object

   ```js
   const ctaOptions = {
     height: 200,
     width: 1000,
     domID: "ctajs-canvas",
   };

   const ctaJS = new CanvasTextAnimation(ctaOptions);
   ```

1. Create word objects to use in each scene _(refer to .js file for information about each parameter)_

   ```js
   const wordOptions = {
     text: "ctaJS",
     font: "Brush Script MT",
     fontSize: 72,
     fillColour: "#3F826D",
     lineColour: "#545E75",
     lineWidth: 2,
     xInitial: ctaJS.WIDTH / 2,
     yInitial: 0,
     xEnd: ctaJS.WIDTH / 2,
     yEnd: ctaJS.HEIGHT / 2,
     duration: 5000,
     drawOnCompletion: true,
     sceneNumber: 1,
   };

   ctaJS.createWord(wordOptions);
   ```

1. Create scene _(refer to .js file for information about each parameter)_

   ```js
   const sceneOptions = {
     duration: 5000,
     zoom: 1.1,
     backgroundColour: "#F2D0A4",
   };

   ctaJS.setSceneOptions(1, sceneOptions);
   ```

1. Repeat steps 4 & 5 for your required words and scenes
1. Animate all scenes!
   ```js
   ctaJS.animateAll()
   ```
   </br>

### **Additional Usage:**

- It is possible to add additional custom draws to the canvas (e.g. shapes, lines, etc.).
- Simply modify the animateScene() method by adding your custom canvas draws after the call to drawScene().
- Note that drawScene() will clear the canvas and redraw the background at each call, so ensure to add your custom canvas draws **_after_** this. There is a comment in the JavaScript file for the location to refer to.

## **_Examples:_**

_Note: the preview images below have significantly reduced quality compared to the actual web rendering_</br>
**Click a demo below to check out the codepen and actual rendering!**

- ### [**Demo 1** _(as per the usage example above)_](https://codepen.io/marcobuontempo/pen/vYjxpLd)

<a href="https://codepen.io/marcobuontempo/pen/vYjxpLd">
    <img src="demo-imgs/demo1.gif" alt="ctaJS Demo 1" width="100%"/>
</a>

- ### [**Demo 2**](https://codepen.io/marcobuontempo/pen/RwypQrm)

<a href="https://codepen.io/marcobuontempo/pen/RwypQrm">
    <img src="demo-imgs/demo2.gif" alt="ctaJS Demo 2" width="100%"/>
</a>

- ### [**Demo 3**](https://codepen.io/marcobuontempo/pen/JjvWLMd)
<a href="https://codepen.io/marcobuontempo/pen/JjvWLMd">
    <img src="demo-imgs/demo3.gif" alt="ctaJS Demo 3" width="100%"/>
</a>
</br>

## **_Support:_**

This was just a small hobby project to allow easier writing to the html canvas. Not sure if anything further will be added at this stage. However, feel free to contact me for any assistance, to raise any issues, or for requests!
</br>

## **_Licence:_**

[MIT](LICENSE)
