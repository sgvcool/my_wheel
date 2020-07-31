export { WheelOfFortune }

/**
 * Helper class with alter functions
 */
import { Helper } from './Helper.js'

/**
 * default variable for animation rotate roulette
 */
let angleStep = 0 // default sector, on strart 0
let extCircleImg, intCircleImg // external and internal images for rotate

class WheelOfFortune extends Helper{

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

    rotate() {
        const random = Math.floor(Math.random() * (11 - 1)) + 1
        
        if (angleStep === 0) {
            extCircleImg.angle += 15 // middle our ext roulette img
            intCircleImg.angle += 30 // ot baldy
            angleStep = 30 // one sector in degree
        } else {
            extCircleImg.angle += angleStep * random;
            intCircleImg.angle += angleStep * random;
        }
    }

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
        extCircleImg = new PIXI.Sprite(loader.resources.extCircle.texture)
        extCircleImg.anchor.x = 0.5
        extCircleImg.anchor.y = 0.5

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
        extCircleImg.addChild(sectoredWheelContainer)
        extCircleImg.position.set(
            this.rouletCenterX + 150,
            (rendererHeight - 600) / 2 + 50 + 150
        );
        appStage.addChild(extCircleImg)

        /**
         * render internal circle roulete
         */
        intCircleImg = new PIXI.Sprite(loader.resources.intCircle.texture)
        intCircleImg.x = (rendererWidth - 108) / 2 + 54
        intCircleImg.y = (rendererHeight - 600) / 2 + 150 + 54 //150 radius of extCircle, 50 top padding of extCircle, 54 intCircleRadius
        intCircleImg.anchor.x = 0.5
        intCircleImg.anchor.y = 0.5
        appStage.addChild(intCircleImg)

        /**
         * render spinner image
         */
        const spinnerImg = new PIXI.Sprite(loader.resources.spinner.texture)
        spinnerImg.x = (rendererWidth - 40) / 2 // 40 spinner width
        spinnerImg.y = (rendererHeight - 600) / 2 //600 bg height, 80 spinner height
        appStage.addChild(spinnerImg)
    }

    


    






    getWinNumber() {
        for (var i = 0; i < this.animationSteps; i++) {


            // if (this.currentWinPosition < 11) {
            //     this.currentWinPosition++
            // } else {
            //     this.currentWinPosition = 0
            // }


        }
        //this.animationSteps = 0;
        //return this.wheelNumbersWithOffset[this.currentWinPosition];
    }
}