async function loadMarkdown(file) {
    const contentDiv = document.getElementById('content');
    // const footnotes = require('showdown-footnotes');
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      const markdownText = await response.text();
      const converter = new showdown.Converter({
        metadata: true,
        simpleLineBreaks:true,
        strikethrough: true,
        tasklists: true
      });
      const html = converter.makeHtml(markdownText);
      contentDiv.innerHTML = html  + `<hr/>`;
      // html += `<hr/>`;
    } catch (error) {
      console.error('Error loading Markdown file:', error);
      contentDiv.innerHTML += '<p>Error loading content. Please try again.</p>';
    }
}

// 加载多个 Markdown 文件
loadMarkdown('./about.md');