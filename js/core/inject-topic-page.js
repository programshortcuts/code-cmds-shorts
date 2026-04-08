
// js/core/inject-topic-page.js
export function injectTopicPage(jsonPage, container) {
    container.innerHTML = ''; // clear previous content

    const pageContainer = document.createElement('div');
    pageContainer.className = 'page-container drop-parent';

    // Page title
    const h2 = document.createElement('h2');
    const aTitle = document.createElement('a');
    aTitle.className = 'drop-down page-title';
    aTitle.textContent = jsonPage.title;
    h2.appendChild(aTitle);
    pageContainer.appendChild(h2);

    // Topics container
    const mainTopics = document.createElement('div');
    mainTopics.className = 'main-topics-container';

    jsonPage.topics.forEach(topic => {
        const topicEl = document.createElement('div');
        topicEl.className = 'topic drop-parent';

        // Topic header
        const header = document.createElement('header');
        const h3 = document.createElement('h3');
        const topicLink = document.createElement('a');
        topicLink.className = 'drop-down topic-title';
        topicLink.id = topic.id;
        topicLink.href = '#';
        topicLink.textContent = topic.title;

        if (topic.doubleTapNote) {
            const sup = document.createElement('sup');
            sup.textContent = topic.doubleTapNote;
            topicLink.appendChild(sup);
        }

        h3.appendChild(topicLink);
        header.appendChild(h3);
        topicEl.appendChild(header);

        // Snips container
        const snipsContainer = document.createElement('div');
        snipsContainer.className = 'topic-snips drop-snips show';

        topic.snips.forEach(snip => {
            const snipEl = document.createElement('div');
            snipEl.className = 'snip drop-parent';

            // Snip header
            const snipHeader = document.createElement('header');
            const h4 = document.createElement('h4');
            const snipLink = document.createElement('a');
            snipLink.className = 'drop-down snip-title';
            snipLink.href = '#';
            snipLink.textContent = snip.title;

            if (snip.sub) {
                const sub = document.createElement('sub');
                sub.textContent = snip.sub;
                snipLink.appendChild(sub);
            }

            h4.appendChild(snipLink);
            snipHeader.appendChild(h4);

            // Code container
            const codeCmd = document.createElement('div');
            codeCmd.className = 'code-cmd drop-snips';
            const codeContainer = document.createElement('div');
            codeContainer.className = 'code-container';
            const btn = document.createElement('button');
            btn.className = 'popup-btn';
            btn.textContent = 'O';
            const pre = document.createElement('pre');
            pre.tabIndex = 0;
            pre.className = 'copy-code';
            pre.id = snip.codeId;
            pre.textContent = snip.code;

            codeContainer.appendChild(btn);
            codeContainer.appendChild(pre);
            codeCmd.appendChild(codeContainer);

            snipEl.appendChild(snipHeader);
            snipEl.appendChild(codeCmd);
            snipsContainer.appendChild(snipEl);
        });

        topicEl.appendChild(snipsContainer);
        mainTopics.appendChild(topicEl);
    });

    pageContainer.appendChild(mainTopics);
    container.appendChild(pageContainer);
}