/**
 * Svelte Action that adds tooltip functionality to any DOM element.
 * Usage: <element use:tooltip={'Tooltip text'}>
 * 
 * @param {HTMLElement} node - The DOM element to attach the tooltip to
 * @param {string} text - The text to display in the tooltip
 * @returns {object} - Svelte action object with update and destroy methods
 */
export function tooltip(node, text) {
    // Create the tooltip element that will be shown/hidden
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    
    /**
     * Calculates and sets the position of the tooltip relative to its target element.
     * The tooltip is positioned above the element and centered horizontally.
     * It also ensures the tooltip stays within the viewport bounds.
     */
    function position() {
        // Get the target element's position and size relative to the viewport
        const { top, left, width, height } = node.getBoundingClientRect();
        const tooltipHeight = tooltip.offsetHeight;
        const tooltipWidth = tooltip.offsetWidth;
        
        // Calculate position relative to viewport
        // Place tooltip 8px above the element and center it horizontally
        let tooltipTop = top - tooltipHeight - 8;
        let tooltipLeft = left + (width/2) - (tooltipWidth/2);
        
        // Keep tooltip within viewport bounds with an 8px margin
        tooltipTop = Math.max(8, Math.min(tooltipTop, window.innerHeight - tooltipHeight - 8));
        tooltipLeft = Math.max(8, Math.min(tooltipLeft, window.innerWidth - tooltipWidth - 8));
        
        // Apply the calculated position
        tooltip.style.top = `${tooltipTop}px`;
        tooltip.style.left = `${tooltipLeft}px`;
    }

    // Use a timeout to ensure tooltip is positioned after it's rendered
    let showTimeout;

    /**
     * Shows the tooltip when hovering over the element.
     * Adds the tooltip to the DOM and positions it correctly.
     */
    function show() {
        if (!text) return;  // Don't show if no text provided
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        // Small delay to ensure tooltip is in DOM and has dimensions before positioning
        showTimeout = setTimeout(() => {
            position();
        }, 0);
    }

    /**
     * Hides the tooltip when mouse leaves the element.
     * Cleans up the timeout and removes tooltip from DOM.
     */
    function hide() {
        if (showTimeout) {
            clearTimeout(showTimeout);
        }
        tooltip.remove();
    }

    // Add event listeners for showing/hiding tooltip and updating position
    node.addEventListener('mouseenter', show);
    node.addEventListener('mouseleave', hide);
    window.addEventListener('scroll', position);
    window.addEventListener('resize', position);

    return {
        /**
         * Called by Svelte when the tooltip text parameter changes.
         * Updates the tooltip text and repositions if currently visible.
         */
        update(newText) {
            text = newText;
            if (document.body.contains(tooltip)) {
                if (!newText) {
                    hide();
                } else {
                    tooltip.textContent = newText;
                    position();
                }
            }
        },

        /**
         * Called by Svelte when the element is destroyed.
         * Cleans up all event listeners and removes tooltip.
         */
        destroy() {
            hide();
            node.removeEventListener('mouseenter', show);
            node.removeEventListener('mouseleave', hide);
            window.removeEventListener('scroll', position);
            window.removeEventListener('resize', position);
        }
    };
}
