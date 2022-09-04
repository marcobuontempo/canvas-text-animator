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

    createWord({text="NULL", font="Calibri", xBegin=0, xEnd=0, yBegin=0, yEnd=0, fontsizeStart=1, fontsizeEnd=1, colour="#000000", duration=1000, sceneNumber=1} = {}) {
        const word = {
            text: text,
            font: font,
            x: xBegin,
            y: yBegin,
            xEnd: xEnd,
            yEnd: yEnd,
            xStep: -(xBegin-xEnd)/duration,
            yStep: -(yBegin-yEnd)/duration,
            fontsizeStart: fontsizeStart,
            fontsizeEnd: fontsizeEnd,
            colour: colour,
            duration: duration
        }
        if(this.scenes[sceneNumber]==undefined) this.scenes[sceneNumber]=[]
        this.scenes[sceneNumber].push(word)
    }

}
