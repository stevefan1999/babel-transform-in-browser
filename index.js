import * as Babel from 'babel-standalone';
import React from 'preact-compat';

function init () {
    const scriptNodes = document.querySelectorAll('script[type="text/es2015"]');
    const input = [...scriptNodes].reduce((memo, content) => {
        return memo.concat(';', content.innerHTML);
    }, '');

    const options = {
        presets: [
            'es2015',
            'react',
            'stage-0'
        ],
        plugins: [
            'transform-object-assign'
        ]
    };
    const output = Babel.transform(input, options).code;
    const execFn = new Function(output);

    execFn();
}

document.addEventListener('DOMContentLoaded', init, false);

global.React = React
global.ReactDOM = React