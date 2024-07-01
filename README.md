<img width="1027" alt="image" src="https://github.com/Manoj-nathwani/WHO-African-Regional-Health-Data-Hub-React-Components/assets/2634482/98cb7219-a767-4705-ab2d-2e7f0a38e220">

# Fjelltopp CKAN Data Visualisations

This repository contains small, independent React components designed to be integrated into CKAN resource templates. These components can be individually built and added to Jinja2 templates for CKAN resources.

The project uses [parcel](https://parceljs.org) to build components into their respective directories. This approach allows for the creation of small, independent components that can be reused and repurposed while maintaining a consistent development workflow.

## CORS WORKAROUND
To get around CORS issues with `afro.fjelltopp.org` we are using `python proxy-server.py` and then having javascript make api requsts to the local flask server to proxy requests so that it's happening via an api rather than the browser, e.g.

```sh
pipenv sync
pipenv run python proxy-server.py
```

Eventually once CORS have been opened up on `afro.fjelltopp.org`, you can delete this functionality

## Development

To understand how to import and use a specific component, please refer to the `index.html` file located in each component's directory:
```
nvm use
npm install
npm run start
```

## Building
```
nvm use
npm install
npm run build
```
