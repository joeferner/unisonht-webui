import findUp from 'find-up';
import fs from 'fs';
import path from 'path';
import { RouteOptions } from '@unisonht/unisonht';
import ejs from 'ejs';
import { UnisonHT } from '@unisonht/unisonht/src/index';

export class FileLoader {
    public async serveFile(contentType: string, filename: string): Promise<RouteOptions> {
        const fullFilename = await findUp(filename, { cwd: __dirname });
        if (!fullFilename) {
            throw new Error(`could not find file "${filename}"`);
        }
        let content = await fs.promises.readFile(fullFilename, 'utf8');
        return {
            handler: async (req, res) => {
                if (process.env.NODE_ENV === 'development') {
                    content = await fs.promises.readFile(fullFilename, 'utf8');
                }
                res.send({
                    statusCode: 200,
                    contentType,
                    content,
                });
            },
        };
    }

    public async serveEjs(contentType: string, filename: string): Promise<RouteOptions> {
        const fullFilename = await findUp(filename, { cwd: __dirname });
        if (!fullFilename) {
            throw new Error(`could not find file "${filename}"`);
        }
        let content = ejs.compile(await fs.promises.readFile(fullFilename, 'utf8'), { filename: fullFilename });
        return {
            handler: async (req, res) => {
                if (process.env.NODE_ENV === 'development') {
                    content = ejs.compile(await fs.promises.readFile(fullFilename, 'utf8'), { filename: fullFilename });
                }
                res.send({
                    statusCode: 200,
                    contentType,
                    content: content(),
                });
            },
        };
    }

    async serveDirectory(unisonht: UnisonHT, source: any, pathPrefix: string, localPath: string): Promise<void> {
        const fullLocalPath = await findUp(localPath, { cwd: __dirname, type: 'directory' });
        if (!fullLocalPath) {
            throw new Error(`could not find path "${localPath}"`);
        }
        unisonht.get(source, `${pathPrefix}/:filename`, {
            handler: async (req, res) => {
                const filename = req.parameters.filename;
                const fullFilename = path.join(fullLocalPath, filename);
                let contentType = 'text';
                if (fullFilename.endsWith('.woff')) {
                    contentType = 'font/woff';
                } else if (fullFilename.endsWith('.woff2')) {
                    contentType = 'font/woff2';
                } else if (fullFilename.endsWith('.ttf')) {
                    contentType = 'font/ttf';
                }

                const content = await fs.promises.readFile(fullFilename);
                res.send({
                    statusCode: 200,
                    contentType,
                    content,
                });
            },
        });
    }
}
