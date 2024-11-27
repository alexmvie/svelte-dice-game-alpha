<script>
      import { createEventDispatcher } from 'svelte';
      import { getRandomInt } from './stores.js';
      import { tooltip } from './tooltipAction.js';
      const dispatchEvent = createEventDispatcher();

      export let initialValue = 1;
      export let animationDuration = 1000;
      
      let value = initialValue;
      let isRolling = false;

      const roll = () => getRandomInt(1, 7);

      function handleRoll() {
            if (isRolling) return;
            
            isRolling = true;
            const finalValue = roll();

            // Set final value after animation
            setTimeout(() => {
                  value = finalValue;
                  isRolling = false;
                  dispatchEvent('rollComplete', { diceValue: finalValue });
            }, animationDuration);
      }
</script>

<div class="dice-container">
      <div class="scene">
            <div class={`cube ${isRolling ? 'rolling' : ''} show-${value}`}>
                  <div class="cube__face cube__face--1">
                        <span class="dot"></span>
                  </div>
                  <div class="cube__face cube__face--2">
                        <span class="dot"></span>
                        <span class="dot"></span>
                  </div>
                  <div class="cube__face cube__face--3">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                  </div>
                  <div class="cube__face cube__face--4">
                        <div class="dot-column">
                              <span class="dot"></span>
                              <span class="dot"></span>
                        </div>
                        <div class="dot-column">
                              <span class="dot"></span>
                              <span class="dot"></span>
                        </div>
                  </div>
                  <div class="cube__face cube__face--5">
                        <div class="dot-column">
                              <span class="dot"></span>
                              <span class="dot"></span>
                        </div>
                        <span class="dot"></span>
                        <div class="dot-column">
                              <span class="dot"></span>
                              <span class="dot"></span>
                        </div>
                  </div>
                  <div class="cube__face cube__face--6">
                        <div class="dot-column">
                              <span class="dot"></span>
                              <span class="dot"></span>
                              <span class="dot"></span>
                        </div>
                        <div class="dot-column">
                              <span class="dot"></span>
                              <span class="dot"></span>
                              <span class="dot"></span>
                        </div>
                  </div>
            </div>
      </div>
      <button 
            on:click={handleRoll} 
            disabled={isRolling}
            use:tooltip={"Click to roll the dice and try to match the target number!"}
            class="roll-button"
      >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
</div>

<style>
      .dice-container {
            display: flex;
            gap: 2rem;
            margin: 1rem 0;
            align-items: center;
      }

      .scene {
            width: 100px;
            height: 100px;
            perspective: 400px;
            perspective-origin: 50% 100%;
      }

      .cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.5s;
      }

      .cube.rolling {
            animation: roll 1s ease-out;
      }

      .cube__face {
            position: absolute;
            width: 100px;
            height: 100px;
            background: white;
            border: 2px solid #ccc;
            border-radius: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
            box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
      }

      .dot-column {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
      }

      .dot {
            width: 16px;
            height: 16px;
            background: #333;
            border-radius: 50%;
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3);
      }

      .cube__face--1 {
            transform: rotateY(0deg) translateZ(50px);
      }
      .cube__face--2 {
            transform: rotateY(90deg) translateZ(50px);
      }
      .cube__face--3 {
            transform: rotateY(180deg) translateZ(50px);
      }
      .cube__face--4 {
            transform: rotateY(-90deg) translateZ(50px);
      }
      .cube__face--5 {
            transform: rotateX(90deg) translateZ(50px);
      }
      .cube__face--6 {
            transform: rotateX(-90deg) translateZ(50px);
      }

      .show-1 {
            transform: rotateY(0deg);
      }
      .show-2 {
            transform: rotateY(-90deg);
      }
      .show-3 {
            transform: rotateY(-180deg);
      }
      .show-4 {
            transform: rotateY(90deg);
      }
      .show-5 {
            transform: rotateX(-90deg);
      }
      .show-6 {
            transform: rotateX(90deg);
      }

      @keyframes roll {
            0% {
                  transform: rotateX(0) rotateY(0);
            }
            25% {
                  transform: rotateX(360deg) rotateY(180deg);
            }
            50% {
                  transform: rotateX(720deg) rotateY(360deg);
            }
            75% {
                  transform: rotateX(1080deg) rotateY(540deg);
            }
            100% {
                  transform: rotateX(1440deg) rotateY(720deg);
            }
      }

      .roll-button {
            padding: 0.8rem 1.5rem;
            font-size: 1.1rem;
            background: #4caf50;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 120px;
      }

      .roll-button:hover:not(:disabled) {
            transform: translateY(-2px);
            background: #45a049;
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      }

      .roll-button:active:not(:disabled) {
            transform: translateY(1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .roll-button:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
      }
</style>
