<script>
      import HighScores from './HighScores.svelte';
      import Dice from './Dice.svelte';
      import ComputerPlayer from './ComputerPlayer.svelte';
      import { score, rollHistory, highScores, updateHighScores, bonusPoints, totalScore, getRandomInt, gameMode, target } from './stores.js';

      let currentDiceValue;

      $: if (currentDiceValue === $target) {
            $score += 10;
            $target = getRandomInt(1, 7);
      }

      function handleRollComplete(event) {
            const { diceValue } = event.detail;
            currentDiceValue = diceValue;
            $rollHistory = [...$rollHistory, { value: diceValue, timestamp: new Date() }];
            $highScores = updateHighScores($highScores, $totalScore, $rollHistory.length);
      }

      function toggleGameMode() {
            $gameMode = $gameMode === 'single' ? 'computer' : 'single';
            // Reset score when changing mode
            $score = 0;
            $rollHistory = [];
      }
</script>

<div class="game-container">
      <div class="mode-selector">
            <button on:click={toggleGameMode}>
                  {$gameMode === 'single' ? 'Switch to Computer Mode' : 'Switch to Single Player'}
            </button>
      </div>

      <div class="stats">
            <div class="stat-item">
                  <span class="label">Base Score:</span>
                  <span class="value">{$score}</span>
            </div>
            <div class="stat-item">
                  <span class="label">Bonus Points:</span>
                  <span class="value">{$bonusPoints}</span>
            </div>
            <div class="stat-item">
                  <span class="label">Total Score:</span>
                  <span class="value">{$totalScore}</span>
            </div>
            <div class="stat-item">
                  <span class="label">Target:</span>
                  <span class="value">{$target}</span>
            </div>
      </div>

      <Dice on:rollComplete={handleRollComplete} />

      {#if $gameMode === 'computer'}
            <ComputerPlayer />
      {/if}

      <HighScores />
</div>

<style>
      .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            padding: 2rem;
            background-color: #1a1a1a;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            background-color: #2a2a2a;
            padding: 1rem;
            border-radius: 8px;
            width: 100%;
            max-width: 400px;
      }

      .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            background-color: #333;
            border-radius: 4px;
      }

      .label {
            color: #aaa;
            font-size: 0.9rem;
      }

      .value {
            color: #fff;
            font-weight: bold;
            font-size: 1.1rem;
      }

      .mode-selector {
            margin-bottom: 1rem;
            width: 100%;
            max-width: 400px;
      }

      .mode-selector button {
            width: 100%;
            padding: 0.5rem;
            background-color: #444;
            border: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.2s;
      }

      .mode-selector button:hover {
            background-color: #555;
      }
</style>
