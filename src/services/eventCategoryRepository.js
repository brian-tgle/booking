import Repository from './repository';

const url = 'eventCategory';

const EventCategoryRepository = {
  /**
   * /GET. Get the list of event type
   * @return {Array} the list of event type
   */
  getAll: () => Repository.get(url),

  createOrUpdate: (payload) => {
    if (payload.id) {
      return Repository.put(`${url}/${payload.id}`, { name: payload.name });
    }
    return Repository.post(url, payload);
  },
  delete: (id) => Repository.delete(`${url}/${id}`)
};

export default EventCategoryRepository;
