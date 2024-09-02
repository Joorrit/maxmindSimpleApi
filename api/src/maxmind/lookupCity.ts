import { Reader } from '@maxmind/geoip2-node';
import { promises as fs } from 'fs';

async function fileExists(filePath: string) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

const options = {
    watchForUpdates: true,
};

export async function lookupCity(ip: string) {
    const filePath = '/usr/share/GeoIP/GeoLite2-City.mmdb';
    const fileIsReady = await fileExists(filePath);

    if (!fileIsReady) {
        throw new Error(`File ${filePath} not found`);
    }

    const reader = await Reader.open(filePath, options);
    return reader.city(ip);
}