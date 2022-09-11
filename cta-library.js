// =======================================
//   CANVAS TEXT ANIMATION (CTA-JS)
// =======================================


/**
* Canvas Text Animation Class.
* 
* A class to create basic canvas text animations.
* 
* @param {Number} [Object.width=1920] the width of the canvas in px.
* @param {Number} [Object.height=1080] the height of the canvas in px.
* @param {String} [Object.backgroundColour="FFFFFF"] the canvas hexadecimal background colour.
* @param {String} [Object.domID="canvas"] the DOM ID of the canvas element to operate on.
*/
class CanvasTextAnimation {
    constructor({width=1920, height=1080, backgroundColour="#FFFFFF", domID="canvas"} = {}) {
        this.HEIGHT = height                // height of the canvas
        this.WIDTH = width                  // width of the canvas

        this.scenes = [null]           // Array to hold info for each scene

        // Setup canvas
        this.canvas = document.getElementById(domID)      // Element ID to access canvas in DOM
        this.canvas.width = this.WIDTH
        this.canvas.height = this.HEIGHT
        this.ctx = canvas.getContext("2d")
        
        // Default sets of the canvas
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.backgroundColour = backgroundColour;
    }


    /**
    * Print Scene Information.
    * 
    * Logs the info of all scenes in the timeline to the console.
    * 
    */
    printScenesInfo() {
        for(let i=1; i<this.scenes.length; i++) {
            let info = `SCENE NUMBER: ${i}\nDURATION: ${this.scenes[i]["duration"]}\n\nWORDS:\n`
            this.scenes[i]["words"].forEach((word, idx) => {
                info += `   (${idx+1}) Text: ${word.text}\n       Duration: ${word.duration}ms\n`
            })
            console.log(info)
        }
    }

    /**
    * Initialise New Scene.
    * 
    * Creates a new scene with default parameters.
    * 
    * @param {Number} sceneNumber the scene number to create
    */
    initialiseEmptyScene(sceneNumber) {
        this.scenes[sceneNumber] = {
            words: [],
            duration: 1000,
            zoom: 1
        }
    }


    /**
    * Create Word.
    * 
    * Creates a word object and stores in the scenes timelines.
    *
    * @param {String} [Object.text="NULL"] string of text to display.
    * @param {String} [Object.font="Calibri"] font type for the text.
    * @param {Number} [Object.fontSize=100] px font size for the text.
    * @param {Number} [Object.xInitial=0] the starting x-axis px coordinates for text.
    * @param {Number} [Object.xEnd=0] the ending x-axis px coordinates for text.
    * @param {Number} [Object.yInitial=0] the starting y-axis px coordinates for text.
    * @param {Number} [Object.yEnd=0] the ending x-axis px coordinates for text.
    * @param {String} [Object.fillColour="#000000"] a hexadecimal colour code to fill the text.
    * @param {String} [Object.lineColour="#000000"] a hexadecimal colour code to outline the text.
    * @param {Number} [Object.lineWidth=1] the width of the text outline.
    * @param {Number} [Object.duration=1000] the duration ms for the text to be be displayed and animate for.
    * @param {Number} [Object.sceneNumber=1] the scene number for the text to animate in.
    * @param {Boolean} [Object.drawOnCompletion=true] whether the text will continue to display after completing animation.
    * 
    * @return {Object} Word object
    */
    createWord({
        text="NULL", 
        font="Calibri", 
        fontSize=100,
        xInitial=0,
        xEnd=0, 
        yInitial=0, 
        yEnd=0, 
        fillColour="#000000",
        lineColour="#000000",
        lineWidth=1,
        duration=1000, 
        sceneNumber=1,
        drawOnCompletion=true
        } = {}) {

        const word = {
            text: text,
            font: font,
            fontSize: fontSize,
            fillColour: fillColour,
            lineColour: lineColour,
            lineWidth: lineWidth,
            startTime: null,
            x: xInitial,
            y: yInitial,
            xStep: (xEnd - xInitial) / duration,
            yStep: (yEnd - yInitial) / duration,
            xEnd: xEnd,
            yEnd: yEnd,
            duration: duration,
            animate: true,
            drawOnCompletion: drawOnCompletion
        }

        // Add word object to scenes timeline
        if(this.scenes[sceneNumber]==undefined) this.initialiseEmptyScene(sceneNumber)
        this.scenes[sceneNumber]["words"].push(word)

        return word
    }


