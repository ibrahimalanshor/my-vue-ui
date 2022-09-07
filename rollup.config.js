import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/my-vue-ui.mjs',
      },
      {
        format: 'cjs',
        file: 'dist/my-vue-ui.js',
      },
    ],
    plugins: [
      vue(),
      peerDepsExternal(),
      esbuild({
        minify: true,
      }),
      postcss({
        extract: 'my-vue-ui.css',
        plugins: [require('tailwindcss'), require('autoprefixer')],
      }),
    ],
    external: ['vue', 'click-outside-vue3'],
  },
];
