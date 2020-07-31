import { WheelOfFortune } from '../app/js/WheelOfFortune.js'
import { Buttons } from '../app/js/Buttons.js'
import { ProgressPanel } from '../app/js/ProgressPanel.js'

/**
 * render game container
 */
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "0x00000",
})
document.body.appendChild(app.view)

/**
 * get size our render window
 */
const rendererWidth = app.renderer.width
const rendererHeight = app.renderer.height

/**
 * load our assets images
 */
const loader = PIXI.Loader.shared
  .add("bg", "app/img/background.jpg")
  .add("extCircle", "app/img/external_circle.png")
  .add("intCircle", "app/img/internal_circle.png")
  .add("bottomImg", "app/img/bottom.png")
  .add("yellowBtn", "app/img/round-yellow.png")
  .add("spinner", "app/img/spinner.png")
  .load(appLoadComplete)

/**
 * get loader progress or errors
 */  
loader.onProgress.add(function(loader) {
    console.log(loader.progress + "% loaded")
})
loader.onError.add(function() {
    console.error("load error")
})
loader.onLoad.add(function(loader, resource) {
    console.log("asset loaded " + resource.name)
})

/**
 * get coordinate by our ext roulet
 * 300x300 our roulets size
 */
const rouletCenterX = (app.renderer.width - 300) / 2;
const rouletCenterY = (app.renderer.height - 300) / 2;

const ticker = PIXI.Ticker.shared

function appLoadComplete() {

    let backgroundImg = new PIXI.Sprite(loader.resources.bg.texture);
        backgroundImg.width = rendererWidth
        backgroundImg.height = rendererHeight
        backgroundImg.x = 0
        backgroundImg.y = 0;
        app.stage.addChild(backgroundImg);

    /**
     * get wheel of fortune roulette render
     */
    const WheelOfFortuneObj = new WheelOfFortune(loader, rouletCenterX, rouletCenterY)
    WheelOfFortuneObj.initWheelOfFortune(loader, app.stage, rendererWidth, rendererHeight)

    /**
     * get render buttons
     */
    const bets = [1,3,5] // set value of bets on the button
    const buttons = new Buttons(loader, ticker, app.stage, rouletCenterX, rouletCenterY, bets)
  
    /**
     * get render for progress panel
     */
    const progressPanel = new ProgressPanel(app.stage, rendererWidth, rendererHeight)
    
    /**
     * set animation and rotete roulette
     */
    ticker.autoStart = false
    ticker.add(WheelOfFortuneObj.rotate)

  }