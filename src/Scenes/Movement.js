class Movement extends Phaser.Scene {

    constructor() {
        super("movement");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        this.coins = [];
        // Create variables to hold constant values for sprite locations
        this.startX = 400;
        this.startY = 520;
    }

    preload() {
        // Assets from Kenny Assets pack "Scribble Platformer"
        // https://kenney.nl/assets/scribble-platformer
        this.load.setPath("./assets/");        
        this.load.image("body", "character_roundGreen.png");
        this.load.image("coin", "tile_coin.png");
    }

    create() {
        console.log("Create");

        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        this.playerSprite = this.add.sprite(this.startX, this.startY, "body"); 
        
        //this.playerSprite = this.add.sprite(startX, startY, "spriteKey");
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.aKey.isDown) {
            this.playerSprite.x -= 5;
            if (this.playerSprite.x <= 50) {
                this.playerSprite.x = 50; }
        }

        if (this.dKey.isDown) {
            this.playerSprite.x += 5;
            if (this.playerSprite.x >= 750) {
                this.playerSprite.x = 750; }
        }

        if (this.spaceKey.isDown) {
            this.coins.unshift(this.add.sprite(this.playerSprite.x, this.playerSprite.y, "coin"));
        }
        
        for ( let up of this.coins) {
            up.y -= 10;
            if (up.y <= -100) {
                up.destroy();
                this.coins.pop();
            }
        }
    }
}