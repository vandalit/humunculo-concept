export function processIncludes() {
    document.querySelectorAll('[data-include]').forEach(element => {
        const file = element.getAttribute('data-include') + '.html';
        fetch(file)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Failed to load ' + file);
            })
            .then(data => {
                element.innerHTML = data;
                // Process any nested includes
                processIncludes();
            })
            .catch(error => {
                console.error(error);
            });
    });
}

// Initialize includes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    processIncludes();
});