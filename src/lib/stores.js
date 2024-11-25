import { writable, derived } from 'svelte/store';

// Create a writable store for the score
// - Initial value is 0
// - Any component can read this with $score
// - Any component can write to this with $score = newValue
export const score = writable(0);

// Create a writable store for roll history
// - Initial value is empty array
// - Components can read with $rollHistory
// - Components can update with $rollHistory = newValue
export const rollHistory = writable([]);

// Create a writable store for high scores
// - Initial value is empty array
// - Components can read with $highScores
// - Components can update with $highScores = newValue
export const highScores = writable([]);

// Derived store: bonus points (10% of current score)
export const bonusPoints = derived(score, ($score) => Math.floor($score * 0.1));

// Derived store: total score (regular score + bonus points)
export const totalScore = derived([score, bonusPoints], ([$score, $bonusPoints]) => $score + $bonusPoints);

// Game mode and player stores
export const gameMode = writable('single'); // 'single' or 'computer'
export const currentPlayer = writable('human'); // 'human' or 'computer'

// Dice-related stores and functions
export const isRolling = writable(false);
export const diceValue = writable(1);
export const target = writable(getRandomInt(1, 7));

// Function to get a random integer
export function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
}

// Function to update high scores
export function updateHighScores(currentHighScores, currentScore, rollCount) {
      return [
            ...currentHighScores,
            {
                  score: currentScore,
                  timestamp: new Date(),
                  rolls: rollCount,
            },
      ]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
}
