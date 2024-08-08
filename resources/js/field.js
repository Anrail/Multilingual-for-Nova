import IndexField from './components/IndexField.vue';
import DetailField from './components/DetailField.vue';
import FormField from './components/FormField.vue';
import LanguageSelector from './components/LanguageSelector.vue';
import Tool from './components/Tool.vue';
import LanguageUI from "./components/LanguageUI.vue";

Nova.booting((app, store) => {
    console.log('Registering components');
    app.component('index-nova-multilingual', IndexField);
    app.component('detail-nova-multilingual', DetailField);
    app.component('form-nova-multilingual', FormField);
    app.component('language-selector', LanguageSelector);
    app.component('language-ui', LanguageUI);
    app.component('nova-multilingual-tool', Tool);

    console.log('Components registered:', {
        IndexField,
        DetailField,
        FormField,
        LanguageSelector,
        Tool
    });

    let lang = getCookie('lang');
    if (lang) {
        Nova.request().defaults.headers['lang'] = lang;
    }

    // Установка window.config
    // window.config = {
    //     currentLocal: lang || 'en', // Встановіть поточну мову
    //     locals: ['en', 'fr', 'de'], // Встановіть підтримувані мови
    // };
});


function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
