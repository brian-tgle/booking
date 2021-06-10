import Repository from './repository';

const url = 'eventCategory';

const EventCategoryRepository = {
  /**
   * /GET. Get the list of event type
   * @return {Array} the list of event type
   */
  getAll: () => Repository.get(url)
};

export default EventCategoryRepository;
