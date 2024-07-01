import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `lumine-ui.js`, // Nombre del archivo JS
                assetFileNames: `assets/lumine-ui.[ext]`, // Nombre de los archivos CSS y otros assets
            },
        },
    },
});
