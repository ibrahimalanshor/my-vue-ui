import * as components from './components/index.js';
import vClickOutside from 'click-outside-vue3';

export default {
  install: (app) => {
    app.use(vClickOutside);

    for (const prop in components) {
      const component = components[prop];

      app.component(component.name, component);
    }
  },
};
