<script>
    let { text = '', position = 'top' } = $props();
</script>

<div class="tooltip-wrapper">
    <slot></slot>
    <span class="tooltip" class:top={position === 'top'} class:bottom={position === 'bottom'}>
        {text}
    </span>
</div>

<style>
    .tooltip-wrapper {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        visibility: hidden;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        text-align: center;
        padding: 5px 10px;
        border-radius: 6px;
        font-size: 14px;
        width: max-content;
        max-width: 200px;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltip.top {
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
    }

    .tooltip.bottom {
        top: 125%;
        left: 50%;
        transform: translateX(-50%);
    }

    .tooltip-wrapper:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }

    /* Arrow */
    .tooltip::after {
        content: "";
        position: absolute;
        border-width: 5px;
        border-style: solid;
    }

    .tooltip.top::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    }

    .tooltip.bottom::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
    }
</style>
