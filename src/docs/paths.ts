import {
  companyPath,
  deleteCompanyPath,
  updateCompanyPath,
  containerPath,
  listContainersPath,
  updateContainerPath,
  addMediaToContainerPath,
  selectChatlinePath,
  listChatlineCompanyPath,
  sendMessageChatPath,
  greetingPath,
} from './paths/';

export default {
  '/company': companyPath,
  '/company/delete/{companyId}': deleteCompanyPath,
  '/company/profile/{companyId}': updateCompanyPath,
  '/container/{companyId}': containerPath,
  '/contianer': listContainersPath,
  '/container/{containerId}': updateContainerPath,
  '/media/{containerId}': addMediaToContainerPath,
  '/select': selectChatlinePath,
  '/chat': listChatlineCompanyPath,
  '/union/response': sendMessageChatPath,
  '/greeting/{companyId}': greetingPath,
};
