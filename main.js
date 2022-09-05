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


}
