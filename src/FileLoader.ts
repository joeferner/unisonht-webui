import findUp from 'find-up';
import fs from 'fs';
import { RouteOptions } from '@unisonht/unisonht';
import ejs from 'ejs';

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
}
