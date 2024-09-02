import { Reader } from '@maxmind/geoip2-node';

const options = {
    watchForUpdates: true,
};

export function lookupCity(ip: string) {
    return Reader.open('/usr/share/GeoIP/GeoLite2-City.mmdb', options).then(reader => {
        return reader.city(ip);
    });
}