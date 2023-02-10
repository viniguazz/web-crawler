// função sob teste
const { normalizeURL } = require('./crawl.js')

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