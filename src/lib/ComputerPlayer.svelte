<script>
    import { onMount, onDestroy } from 'svelte';
    import { gameMode, currentPlayer, isRolling } from './stores.js';

    let interval;
    const COMPUTER_DELAY = 2000; // 2 seconds between rolls

    function startInterval() {
        if (interval) clearInterval(interval);
        interval = setInterval(computerPlay, COMPUTER_DELAY);
    }

    function stopInterval() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function computerPlay() {
        if ($gameMode !== 'computer' || $isRolling) return;
        
        const diceButton = /** @type {HTMLButtonElement} */ (document.querySelector('.dice-container button'));
        if (diceButton && !diceButton.disabled) {
            diceButton.click();
        }
    }

    $: if ($gameMode === 'computer' && !interval) {
        startInterval();
    } else if ($gameMode !== 'computer' && interval) {
        stopInterval();
    }

    onMount(() => {
        if ($gameMode === 'computer') {
            startInterval();
        }
    });

    onDestroy(() => {
        stopInterval();
    });
</script>
