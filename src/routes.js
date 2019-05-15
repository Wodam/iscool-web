// IMPORTS
import Questions from './components/Questions.vue';
import Questions_backup from './components/Questions_backup.vue';

import Exams from './components/Exams.vue';

// ROUTES
export const routes = [
	{
	  path: '/',
	  component: Questions
  },
  {
	  path: '/questions',
	  component: Questions
	},
  {
	  path: '/questions-backup',
	  component: Questions_backup
	},
  {
	  path: '/exams',
	  component: Exams
	}
];
