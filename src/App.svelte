<script>
  import Counter from './lib/Counter.svelte';
  import Game from './lib/Game.svelte';
</script>

<main>
  <h1>Welcome to my Svelte Dice Game!</h1>
  
  <div class="card">
    <Counter />
  </div>

  <div class="card">
    <Game />
  </div>
</main>

<style>
  :global(body) {
    background-color: #1a1a1a;
    color: #ffffff;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    padding: 2rem;
    margin: 0 auto;
    max-width: 800px;
  }

  .card {
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 8px;
    background-color: #2a2a2a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  h1 {
    color: #aad3a898;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
</style>
