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

}
