class TextAnimation {
    constructor(width=1920, height=1080, FPS=25, domID="canvas") {
        this.HEIGHT = height
        this.WIDTH = width

        this.scenes = [null]

        this.canvas = document.createElement("canvas")
        canvas.width = this.WIDTH
        canvas.height = this.HEIGHT
    
        document.getElementById(domID)

        this.ctx = canvas.getContext("2d")

        this.ctx.fillStyle = "#000000"
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT)
        console.log("DONE")
    }

    createWord({text="NULL", font="Calibri", xInitial=0, xEnd=0, yInitial=0, yEnd=0, colour="#000000", duration=1000, sceneNumber=1} = {}) {
        const word = {
            text: text,
            font: font,
            startTime: null,
            x: xInitial,
            y: yInitial,
            xInitial: xInitial,
            yInitial: yInitial,
            xEnd: xEnd,
            yEnd: yEnd,
            xDistance: xEnd - xInitial,
            yDistance: yEnd - yInitial,
            colour: colour,
            duration: duration,
            animate: true
        }
        if(this.scenes[sceneNumber]==undefined) this.scenes[sceneNumber]=[]
        this.scenes[sceneNumber].push(word)

        return word
    }

    drawWord(word) {
        this.ctx.font = `1500% ${word.font}`;
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.fillStyle = "#00FF00";
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

    animateScene(timestamp=new Date().getTime(), sceneNumber, duration, starttime) {
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
        this.ctx.fillStyle = "#000000"
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT)
        
        if((timestamp - starttime)>duration) return

        this.scenes[sceneNumber].forEach(word => {
            this.drawWord(word)

            if(!word.animate) return
            this.moveWord(word,timestamp)
        })

        requestAnimationFrame((t) => this.animateScene(t,sceneNumber,duration,starttime))
    }


}
