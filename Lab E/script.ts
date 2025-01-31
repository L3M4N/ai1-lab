type AppState = {
    currentStyle: string;
    styles: { [key: string]: string };
};

const state: AppState = {
    currentStyle: 'style1',
    styles: {
        style1: 'dist/styles/labA_css1.css',
        style2: 'dist/styles/labA_css2.css',
        style3: 'dist/styles/labA_css3.css',
    },
};

function changeStyle(styleName: string) {
    const styleElement = document.getElementById('dynamic-style') as HTMLLinkElement;
    if (styleElement && state.styles[styleName]) {
        styleElement.href = state.styles[styleName];
        state.currentStyle = styleName;
    }
}

function generateStyleLinks() {
    const nav = document.getElementById('style-links');
    if (nav) {
        for (const styleName in state.styles) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = styleName;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                changeStyle(styleName);
            });
            nav.appendChild(link);
            nav.appendChild(document.createTextNode(' '));
        }
    }
}

function init() {
    generateStyleLinks();
}

init();