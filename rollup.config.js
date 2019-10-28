import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'index.js',
    output: {
        file: './dist/clip-path-canvas.min.js',
        format: 'iife',
        name: 'ClipPathCanvas',
        globals: {
            'bowser': 'Bowser',
        }
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs()
    ]
}


