// script.js

async function setLanguage(lang) {
    try {
        // 1. Загружаем нужный файл перевода
        // Было: const response = await fetch(`./${lang}.json`);
const response = await fetch(`./locales/${lang}.json`);
        if (!response.ok) throw new Error('Ошибка загрузки перевода');
        const translations = await response.json();

        // 2. Меняем направление текста и класс для RTL (из theme.css)
        if (lang === 'ar') {
            document.body.classList.add('rtl');
            document.documentElement.lang = 'ar';
        } else {
            document.body.classList.remove('rtl');
            document.documentElement.lang = lang;
        }

        // 3. Находим все элементы с атрибутом data-key и меняем текст
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            
            // Магия для вложенных ключей (например, "types.villa")
            // Замени старую строчку с reduce на эту:
const text = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations);
            
            if (text) {
                element.innerText = text;
            }
        });

        // Сохраняем выбор в браузере, чтобы при перезагрузке язык не слетал
        localStorage.setItem('selectedLang', lang);

    } catch (error) {
        console.error("Ошибка при смене языка:", error);
    }
}

// При загрузке страницы проверяем, какой язык был выбран ранее
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'ru';
    setLanguage(savedLang);
});