    /**
    * Draw Word.
    *
    * Draws the word to the canvas at its current x & y coordinates.
    * 
    * @param {Word} word word object to draw to canvas.
    */
    drawWord(word) {
        this.ctx.font = `${word.fontSize}px ${word.font}`;
        this.ctx.lineWidth = word.lineWidth;
        this.ctx.strokeStyle = word.lineColour;
        this.ctx.fillStyle = word.fillColour;
        this.ctx.fillText(word.text, word.x, word.y)
        this.ctx.strokeText(word.text, word.x, word.y)
    }


    /**
    * Move Word.
    *
    * Updates the x & y coordinates of a word, based on the duration of the last frame drawn on canvas.
    * 
    * @param {Word} word word object to move.
    * @param {Number} timestamp current timestamp of function call. When called with requestAnimationFrame(), this timestamp is precise.
    */
    moveWord(word, timestamp) {
        if(word.startTime==null) word.startTime = timestamp // if first time calling moveWord, set the current timestamp to the start time
        const wordRuntime = timestamp - word.startTime  // update runtime by calculating difference between current timestamp and start time

        // Update x & y coordinates
        word.x = Math.floor(wordRuntime * word.xStep)
        word.y = Math.floor(wordRuntime * word.yStep)

        // Stop animating when the animation duration of the word has been reached
        if(wordRuntime>=word.duration) { 
            word.animate=false
            // Fallback to ensure the word ends at correct coordinates
            word.x = word.xEnd
            word.y = word.yEnd
        }
    }


    /**
    * Set Scene Options.
    *
    * Set the parameters for a particular scene.
    * 
    * @param {Number} sceneNumber the scene number to set duration on.
    * @param {Object} options.duration the time ms that the scene should exist for.
    * @param {Object} options.zoom the zoom speed of the scene (where 1 = no zoom, + zooms in, - zooms out).
    */
    setSceneOptions(sceneNumber, {duration, zoom} = {}) {
        if(this.scenes[sceneNumber]==undefined) this.initialiseEmptyScene(sceneNumber)

        // Set duration if defined in options
        if(duration!=undefined) this.scenes[sceneNumber]["duration"] = duration
        
        // Set zoom if defined in options
        if(zoom!=undefined) this.scenes[sceneNumber]["zoom"] = zoom
    }


    /**
    * Animate Scene.
    *
    * Animates a specified scene by recursively drawing to canvas with updates to the scene's text at each call.
    * 
    * @param {Number} timestamp current timestamp of function call. Should be passed the precise timestamp from requestAnimationFrame(), but otherwise will default to the current in-built Date time.
    * @param {Number} sceneNumber the scene number to animate.
    * @param {Number} starttime the start time of the animation. Usually the precise timestamp from requestAnimationFrame().
    * 
    * @return {Number} the scene number of the scene that finished animating. 
    */
    animateScene(timestamp=new Date().getTime(), sceneNumber, starttime) {
        // Clear the canvas and redraw background
        this.ctx.fillStyle = this.backgroundColour;
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT)
        
        // Update and draw each word in scene
        this.scenes[sceneNumber]["words"].forEach(word => {
            if(word.animate) {  // draw and move word if animating
                this.drawWord(word)
                this.moveWord(word,timestamp)   
            } else {
                if(word.drawOnCompletion) this.drawWord(word)   // if finished animating, only draw if drawOnCompletion is true
            }
        })

        const timeElapsed = timestamp - starttime   // Get the elapsed time of the scene
        const duration = this.scenes[sceneNumber]["duration"]   // Get the pre-set duration of the scene
        if(timeElapsed>=duration) return sceneNumber // End function if elapsed time reaches the pre-set duration

        requestAnimationFrame((timestamp) => this.animateScene(timestamp,sceneNumber,starttime))    // Draw the next animation frame. Pass the timestamp and starttime so that the next animation call can determine the elapsed time (and how much to move words)
    }

    /**
    * Start Scene.
    *
    * Starts the entire animation of a scene.
    * 
    * @param {Number} sceneNumber the scene number to animate.
    */
    startScene(sceneNumber) {
        requestAnimationFrame((timestamp=new Date().getTime()) => {
            this.animateScene(timestamp,sceneNumber,timestamp)
        })
    }

    /**
    * Animate All Scenes.
    *
    * Animates each scene in timeline, one after the other.
    * 
    * @param {Number} sceneNumber the scene number to animate.
    */
    animateAll() {
        let delay = 0
        for(let i=1; i<this.scenes.length; i++) {
            setTimeout(() => {
                this.startScene(i)
            }, delay)
            delay += this.scenes[i]["duration"]
        }
    }
    
}