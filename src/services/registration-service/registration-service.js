import http from '../http-service/http-service';

export const register = (data) => {
  const params = new URLSearchParams();
  params.append('*email', data.email);
  params.append('*firstName', data.fname);
  params.append('*lastName', data.lname);
  params.append('*org', data.org);
  params.append('*euResident', data['eu-res']);

  const notificationName = {
    [true]: 'notificationType',
    [false]: '*notificationType',
  }

  data.adv && params.append(
    notificationName[params.has(notificationName[false])],
    'advances'
  );

  data.alert && params.append(
    notificationName[params.has(notificationName[false])],
    'alerts'
  );

  data.comms && params.append(
    notificationName[params.has(notificationName[false])],
    'other'
  );

  return http.post('users', params);
}