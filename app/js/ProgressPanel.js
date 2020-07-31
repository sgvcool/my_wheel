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
    static balance
    static userBet
    static win

    /**
     * varuable for render panel
     */
    static balancePanel 
    static betPanel
    static winPanel

    constructor(appStage, rendererWidth, rendererHeight, balance = 200, bet = 5, win = 0){

        super()

        // app renderer sizes (height width)
        this.rendererWidth = rendererWidth
        this.rendererHeight = rendererHeight
        this.appStage = appStage

        /**
         * default value ballance
         */
        ProgressPanel.balance = balance
        ProgressPanel.userBet = bet // user bet
        ProgressPanel.win = win

        this.step = 0
        this.rouletteCurNumber = 0

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
        ProgressPanel.balancePanel = this.createTextTexture(
            "Balance: " + ProgressPanel.balance, 
            (this.rendererWidth - 800) / 2 + 170,
            (this.rendererHeight + 570) / 2
        );
        this.appStage.addChild(ProgressPanel.balancePanel)

        ProgressPanel.betPanel = this.createTextTexture(
            "Bet: " + ProgressPanel.userBet, 
            (this.rendererWidth - 800) / 2 + 370, 
            600
        );
        this.appStage.addChild(ProgressPanel.betPanel)

        ProgressPanel.winPanel = this.createTextTexture(
            "Win: " + ProgressPanel.win, 
            (this.rendererWidth - 800) / 2 + 570, 
            600
        );
        this.appStage.addChild(ProgressPanel.winPanel)
    }

    /**
     * set user bet
     */
    static setUserBet(userBet){
        ProgressPanel.userBet = userBet //curently user bet not roulette number
    }

    /**
     * set roulette current number
     */
    static setRouletteCurNumber(rouletteCurNumber){
        this.rouletteCurNumber = rouletteCurNumber //curently roulette's rotate number
    }

    /**
     * check current bellance
     */
    static checkBalance(){
        if(ProgressPanel.balance >= 5){
            ProgressPanel.statusGame = true
            return true
        }

        ProgressPanel.statusGame = false
        return false
    }

    /**
     * set bellance
     */
    static setBellance(){

        /**
         * if is not game over for user
         */
        if(ProgressPanel.checkBalance()){

            if(this.rouletteCurNumber === ProgressPanel.userBet){
                
                /**
                 * set winner balance
                 */
                ProgressPanel.updateUserBalance(ProgressPanel.userBet)
                
            }else{

                /**
                 * set looser balance
                 */
                ProgressPanel.win = 0
                ProgressPanel.balance = ProgressPanel.balance - ProgressPanel.userBet

            }

            /**
             * update progress panel
             */
            ProgressPanel.updateProgressPanelText()

        }else{
            ProgressPanel.statusGame = false
        }
    }

    static updateProgressPanelText() {

        ProgressPanel.balancePanel.text = `Balance: ${ProgressPanel.balance}`
        ProgressPanel.betPanel.text = `Bet: ${ProgressPanel.userBet}`
        ProgressPanel.winPanel.text = `Win: ${ProgressPanel.win}`

        ProgressPanel.checkBalance()
    }

    static updateUserBalance(userBet) {
        switch (userBet) {
            case 1:
                ProgressPanel.win = userBet * 2
                break
            case 3:
                ProgressPanel.win = userBet * 3
                break
            case 5:
                ProgressPanel.win = userBet * 6
                break

            default:
                ProgressPanel.win = 0
        }

        if (ProgressPanel.win > 0) {
            ProgressPanel.balance = ProgressPanel.balance + ProgressPanel.win
        }
    }
}