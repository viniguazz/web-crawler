const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
    console.log(`* Crawling ${currentURL}`);
    try {
        const response = await fetch(currentURL);
        if (response.status > 399) { // acima de 399 são erros de cliente ou servidor
            console.log(`# Error in fetch with status code: ${response.status} -> page: ${currentURL}`);
            return; // paramos de fazer o crawl
        }
        const contentType = response.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`# Response content is not HTML -> Content type: ${contentType}; page: ${currentURL}`);
            return;
        }
        console.log(await response.text());
    } catch (error) {
        console.log(`# Error while fetching: ${error.message} -> page: ${currentURL}`);
    }


    // precisamos aguardar no console.log também
    // retorna o conteúdo em texto. A partir disso alimentaremos a func getURLsFromHTML()
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                // if an invalid URL is passed to the constructor of the URL Class, it will throw an error
                urls.push(urlObj.href)
            } catch (error) { // error is, in this context, an error object
                console.log(`Error -> invalid relative url! System Message: ${error.message}`)
            }

        } else {
            try {
                const urlObj = new URL(linkElement);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Error -> invalid absolute url! System Message: ${error.message}`)
            }
        }
    }
    return urls;
}

function normalizeURL(urlString) {

    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1); // tudo menos o último char
    }

    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}