const mdToPdf = require('md-to-pdf')
, fs = require("fs")
const config = require('./config.json');
const merge = require('easy-pdf-merge');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// prepare title.pdf

const title_option = {
    // "stylesheet": [
    //   "css/style.css"
    // //  "https://example.org/stylesheet.css"
    // ],
    // "css": "body { color: tomato; }",
    // "body_class": "markdown-body",
    // "highlight_style": "monokai",
    // "marked_options": {
    //   "headerIds": false,
    //   "smartypants": true,
    // },
    "dest": 'pdf/title.pdf',
    "pdf_options": {
        "format": "Letter",
        "margin": "10mm 20mm",
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
        <!--span class='date'></span-->
    </section>
            `,
        "footerTemplate": `|-
            <img src= 'logo.jpeg' width = '140'></img>
            `
        },
    "stylesheet_encoding": "utf-8"
  };

async function title(){
    const pdf = await mdToPdf('docs/' + config.title, title_option).catch(console.error);
 
    if (pdf) {
        console.log(pdf.filename);
    }
};
title();

// // prepare content.pdf
// (async () => {
//     const pdf = await mdToPdf('docs/' + config.content, { "stylesheet": [
//         "css/style.css"
//       //  "https://example.org/stylesheet.css"
//       ], dest: 'pdf/content.pdf' }).catch(console.error);
 
//     if (pdf) {
//         console.log(pdf.filename);
//     }
// })();

// prepare body.pdf from multi file
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
            // console.log(md_data)
            fs.writeFile("tmp/temp.md", md_data, (err) => {
                if (err) console.log(err);
                console.log("Successfully Written to File.");
            });
            const option = {
                // "stylesheet": [
                //   "css/style.css"
                // //  "https://example.org/stylesheet.css"
                // ],
                // "css": "body { color: tomato; }",
                // "body_class": "markdown-body",
                // "highlight_style": "monokai",
                // "marked_options": {
                //   "headerIds": false,
                //   "smartypants": true,
                // },
                "dest": 'pdf/body.pdf',
                "pdf_options": {
                    "format": "Letter",
                    "margin": "30mm 20mm",
                    "printBackground": true,
                    "pageRanges": "2-8",
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
                    <!--span class='date'></span-->
                </section>
                        `,
                    "footerTemplate": `|-
                        <section>
                             www.holoniq.com &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;
                             <span class="pageNumber"></span>
                             <!--of <span class="totalPages"></span>-->
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

async function merge_all(){
    await sleep(3000);
    merge(['pdf/title.pdf', 'pdf/body.pdf'], 'pdf/output.pdf', function(err){
        if(err) {
            return console.log(err)
        }
        console.log('Successfully merged!')
        });
}

merge_all();