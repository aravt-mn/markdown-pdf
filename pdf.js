const mdToPdf = require('md-to-pdf')
, fs = require("fs")
const config = require('./config.json');

// console.log(config.files);

var md_data = ''
var i = 0;
for(file of config.files){
    fcontent = fs.readFile('docs/' + file, "utf-8", (err, data) => {
        if (err) { console.log(err) }
        // console.log(data);
        if(md_data == ''){
            md_data = data
        }else{
            md_data = md_data + '\n <div class="page-break"></div> \n' + data
        }
        
        i++;
        if(config.files.length == i ){
            console.log(md_data)
            fs.writeFile("tmp/temp.md", md_data, (err) => {
                if (err) console.log(err);
                console.log("Successfully Written to File.");
            });
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
                const pdf = await mdToPdf('tmp/temp.md', option).catch(console.error);
             
                if (pdf) {
                    console.log(pdf.filename);
                }
            })();
        }
    })
};