import { form, log } from './lib/elements.js';
import { handleSubmit, pagesDelegation } from './lib/handlers.js';

form.addEventListener('submit', handleSubmit);
log.addEventListener('click', pagesDelegation);
