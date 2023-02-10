const { crawlPage } = require('./crawl.js');

function main() {
    if (process.argv.length < 3) {
        console.log("Error: no website provided");
        process.exit(1);
        // o argumento de .exit(1) é o exit code que passamos no encerramento do programa ( 0 indica sucesso e 1 indica erro)
    } else if (process.argv.length > 3) {
        console.log("Error: more than 1 website provided");
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log(`\nStarting the crawling process of ${baseURL}...\n`);
    crawlPage(baseURL);
}

main();