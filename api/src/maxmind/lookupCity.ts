import { Reader } from '@maxmind/geoip2-node';
import { promises as fs } from 'fs';
import path from 'path';

const options = {
    watchForUpdates: true,
};

async function fileExists(filePath: string) {
    try {
        await fs.access(filePath);
        return true;
    } catch (err) {
        console.error(`File does not exist: ${filePath}`, err);
        return false;
    }
}

export async function lookupCity(ip: string) {
    const filePath = '/usr/share/GeoIP/GeoLite2-City.mmdb';
    const resolvedPath = path.resolve(filePath);

    const fileIsReady = await fileExists(resolvedPath);

    if (!fileIsReady) {
        throw new Error(`File ${resolvedPath} not found`);
    }

    const reader = await Reader.open(resolvedPath, options);
    return reader.city(ip);
}