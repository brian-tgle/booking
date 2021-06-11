import Repository from './repository';

const url = 'booking';

const BookingRepository = {
  /**
   * /GET. Get the list of booking
   * @return {Array} the list of booking
   */
  getAll: (page, limt) => Repository.get(`${url}?page=${page}&limit=${limt}`),

  create: (payload) => Repository.post(url, payload),

  update: (bookingId, action, payload) => Repository.put(`${url}/${action}/${bookingId}`, payload),

  cancel: (bookingId) => Repository.delete(`${url}/${bookingId}`)
};

export default BookingRepository;
