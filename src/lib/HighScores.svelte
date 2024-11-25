<script>
    export function updateHighScores(highScores, currentScore, rollCount) {
        return [...highScores, {
            score: currentScore,
            timestamp: new Date(),
            rolls: rollCount
        }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    }

    import { highScores } from './stores.js';
</script>

<div class="high-scores">
    <h2>High Scores</h2>
    {#if $highScores.length > 0}
        <ul>
            {#each $highScores as score, i}
                <li>
                    #{i + 1}: {score.score} points
                    <span class="details">
                        (Rolls: {score.rolls} | {new Date(score.timestamp).toLocaleString()})
                    </span>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No high scores yet!</p>
    {/if}
</div>

<style>
    .high-scores {
        margin-top: 2rem;
        padding: 1rem;
        background: #2a2a2a;
        border-radius: 8px;
    }

    h2 {
        margin-top: 0;
        color: #fff;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        padding: 0.5rem 0;
        color: #fff;
    }

    .details {
        font-size: 0.8em;
        color: #aaa;
        margin-left: 1rem;
    }
</style>