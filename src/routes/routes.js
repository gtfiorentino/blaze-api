import * as applicationsController from '../controllers/applications-controller.js';
import * as eventsController from '../controllers/events-controller.js';

export function setUpRoutes(router) {

  router.post('/applications', applicationsController.createApplication);
  router.post('/applications/:applicationId/events', eventsController.fetchEventsForApplication);

  router.post('/events', eventsController.createEvent);
  router.get('/events', eventsController.fetchAllEvents);
}