const cheerio = require('cheerio'); // Подобие Jquery
const needle = require('needle'); // Парсинг
const fs = require('fs'); // Работа с файлами
const readline = require('readline'); // Чтение и запись в консоль

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var arr = []; // Массив с результатом
var url = '';
var obg = '';

var attrVal = ''; // Атрибут для 4 варианта
var searchText = false; // Поиск текста для 4 варианта


rl.question('[1]Где парсим ? ', (url_link) => { // Question 
	url = `${url_link}`;
	answer2(); 
});


const answer2 = () => {
	rl.question(`[2] Что парсим ?
		1 - Картинки
		2 - Текст
		3 - Ссылки
		4 - Свой вариант
		`, (answer) => { // Вопросы
			let an = `${answer}`;
			if(an == 1) {
				obj = 'img';
				pars();
			}
			else if (an == 2) {
				obj = 'span';
				pars();
			}
			else if (an == 3) {
				obj = 'a';
				pars();
			}
			else if (an == 4) {
				answer3();
			}
			console.log(`${answer}`);
		 

			//rl.close();
		});
};

const answer3 = () => { // Тег
	rl.question(`Напишите тег : 
		Тег - div
		id - #id
		class - .class
		Например - div.class
		`, (answer) => { 
			let obj = `${answer}`;
			console.log(`${answer}`);
			answer4();
		});
};

const answer4 = () => { // Атрибут
	rl.question(`Напишите атрибут : 
		Ссылка a - href
		Ссылка картинки - src
		Если он не нужен оставьте пустым
		`, (answer) => { 
			let attrVal = `${answer}`;
			console.log(`${answer}`);
			answer5();
		});
};

const answer5 = () => { // Текст
	rl.question(`Искать текст в теге ?
		1 - Да
		0 - Нет`, (answer) => { 
			if(answer == 0) {
				searchText = false;
			}
			else if (answer == 1) {
				searchText = true;
			}
			console.log(`${answer}`);
			pars();
		});
};

const pars = () => {
needle.get(url, (error, response) => { // Парсер
	if (!error && response.statusCode == 200)
	{

		let $ = cheerio.load(response.body);
		$(obj).each((i, val) => {
			if(obj == 'img') {
				let text = ($(val).attr('src'));
				if(text != undefined)
				{			 
					let result = text.match(/http/i);// Регулярное выражение
					if(result != null){
						arr.push($(val).attr('src')); 
					} else {
						let newLink = url+text;
						arr.push(newLink); 
					}
				}
			}
			else if(obj == 'span') { 
				arr.push($(val).text()); 
			}
			else if(obj == 'a') { 
				let text = ($(val).attr('href'));

				if(text != undefined)
				{			 
					let result = text.match(/http/i);// Регулярное выражение
					if(result != null){
						arr.push($(val).text()); 
					} else {
						let newLink = url+text;
						arr.push(newLink); 
					}
				}
			}
			else {
				if(searchText == true) {
					arr.push($(val).text()); 
				}
				 
			}
		});
		fs.writeFileSync("link.json", JSON.stringify(arr));
	}
});
};

