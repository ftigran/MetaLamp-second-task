//import './masked-text-field.scss'

import 'cleave.js'

var cleave = new Cleave('.masked-text-field__input', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
});