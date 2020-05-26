import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/logowl-client-browser.js',
        format: 'iife',
        name: 'logowl'
    },
    plugins: [
        babel({
            extensions: ['.js'],
            exclude: ['node_modules/@babel/**', 'node_modules/core-js/**']
        }),
        terser()
    ]
};