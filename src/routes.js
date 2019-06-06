// IMPORTS
import Questions from './components/Questions.vue';

import Exams from './components/Exams.vue';

import AnswerSheets from './components/AnswerSheets.vue';

// ROUTES
export const routes = [
	{
	  path: '/',
	  component: Exams
  },
  {
	  path: '/questions',
	  component: Questions
	},
  {
	  path: '/exams',
	  component: Exams
	},
	{
		path: '/answer_sheets',
		component: AnswerSheets
	}
];
