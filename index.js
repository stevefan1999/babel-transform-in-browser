import moduleResolver from '@stevefan1999/babel-plugin-module-resolver'
import decoratorsLegacy from 'babel-plugin-transform-decorators-legacy'
import 'preact-compat'
import 'prop-types'
import 'react-bootstrap'
import 'mobx'
import 'mobx-react'

function init () {
    const scriptNodes = document.querySelectorAll('script[type="text/babel-jsx"]')
	if (scriptNodes.length === 0) {
	    return;
	}
	
    const input = [...scriptNodes].reduce((memo, content) => memo.concat(';', content.innerHTML), '')
	
    const options = {
        presets: [
            'latest',
            'react',
            'stage-2'
        ],
        plugins: [
            'transform-object-assign',
			'transform-object-rest-spread',
			[moduleResolver, {
				"root": ["."],
				"alias": {
					"react": "preact-compat",
					"react-dom": "preact-compat",
					"create-react-class": "preact-compat/lib/create-react-class"
				}
			}],
			decoratorsLegacy
        ]
    };
    const output = Babel.transform(input, options).code;
    const execFn = new Function(output);

    execFn();
}

document.addEventListener('DOMContentLoaded', init, false);

global.require = require // import support