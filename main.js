class TextAnimation {
    constructor(width=1920, height=1080, FPS=25, domID="canvas") {
        this.HEIGHT = height
        this.WIDTH = width

        this.scenes = [null]
        this.sceneDurations = [null]

        document.getElementById(domID)
        canvas.width = this.WIDTH
        canvas.height = this.HEIGHT
        this.ctx = canvas.getContext("2d")
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
    }

    createWord({
        text="NULL", 
        font="Calibri", 
        fontSize="100",
        xInitial=0, 
        xEnd=0, 
        yInitial=0, 
        yEnd=0, 
        fillColour="#000000",
        strokeColour="#000000",
        strokeWidth=5,
        duration=1000, 
        sceneNumber=1
        } = {}) {

        const word = {
            text: text,
            font: font,
            fontSize: fontSize,
            fillColour: fillColour,
            strokeColour: strokeColour,
            strokeWidth: strokeWidth,
            startTime: null,
            x: xInitial,
            y: yInitial,
            xInitial: xInitial,
            yInitial: yInitial,
            xEnd: xEnd,
            yEnd: yEnd,
            xDistance: xEnd - xInitial,
            yDistance: yEnd - yInitial,
            duration: duration,
            animate: true
        }
        if(this.scenes[sceneNumber]==undefined) this.scenes[sceneNumber]=[]
        this.scenes[sceneNumber].push(word)

        return word
    }

    drawWord(word) {
        this.ctx.font = `${word.fontSize}px ${word.font}`;
        this.ctx.lineWidth = word.lineWidth;
        this.ctx.strokeStyle = word.strokeColour;
        this.ctx.fillStyle = word.fillColour;
        this.ctx.fillText(word.text, word.x, word.y)
        this.ctx.strokeText(word.text, word.x, word.y)
    }

    moveWord(word, timestamp) {
        if(word.startTime==null) word.startTime = timestamp
        const wordRuntime = timestamp - word.startTime

        const moveX = (wordRuntime/word.duration * word.xDistance)
        const moveY = (wordRuntime/word.duration * word.yDistance)

        // Ensures it ends at destination pixel
        if(moveX>0) {
            word.x = Math.min(moveX + word.xInitial, word.xEnd)
        } else if(moveX<0) {
            word.x = Math.max(moveX + word.xInitial, word.xEnd)
        } else {
            word.x = moveX + word.xInitial
        }
        if(moveY>0) {
            word.y = Math.min(moveY + word.yInitial, word.yEnd)
        } else if(moveY<0) {
            word.y = Math.max(moveY + word.yInitial, word.yEnd)
        } else {
            word.y = moveY + word.yInitial
        }

        if(word.x==word.xEnd || word.y==word.yEnd) {
            word.animate=false
        }
    }

    addSceneDuration(sceneNumber, duration) {
        this.sceneDurations[sceneNumber] = duration
    }

    animateScene(timestamp=new Date().getTime(), sceneNumber, starttime) {
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
        this.ctx.fillStyle = "#000000"
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT)
        
        this.scenes[sceneNumber].forEach(word => {
            this.drawWord(word)

            if(!word.animate) return
            this.moveWord(word,timestamp)
        })

        const timeElapsed = timestamp - starttime
        const duration = this.sceneDurations[sceneNumber]
        if(timeElapsed>duration) return sceneNumber

        requestAnimationFrame((timestamp) => this.animateScene(timestamp,sceneNumber,starttime))
    }

    startScene(sceneNumber) {
        requestAnimationFrame((timestamp=new Date().getTime()) => {
            this.animateScene(timestamp,sceneNumber,timestamp)
        })
    }

}








// === TODO ===
// Add animateAllScenes method -> forEach scene, startScene
// Add hideAfterAnimation variable to word object. Do not draw if !animate &