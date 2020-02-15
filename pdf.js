const mdToPdf = require('md-to-pdf');
const config = require('./config.json');

console.log(config.logo);

const option = {
    // "stylesheet": [
    //   "path/to/style.css",
    //   "https://example.org/stylesheet.css"
    // ],
    // "css": "body { color: tomato; }",
    // "body_class": "markdown-body",
    // "highlight_style": "monokai",
    // "marked_options": {
    //   "headerIds": false,
    //   "smartypants": true,
    // },
    "dest": 'pdf/output.pdf',
    "pdf_options": {
        "format": "A4",
        "margin": "30mm 20mm",
        "printBackground": true,
        "displayHeaderFooter": true,
        "headerTemplate": `|-
            <style>
                section {
                margin: 0 auto;
                font-family: system-ui;
                font-size: 11px;
                }
            </style>
            <section>
                <span class='date'></span>
            </section>`,
        "footerTemplate": `|-
            <section>
                <div>
                Page <span class="pageNumber"></span>
                of <span class="totalPages"></span>
                </div>
            </section>`
        },
    "stylesheet_encoding": "utf-8"
  };

(async () => {
    const pdf = await mdToPdf('docs/chapter1.md', option).catch(console.error);
 
    if (pdf) {
        console.log(pdf.filename);
    }
})();