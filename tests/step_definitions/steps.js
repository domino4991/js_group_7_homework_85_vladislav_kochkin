const { I } = inject();
const execSync = require('child_process').execSync;

Before(() => {
    execSync('cd ../backend && NODE_ENV=test node fixtures.js');
});

Given('я нахожусь на странице входа', () => {
    I.amOnPage("/login");
});

When('я ввожу {string} в поле {string}', (value, fieldName) => {
    I.fillField({id: fieldName}, value);
});


When('я нажимаю на кнопку {string}', (button) => {
    I.click({id: button});
});

Then('я перехожу на страницу создания {string} {string}', (value, path) => {
    I.amOnPage(path);
});

Then('я перехожу на главную страницу {string}', (path) => {
    I.amOnPage(path);
});

When(`я нажимаю на ссылку {string}`, (link) => {
    I.click({id: link});
});

When('я ввожу {string} в поле {string}', (value, fieldName) => {
    I.fillField({id: fieldName}, value);
});

When('я выбираю файл {string}', (id) => {
    I.attachFile(`input[id=${id}]`, './data/test.jpg');
});

When('я выбираю опцию {string} {string}', (id, value) => {
    I.selectOption(`select[id=${id}]`, value);
});

Then('я вижу текст {string}', (text) => {
    I.see(text);
});
