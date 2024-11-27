<script>
    // This component is only used for its global styles
</script>

<div class="tooltip-styles"/>

<style>
    /* Hide the dummy element */
    .tooltip-styles {
        display: none;
    }

    :global(.tooltip) {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        pointer-events: none;
        z-index: 1000;
        white-space: nowrap;
        transform: translateZ(0);
        will-change: top, left;
    }

    :global(.tooltip::after) {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px 6px 0 6px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    }
</style>
