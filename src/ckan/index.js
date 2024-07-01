import { createRoot } from 'react-dom/client';
import ConfigContext from './ConfigContext';
import App from './app';

const rootElement = document.getElementById('root');

export default function Root() {
    const config = {
        DATASTORE_PATH: rootElement.getAttribute('data-datastore-path'),
        RESOURCE_ID: rootElement.getAttribute('data-resource-id'),
        RESOURCE_TITLE: rootElement.getAttribute('data-resource-title'),
        ROUND_TO_DECIMAL_PLACES: parseInt(rootElement.getAttribute('data-round-to-decimal-places')),
        LABELS: JSON.parse(rootElement.getAttribute('data-labels')),
        SEXES: JSON.parse(rootElement.getAttribute('data-sexes')),
        API_FIELDS: JSON.parse(rootElement.getAttribute('data-api-fields')),
    };

    return (
        <ConfigContext.Provider value={config}>
            <App />
        </ConfigContext.Provider>
    );
}

const root = createRoot(rootElement);
root.render(<Root />);
