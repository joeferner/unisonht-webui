import { SupportedButtons, UnisonHT, UnisonHTPlugin } from '@unisonht/unisonht/src/index';
import { FileLoader } from './FileLoader';
import { RouteHandler } from '@unisonht/unisonht/src/UnisonHT';
import { RouteHandlerRequest } from '@unisonht/unisonht/src/RouteHandlerRequest';
import { RouteHandlerResponse } from '@unisonht/unisonht/src/RouteHandlerResponse';

export class WebUI implements UnisonHTPlugin {
    private readonly templateLoader = new FileLoader();

    getSupportedButtons(): SupportedButtons {
        return {};
    }

    async initialize(unisonht: UnisonHT): Promise<void> {
        unisonht.get(this, '/', await this.templateLoader.serveEjs('text/html', 'public/index.ejs'));
        unisonht.get(
            this,
            '/assets/css/bootstrap.css',
            await this.templateLoader.serveFile('text/css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
        );
        unisonht.get(
            this,
            '/assets/js/bootstrap.js',
            await this.templateLoader.serveFile('text/javascript', 'node_modules/bootstrap/dist/js/bootstrap.min.js'),
        );
        unisonht.get(
            this,
            '/assets/js/jquery.js',
            await this.templateLoader.serveFile('text/javascript', 'node_modules/jquery/dist/jquery.min.js'),
        );
        unisonht.get(
            this,
            '/assets/js/babel.js',
            await this.templateLoader.serveFile('text/javascript', 'node_modules/@babel/standalone/babel.min.js'),
        );
        unisonht.get(
            this,
            '/assets/js/react.js',
            await this.templateLoader.serveFile('text/javascript', 'node_modules/react/umd/react.production.min.js'),
        );
        unisonht.get(
            this,
            '/assets/js/react-dom.js',
            await this.templateLoader.serveFile(
                'text/javascript',
                'node_modules/react-dom/umd/react-dom.production.min.js',
            ),
        );
        unisonht.get(
            this,
            '/assets/js/axios.js',
            await this.templateLoader.serveFile('text/javascript', 'node_modules/axios/dist/axios.min.js'),
        );
    }
}
