export { WheelOfFortune }

/**
 * Helper class with alter functions
 */
import { Helper } from './Helper.js'

class WheelOfFortune extends Helper{

    /**
     * array numbers like as rendered on the roulette
     */
    static showRouletteNumbers = [3,5,1,1,1,3,1,1,3,3,1,5]

    /**
     * default variable for animation rotate roulette
     */
    static sectorDegree = 0 // default sector, on strart 0 then 30

    static totalRandom = 0
    static currentSectorPosition = 0
    
    /**
     * external and internal circle roulette images
     */
    static extCircleImg
    static intCircleImg 

    constructor(loader, rouletCenterX, rouletCenterY, rouletteNumbers = [3,1,1,3,1,1,1,5,3,5,1,3]){
        super()

        this.rouletCenterX = rouletCenterX
        this.rouletCenterY = rouletCenterY

        this.loader = loader
    
        /**
         * set numbers for roulette
         */
        this.rouletteNumbers = rouletteNumbers
    }

    /**
     * rotate roulette function
     */
    rotate() {
        const random = Math.floor(Math.random() * (12 - 1)) + 1;
        
        if (WheelOfFortune.sectorDegree === 0) {
            WheelOfFortune.extCircleImg.angle += 15 // middle our ext roulette img
            WheelOfFortune.intCircleImg.angle += 30 // ot baldy
            WheelOfFortune.sectorDegree = 30 // one sector in degre
        } else {

            /**
             * rotate our roulette
             */
            WheelOfFortune.extCircleImg.angle += WheelOfFortune.sectorDegree * random
            WheelOfFortune.intCircleImg.angle += WheelOfFortune.sectorDegree * random

            WheelOfFortune.totalRandom += random
        }
    }

    /**
     * set roulette number after user click and set bet
     */
    static getRouletteNumber() {

        for (var i = 0; i < WheelOfFortune.totalRandom; i++) {
            if (WheelOfFortune.currentSectorPosition < 11) {
                WheelOfFortune.currentSectorPosition++
            } else {
                WheelOfFortune.currentSectorPosition = 0
            }
        }

        WheelOfFortune.totalRandom = 0
        return WheelOfFortune.showRouletteNumbers[WheelOfFortune.currentSectorPosition]
    }

    /**
     * render wheel of fortune
     * @param {*} loader 
     * @param {*} appStage 
     * @param {*} rendererWidth 
     * @param {*} rendererHeight 
     */
    initWheelOfFortune(loader, appStage, rendererWidth, rendererHeight){

        /**
         * render bottom wheel image
         */
        const bottomImg = new PIXI.Sprite(loader.resources.bottomImg.texture)
        bottomImg.x = (rendererWidth - 207) / 2 //207 own height,
        bottomImg.y = (rendererHeight - 180) / 2 + 135 //180 own width,
        appStage.addChild(bottomImg)

        /**
         * render external circle with numbers
         */
        WheelOfFortune.extCircleImg = new PIXI.Sprite(loader.resources.extCircle.texture)
        WheelOfFortune.extCircleImg.anchor.x = 0.5
        WheelOfFortune.extCircleImg.anchor.y = 0.5

        const sectoredWheelContainer = new PIXI.Container()
        sectoredWheelContainer.width = 300
        sectoredWheelContainer.height = 300
        sectoredWheelContainer.pivot.set(0.5, 0.5)
        sectoredWheelContainer.angle = 15

        /**
         * render numbers
         */
        for (var i = 0; i < this.rouletteNumbers.length; i++) {

            var posX = 105 * Math.cos(this.degToRadians(30 * i))
            var posY = 105 * Math.sin(this.degToRadians(30 * i))

            var textNode = this.getWheelNumberText(
                String(this.rouletteNumbers[i]),
                posX,
                posY,
                this.degToRadians(30 * i)
            );
            sectoredWheelContainer.addChild(textNode)
        }

        sectoredWheelContainer.position.set(0, 0)
        WheelOfFortune.extCircleImg.addChild(sectoredWheelContainer)
        WheelOfFortune.extCircleImg.position.set(
            this.rouletCenterX + 150,
            (rendererHeight - 600) / 2 + 50 + 150
        );
        appStage.addChild(WheelOfFortune.extCircleImg)

        /**
         * render internal circle roulete
         */
        WheelOfFortune.intCircleImg = new PIXI.Sprite(loader.resources.intCircle.texture)
        WheelOfFortune.intCircleImg.x = (rendererWidth - 108) / 2 + 54
        WheelOfFortune.intCircleImg.y = (rendererHeight - 600) / 2 + 150 + 54 //150 radius of extCircle, 50 top padding of extCircle, 54 intCircleRadius
        WheelOfFortune.intCircleImg.anchor.x = 0.5
        WheelOfFortune.intCircleImg.anchor.y = 0.5
        appStage.addChild(WheelOfFortune.intCircleImg)

        /**
         * render spinner image
         */
        const spinnerImg = new PIXI.Sprite(loader.resources.spinner.texture)
        spinnerImg.x = (rendererWidth - 40) / 2 // 40 spinner width
        spinnerImg.y = (rendererHeight - 600) / 2 //600 bg height, 80 spinner height
        appStage.addChild(spinnerImg)
    }
}