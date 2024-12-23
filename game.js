class FruitSortGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.moves = 0;
        this.baskets = Array(6).fill().map(() => []);
        this.selectedBasket = null;
        this.selectedFruit = null;
        
        // 水果種類（使用表情符號作為示例）
        this.fruitTypes = ['🍎', '🍌', '🍊', '🍇', '🍐', '🍑'];
        
        this.initGame();
        this.addEventListeners();
    }

    initGame() {
        // 建立所有水果陣列
        let allFruits = [];
        this.fruitTypes.forEach(fruit => {
            for(let i = 0; i < 6; i++) {
                allFruits.push(fruit);
            }
        });

        // 隨機打亂水果
        allFruits = this.shuffle(allFruits);

        // 分配水果到籃子
        for(let i = 0; i < allFruits.length; i++) {
            const basketIndex = Math.floor(i / 6);
            this.baskets[basketIndex].push(allFruits[i]);
        }

        this.draw();
    }

    shuffle(array) {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 繪製籃子和水果
        this.baskets.forEach((basket, index) => {
            const x = 100 + (index * 120);
            const y = 100;
            
            // 繪製透明籃子
            this.ctx.strokeStyle = '#000';
            this.ctx.strokeRect(x, y, 80, 200);
            
            // 繪製水果
            basket.forEach((fruit, fruitIndex) => {
                this.ctx.font = '30px Arial';
                this.ctx.fillText(fruit, x + 25, y + 40 + (fruitIndex * 30));
            });
        });
    }

    addEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 判斷點擊的籃子
            const basketIndex = Math.floor((x - 100) / 120);
            if(basketIndex >= 0 && basketIndex < 6) {
                this.handleBasketClick(basketIndex);
            }
        });
    }

    handleBasketClick(basketIndex) {
        if(this.selectedBasket === null) {
            this.selectedBasket = basketIndex;
        } else {
            if(this.selectedBasket !== basketIndex) {
                // 交換水果
                const temp = this.baskets[this.selectedBasket][0];
                this.baskets[this.selectedBasket][0] = this.baskets[basketIndex][0];
                this.baskets[basketIndex][0] = temp;
                
                this.moves++;
                document.getElementById('moves').textContent = `移動次數：${this.moves}`;
                
                if(this.checkWin()) {
                    alert('恭喜獲勝！');
                }
            }
            this.selectedBasket = null;
        }
        this.draw();
    }

    checkWin() {
        return this.baskets.every(basket => {
            const firstFruit = basket[0];
            return basket.every(fruit => fruit === firstFruit);
        });
    }
}

// 啟動遊戲
window.onload = () => {
    new FruitSortGame();
}; 