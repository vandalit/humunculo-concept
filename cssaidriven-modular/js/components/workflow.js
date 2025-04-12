export function initWorkflow() {
    const canvas = document.getElementById('workflowCanvas');
    if (!canvas) return;
    
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Sample nodes data
    const nodes = [
        { id: 1, x: 100, y: 100, type: 'start', text: 'Client Brief' },
        { id: 2, x: 300, y: 100, type: 'process', text: 'Style Guide' },
        { id: 3, x: 500, y: 100, type: 'process', text: 'Layout' },
        { id: 4, x: 300, y: 250, type: 'process', text: 'Components' },
        { id: 5, x: 500, y: 250, type: 'process', text: 'Content' },
        { id: 6, x: 700, y: 175, type: 'end', text: 'Final Design' }
    ];
    
    // Connections between nodes
    const connections = [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 5 },
        { from: 4, to: 5 },
        { from: 5, to: 6 }
    ];
    
    // Node types styling
    const nodeStyles = {
        start: { bgColor: '#00b894', textColor: 'white' },
        process: { bgColor: '#6c5ce7', textColor: 'white' },
        end: { bgColor: '#d63031', textColor: 'white' }
    };
    
    // Draw the workflow
    function drawWorkflow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first
        connections.forEach(conn => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            
            if (fromNode && toNode) {
                ctx.beginPath();
                ctx.moveTo(fromNode.x + 40, fromNode.y + 20);
                ctx.lineTo(toNode.x, toNode.y + 20);
                ctx.strokeStyle = '#b2bec3';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Draw arrowhead
                drawArrowhead(toNode.x, toNode.y + 20, 10, Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x));
            }
        });
        
        // Draw nodes
        nodes.forEach(node => {
            const style = nodeStyles[node.type] || nodeStyles.process;
            
            // Node body
            ctx.fillStyle = style.bgColor;
            ctx.beginPath();
            ctx.roundRect(node.x, node.y, 80, 40, 8);
            ctx.fill();
            
            // Node text
            ctx.fillStyle = style.textColor;
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.text, node.x + 40, node.y + 20);
        });
    }
    
    // Helper to draw arrowhead
    function drawArrowhead(x, y, size, angle) {
        ctx.save();
        ctx.fillStyle = '#b2bec3';
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-size, -size/2);
        ctx.lineTo(-size, size/2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    // Initial draw
    drawWorkflow();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        drawWorkflow();
    });
}