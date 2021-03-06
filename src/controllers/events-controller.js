import Event from '../models/event-model.js';
import { io } from '../index.js';

export function createEvent(req, res, next) {
  const { params: { applicationId }, body: { eventData, type } } = req;

  return Event.create({
    eventData,
    type,
    applicationId,
  }).then(event => {

    io.emit('event', event);

    return res.status(201).send(event);
  }).catch(error => {
    return res.status(415).send(error);
  });
}

export function fetchAllEvents(req, res, next) {
  return Event
    .findAll()
    .then(events => {
      return res.status(200).send(events);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function fetchEventsForApplication(req, res, next) {
  const { params: { applicationId } } = req;

  return Event
    .findAll({
      where: {
        applicationId,
      },
    })
    .then(events => {
      return res.status(200).send(events);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}

export function queryEvents(req, res, next) {
  const { body: { aggregation: { field, aggregateFunction, options } } } = req;

  return Event
    .aggregate(field, aggregateFunction, options)
    .then(events => {
      return res.status(200).send(events);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
}