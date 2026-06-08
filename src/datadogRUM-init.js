import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';

datadogRum.init({
    applicationId: 'd743c83d-3729-41d7-9520-8ecff9eaf208',
    clientToken: 'pub23b7b5d6fe2f84aff037394be9ba3db2',
    site: 'datadoghq.eu',
    service: 'vexrune',
    env: process.env.REACT_APP_ENV || 'development',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    plugins: [reactPlugin({ router: false })],
});

export { reactPlugin };