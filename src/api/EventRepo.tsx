import {defaultParam, axiosClient} from './apiClient';
import {EventItemProp} from '../components/eventItems/LargeEventItem';
import { EventDetailsProp } from '../screens/EventDetailsScreen';

const endpoint = '/events';

export async function getUpcomingEvents(stateCode: string = '', page: number = 0, abortSignal?: AbortSignal) {
  return axiosClient.get(endpoint, {
    params: {
      ...defaultParam,
      stateCode: stateCode,
      page: page
    },
    signal: abortSignal
  });
}

export function searchEvents(keyword: string, stateCode: string = '', page: number = 0, abortSignal?: AbortSignal) {
  return axiosClient.get(endpoint, {
    params: {
      ...defaultParam,
      keyword: keyword,
      page: page
    },
    signal: abortSignal
  });
}

export function getFeaturedEvents(stateCode: string = '', abortSignal?: AbortSignal) {
  return axiosClient.get(endpoint, {
    params: {
      ...defaultParam,
      stateCode: stateCode,
      size: 3,
    },
    signal: abortSignal
  });
}

export function getEvent(id: string, abortSignal?: AbortSignal) {
  return axiosClient.get((endpoint + '/' + id), {
    params: {
      ...defaultParam,
    },
    signal: abortSignal,
  });
}

export function mapResponseToEventItemProp(event: any): EventItemProp {

  var image: any = null;
  event.images.forEach((i: any) => {
    if (image == null) {
      image = i;
    } else if (i.width > image.width) {
      image = i;
    }
  });

  // get date values
  const date = new Date(event.dates.start.dateTime)
  var time = ''
  var monthAndDay = ''
  var day = ''

  const getMinutes = (date: Date) => {
    if (date.getMinutes() == 0) {
      return '00'
    } else {
      return date.getMinutes().toString()
    }
  }

  if (date.getUTCHours() > 12) {
    time = date.getUTCHours() - 12 + ':' + getMinutes(date) + ' pm';
  } else if (date.getUTCHours() == 12) {
    time = date.getUTCHours() + ':' + getMinutes(date) + ' pm';
  } else if (date.getUTCHours() == 0) {
    time = 12 + ':' + getMinutes(date) + ' am';
  } else {
    time = date.getUTCHours() + ':' + getMinutes(date) + ' am';
  }

  monthAndDay = date.toLocaleString('default', {month: 'short'}) + ' ' + date.getUTCDate()
  day = date.toLocaleString('default', {weekday: 'short'})

  return {
    data: {
      id: event.id,
      imageSource: image.url,
      eventName: event.name,
      date: {
        day: day,
        month: monthAndDay,
        time: time,
      },
      location: {
        city: event._embedded.venues[0].city.name + ', ' + event._embedded.venues[0].state.stateCode,
        venue: event._embedded.venues[0].name,
      },
    },
  };
}

export function mapResponseToEventDetailsProp(event: any): EventDetailsProp {
  var image: any = null;
  event.images.forEach((i: any) => {
    if (image == null) {
      image = i;
    } else if (i.width > image.width) {
      image = i;
    }
  });

  // get date values
  const date = new Date(event.dates.start.dateTime);
  var time = '';
  var monthAndDay = '';
  var day = '';

  const getMinutes = (date: Date) => {
    if (date.getMinutes() == 0) {
      return '00';
    } else {
      return date.getMinutes().toString();
    }
  };

  if (date.getUTCHours() > 12) {
    time = date.getUTCHours() - 12 + ':' + getMinutes(date) + ' pm';
  } else if (date.getUTCHours() == 12) {
    time = date.getUTCHours() + ':' + getMinutes(date) + ' pm';
  } else if (date.getUTCHours() == 0) {
    time = 12 + ':' + getMinutes(date) + ' am';
  } else {
    time = date.getUTCHours() + ':' + getMinutes(date) + ' am';
  }

  monthAndDay =
    date.toLocaleString('default', {month: 'short'}) + ' ' + date.getUTCDate();
  day = date.toLocaleString('default', {weekday: 'short'});

  var minPrice = null;
  var maxPrice = null;
  var eventImage = null;

  // Try getting ticket and venue image details
  try {
    eventImage = event._embedded.venues[0].images[0].url
  } catch(e) {

  }

  try {
    minPrice = event.priceRanges[0].min;
    maxPrice = event.priceRanges[0].max;
  } catch (e) {}

  return {
    data: {
      id: event.id,
      imageSource: image.url,
      eventName: event.name,
      date: {
        day: day,
        month: monthAndDay,
        time: time,
      },
      location: {
        city:
          event._embedded.venues[0].city.name +
          ', ' +
          event._embedded.venues[0].state.stateCode,
        venue: event._embedded.venues[0].name,
      },
      ticketInfo: {
        minPrice: minPrice,
        maxPrice: maxPrice,
      },
      venue: {
        imageSource: eventImage,
        name: event._embedded.venues[0].name,
        address: event._embedded.venues[0].address.line1,
      },
      segment: event.classifications[0].segment.name,
      genre: event.classifications[0].genre.name,
      subGenre: event.classifications[0]?.subGenre.name,
      link: event.url,
    },
  };
}
