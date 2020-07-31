/**
 * Helper class with alter functions
 */
import { Helper } from './Helper.js'

export { ProgressPanel }
class ProgressPanel extends Helper{

    /**
     * status game
     */
    static statusGame = true

    constructor(appStage, rendererWidth, rendererHeight, balance = 200, bet = 5, win = 0){

        super()

        // app renderer sizes (height width)
        this.rendererWidth = rendererWidth
        this.rendererHeight = rendererHeight
        this.appStage = appStage

        /**
         * default value ballance
         */
        this.balance = balance
        this.bet = bet
        this.win = win

        this.step = 0
        this.wheelNumber = 0

        /**
         * render black bg progress panel
         */
        this.getProgressPanelRender()

    }

    /**
     * get render progress panel
     */
    getProgressPanelRender(){

        /**
         * render black bg panel
         */
        const blackBgBlockPanel = new PIXI.Graphics()
            blackBgBlockPanel.beginFill(0x00000)
            blackBgBlockPanel.drawRect(0, 0, this.rendererWidth, 100)
            blackBgBlockPanel.endFill()

            /**
             * add opacity gradient
             */
            blackBgBlockPanel.alpha = 0.5

        blackBgBlockPanel.position.set(
            0,
            (this.rendererHeight + 500) / 2
        );
        this.appStage.addChild(blackBgBlockPanel)

        /**
         * render elements progress panel
         */
        const balancePanel = this.createTextTexture(
            "Balance: " + this.balance, 
            (this.rendererWidth - 800) / 2 + 170,
            (this.rendererHeight + 570) / 2
        );
        this.appStage.addChild(balancePanel)

        const betPanel = this.createTextTexture(
            "Bet: " + this.bet, 
            (this.rendererWidth - 800) / 2 + 370, 
            600
        );
        this.appStage.addChild(betPanel)

        const winPanel = this.createTextTexture(
            "Win: " + this.win, 
            (this.rendererWidth - 800) / 2 + 570, 
            600
        );
        this.appStage.addChild(winPanel)
    }


    /**
     * set user bet
     */
    setUserBet(bet){
        this.bet = bet //curently user bet not roulette number
    }

    /**
     * check current bellance
     */
    checkBallance(){


        //return true or false
    }

    /**
     * set bellance
     */
    setBellance(userNumber, rouletteNumber){

        /**
         * set ballance
         */
    }


    setStatusGame(){

        /**
         * get current bellance
         */

        /**
         * set current bellance
         */
        //this.setBellance(userNumber, rouletteNumber)

        /**
         * if sum ballance >= 5 continue game
         */


        return ProgressPanel.statusGame
    }














    setWheelNumber(value) {
        this.wheelNumber = value;
    }

}