# MaxMind Geolocation API

This repository provides a simple API for querying geolocation information from the MaxMind GeoIP database. The API allows you to host the service on your own infrastructure, ensuring that IP addresses remain private and are not sent to external services.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Overview

This project creates a stack of two Docker containers:

1. **maxmindinc/geoipupdate**: Keeps MaxMind GeoIP database up to date.
2. **backend**: This container provides a simple API to query the MaxMind GeoIP database and return geolocation information based on the provided IP address.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- (Free) MaxMind account credentials for updating the GeoIP database (GEOIPUPDATE_ACCOUNT_ID and GEOIPUPDATE_LICENSE_KEY).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Joorrit/maxmindSimpleApi.git
   cd maxmindSimpleApi
   ```

2. Update the `docker-compose.yml` file with your MaxMind credentials and API keys:

   ```yaml
     - GEOIPUPDATE_ACCOUNT_ID=your_account_id
     - GEOIPUPDATE_LICENSE_KEY=your_license_key
     - API_KEYS=your_api_keys
   ```

   Replace `your_account_id`, `your_license_key`, and `your_api_keys` with your actual MaxMind account details and API keys.

3. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This command will build and start the containers. The `geoipupdate` service will periodically update the GeoIP database, and the `backend` service will host the API.

## Usage

Once the containers are running, you can query the API by sending a GET request to the backend with the `x-api-key` header:

```bash
curl -H "x-api-key: your_api_key" http://yourbackend.com/8.8.8.8
```

The API will return a JSON response containing the geolocation information for the provided IP address.

Example response:

```json
{
  "continent": {
    "code": "NA",
    "geonameId": 6255149,
    "names": {
      "de": "Nordamerika",
      "en": "North America",
      "es": "Norteamérica",
      "fr": "Amérique du Nord",
      "ja": "北アメリカ",
      "pt-BR": "América do Norte",
      "ru": "Северная Америка",
      "zh-CN": "北美洲"
    }
  },
  "country": {
    "geonameId": 6252001,
    "isoCode": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États Unis",
      "ja": "アメリカ",
      "pt-BR": "EUA",
      "ru": "США",
      "zh-CN": "美国"
    }
  },
  "registeredCountry": {
    "geonameId": 6252001,
    "isoCode": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États Unis",
      "ja": "アメリカ",
      "pt-BR": "EUA",
      "ru": "США",
      "zh-CN": "美国"
    },
    "isInEuropeanUnion": false
  },
  "traits": {
    "isAnonymous": false,
    "isAnonymousProxy": false,
    "isAnonymousVpn": false,
    "isAnycast": false,
    "isHostingProvider": false,
    "isLegitimateProxy": false,
    "isPublicProxy": false,
    "isResidentialProxy": false,
    "isSatelliteProvider": false,
    "isTorExitNode": false,
    "ipAddress": "8.8.8.8",
    "network": "8.8.8.0/23"
  },
  "location": {
    "accuracyRadius": 1000,
    "latitude": 37.751,
    "longitude": -97.822,
    "timeZone": "America/Chicago"
  }
}
```

## API Endpoints

- **GET /:ip**: Query the geolocation data for the provided IP address.
  - **Headers**: 
    - `x-api-key` (required): Your API key.
  - **Response**: JSON object with geolocation data.

## Environment Variables

- `GEOIPUPDATE_ACCOUNT_ID`: Your MaxMind account ID.
- `GEOIPUPDATE_LICENSE_KEY`: Your MaxMind license key.
- `API_KEYS`: A comma-separated list of valid API keys that can be used to access the API.

## License

This project is licensed under the MIT License.
