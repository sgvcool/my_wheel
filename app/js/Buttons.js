/**
 * Helper class with alter functions
 */
import { Helper } from './Helper.js'

export { Buttons }

class Buttons extends Helper{

    /**
     * all btns object
     */
    static btns = {}
    static ticker

    constructor(loader, ticker, appStage, rouletCenterX, rouletCenterY, bets){

        super()
    
        this.loader = loader
        this.appStage = appStage
        this.rouletCenterX = rouletCenterX
        this.rouletCenterY = rouletCenterY

        this.bets = bets
        Buttons.ticker = ticker

        /**
         * render btns under wheel
         */
        for(let i = 0; i < this.bets.length; i++){
           this.getBtnsRender(this.bets[i], this.rouletCenterX + (i * 105), this.rouletCenterY + 310)
            
            /**
             * set event for btns
             */
            this.setBtnEvent(this.button)
            Buttons.btns[`btn_${i}`] = this.btn
        }

    }

    getButtonTexture(buttonTexture, betValue, posX, posY) {
        this.betText = this.createTextTexture(String(betValue), 45, 45)
        this.button = new PIXI.Sprite(buttonTexture)
        this.button.buttonMode = true
        this.button.interactive = true
        this.button.addChild(this.betText)
        this.button.betValue = betValue
        this.button.position.set(posX, posY)

        return this.button
    }

    getBtnsRender(bet, rouletCenterX, rouletCenterY){
        this.btn = this.getButtonTexture(
            this.loader.resources.yellowBtn.texture,
            bet,
            rouletCenterX,
            rouletCenterY
        );
        
        this.appStage.addChild(this.btn);
    }

    /**
     * init rotate roulatte by click on btns 
     */
    setButtonClick(btn) {

        /**
         * disabled btns on click, but for all btns
         */
        Buttons.setBtnStatus()
        
        /**
         * rotate roulette
         */
        Buttons.ticker.start()

        setTimeout(function () {
            Buttons.ticker.stop()

            /**
             * set user bet
             */


            /**
             * set roulette number
             */

            
            /**
             * set bellance
             */

            
            /**
             * set game status
             */


            /**
             * get status game
             */
            if(ProgressPanel.statusGame){
                Buttons.setBtnStatus('enabled')
            }else{

                /**
                 * set alert of game over
                 */
            }

            
            
          }, 3000)
    }

    /**
     * add event setting for btns
     */
    static setBtnStatus(status  = 'disabled'){

        const btnsKeys = Object.keys(Buttons.btns)

        switch(status) {
            case 'disabled':  
                for(let key of btnsKeys){
                    Buttons.btns[key].buttonMode = false;
                    Buttons.btns[key].interactive = false;
                    Buttons.btns[key].tint = 0x333333;
                }
                break
          
            case 'enabled': 
                for(let key of btnsKeys){
                    Buttons.btns[key].buttonMode = true;
                    Buttons.btns[key].interactive = true;
                    Buttons.btns[key].tint = 0xFFFFFF;
                }
                break
        }

        //console.log(status)
    }

    setBtnEvent(
        btn,  
        mouseEvents = {
            'pointerdown' : this.setButtonClick, 
            'pointerover': this.setMouseOver, 
            'pointerout': this.setMouseOut
        }
    ){
        
        const keys = Object.keys(mouseEvents);

        keys.forEach(function(key) {
            if (typeof mouseEvents[key]  == 'function') {
                btn.on(key, (event) => mouseEvents[key](btn))
            }
        });
    }

    setMouseOver(btn) {
        btn.tint = 0x333333;
    }

    setMouseOut(btn) {
        btn.tint = 0xffffff;
    }
}

