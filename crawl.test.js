// função sob teste
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

// funções do JEST que usaremos para realizar o teste
const { test, expect } = require('@jest/globals')


// test() arg1=nome do teste, arg2=uma função
test('normalizeURL - Strip Protocol', () => {
    const input = 'http://blog.boot.dev/path/'; // é o input da função normalizeURL
    const actualOutput = normalizeURL(input); // aqui é o output da função normalizeURL
    const expectedOutput = 'blog.boot.dev/path';
    expect(actualOutput).toEqual(expectedOutput);
})

test('normalizeURL - Capitals', () => {
    const input = 'http://BLOG.boot.dev/path'; // é o input da função normalizeURL
    const actualOutput = normalizeURL(input); // aqui é o output da função normalizeURL
    const expectedOutput = 'blog.boot.dev/path';
    expect(actualOutput).toEqual(expectedOutput);
})

test('getURLsFromHTML - absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;

    const inputBaseURL = "https://blog.boot.dev"
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expectedOutput = ["https://blog.boot.dev/"];
    expect(actualOutput).toEqual(expectedOutput);
})

test('getURLsFromHTML - relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;

    const inputBaseURL = "https://blog.boot.dev"
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expectedOutput = ["https://blog.boot.dev/path/"];
    expect(actualOutput).toEqual(expectedOutput);
})

test('getURLsFromHTML - both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog Path 1
            </a>
            <a href="https://blog.boot.dev/path2/">
                Boot.dev Blog Path 2
            </a>
        </body>
    </html>
    `;

    const inputBaseURL = "https://blog.boot.dev"
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expectedOutput = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actualOutput).toEqual(expectedOutput);
})

test('getURLsFromHTML - invalid URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `;

    const inputBaseURL = "https://blog.boot.dev"
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expectedOutput = [];
    expect(actualOutput).toEqual(expectedOutput);
})