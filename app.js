const app = Vue.createApp({
    data(){
        return{
           playerHealth : 100,
           monsterHealth : 100,
           winner : null,
           currentRound : 0,
           logMessages : []
        }
    },

    methods: {
        //mendapatkan nilai random
        getRandomValue(min, max){
            return Math.floor(Math.random()*(max-min)) + min;
        },

        // serangan dari monster ke player
        attackPlayer(){
            let attackValue = this.getRandomValue(5, 12);
            this.playerHealth -= attackValue;
            if(this.playerHealth < 0)this.playerHealth = 0;
            this.addLogMessage('Monster', 'Attack', attackValue);
        },

        //attack dari player ke monster
        attackMonster(){
            let attackValue = this.getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            if(this.monsterHealth < 0)this.monsterHealth = 0;
            this.attackPlayer();
            this.currentRound++;
            this.addLogMessage('Player', 'Attack', attackValue);
        },

        // heal untuk player
        healPlayer(){
            let healValue = this.getRandomValue(8, 14);
            this.playerHealth += healValue;
            if(this.playerHealth > 100)this.playerHealth = 100;
            this.attackPlayer();
            this.currentRound++;
            this.addLogMessage('Player', 'Heal', healValue)
        },

        //special attack
        specialAttack(){
            let attackValue = this.getRandomValue(12, 22);
            this.monsterHealth -= attackValue;
            if(this.monsterHealth < 0)this.monsterHealth = 0;
            this.attackPlayer();
            this.currentRound++;
            this.addLogMessage('Player', 'Attack', attackValue);
        },

        //tombol untuk nyerah
        surrender(){
            this.winner = 'Monster';
        },

        //untuk memulai game baru
        startNewGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },

        // menambahkan pesan pada log
        addLogMessage(who, what, value){
            this.logMessages.push({
                actionBy : who,
                actionType : what,
                actionValue : value
            });  
        }
        
    },

    watch: {
        playerHealth(newValue){
            if(newValue <= 0 && this.monsterHealth <= 0){
                this.winner = 'Draw';
            }
            else if (newValue <= 0){
                this.winner = 'Monster';
            }
        },

        monsterHealth(newValue){
            if(newValue <= 0 && this.playerHealth <= 0){
                this.winner = 'Draw';
            }
            else if(newValue <= 0){
                this.winner = 'Player';
            }
        }
    },

    computed: {
        //menentukan apakah akan menggunakan spesial attack
        mayUseSpecialAttack(){
           return this.currentRound % 3 !== 0;
        }
    },
});

app.mount('#game');
