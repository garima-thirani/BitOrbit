// Simple tooltip text wrapper for SVG
function wrapTooltipText() {
    const tooltips = [
        {id: 'threadTooltip', wordsPerLine: 11},
        {id: 'mpTooltip', wordsPerLine: 11},
        {id: 'asyncTooltip', wordsPerLine: 11},
        {id: 'futuresTooltip', wordsPerLine: 11},
        {id: 'mmTooltip', wordsPerLine: 11},
        {id: 'gcTooltip', wordsPerLine: 11},
        {id: 'moTooltip', wordsPerLine: 11},
        {id: 'npTooltip', wordsPerLine: 11},
        {id: 'idxTooltip', wordsPerLine: 11},
        {id: 'ufuncTooltip', wordsPerLine: 11},
        {id: 'laTooltip', wordsPerLine: 11},
        {id: 'perfTooltip', wordsPerLine: 11},
        {id: 'optTooltip', wordsPerLine: 11},
        {id: 'testTooltip', wordsPerLine: 11},
        {id: 'debugTooltip', wordsPerLine: 11},
        {id: 'mockTooltip', wordsPerLine: 11}
    ];
    
    tooltips.forEach(config => {
        const el = document.getElementById(config.id);
        if (!el) return;
        
        const text = el.textContent;
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            currentLine += (currentLine ? ' ' : '') + word;
            if (currentLine.split(' ').length >= config.wordsPerLine) {
                lines.push(currentLine);
                currentLine = '';
            }
        });
        if (currentLine) lines.push(currentLine);
        
        // Limit to 2 lines
        if (lines.length > 2) {
            lines.length = 2;
            lines[1] = lines[1].substring(0, 80) + '...';
        }
        
        // Create tspans
        const baseY = parseInt(el.getAttribute('y'));
        el.textContent = '';
        
        lines.forEach((line, i) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', el.getAttribute('x'));
            tspan.setAttribute('y', baseY + (i * 13));
            tspan.textContent = line;
            el.appendChild(tspan);
        });
    });
}

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapTooltipText);
} else {
    wrapTooltipText();
}

// Re-wrap after tooltip updates
const originalClickHandlers = document.querySelectorAll('.thread-node, .mp-node, .async-node, .futures-node, .mm-node, .gc-node, .mo-node, .np-node, .idx-node, .ufunc-node, .la-node, .perf-node, .opt-node, .test-node, .debug-node, .mock-node');

originalClickHandlers.forEach(node => {
    const newHandler = function(e) {
        setTimeout(wrapTooltipText, 10);
    };
    node.addEventListener('click', newHandler);
});