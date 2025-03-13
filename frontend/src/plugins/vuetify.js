import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // ✅ Import Vuetify styles

// ✅ Import Vuetify Components and Directives
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components, // ✅ Register all Vuetify components
  directives, // ✅ Register all Vuetify directives
});