import PropTypes from 'prop-types';

import ID from '@reagentum/front-core/lib/common/models/model-id';
import DATE from '@reagentum/front-core/lib/common/models/model-date';

export const ATTACHMENT_PROP_TYPE_MAP = {
  id: ID,
  fileName: PropTypes.string.isRequired,
  preview: PropTypes.string,
  description: PropTypes.string,
  uploadedOn: DATE,
  uploadedBy: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  contextParams: PropTypes.object,
  downloadUrl: PropTypes.string,

  // services field
  // client
  uuid: ID,
  isNew: PropTypes.bool,
  loaded: PropTypes.number,
  total: PropTypes.number,
  isLoaded: PropTypes.bool,

  // server
  serverPath: PropTypes.string, // путь к файлу на сервере, если хранится не в базе
};

export function createAttachment(
  id,
  fileName,
  size,
  type,
  uploadedBy,
  downloadUrl,
  serverPath = null,
  preview = null,
  description = null,
  uploadedOn = new Date(),
  contextParams = {},
) {
  return {
    id,
    fileName,
    preview,
    description,
    uploadedOn,
    uploadedBy,
    size,
    type,
    downloadUrl,
    serverPath,
    contextParams,
  };
}

export function normalizeAttachment(attachment) {
  if (typeof attachment === 'string'
    || (Array.isArray(attachment) && typeof attachment[0] === 'string')) {
    return Array.isArray(attachment)
      ? attachment.map((attachItem) =>
        createAttachment(attachItem, attachItem, null, null, null, attachItem, null, attachItem))
      : createAttachment(attachment, attachment, null, null, null, attachment, null, attachment);
  }
  return attachment;
}

export const ATTACHMENT_PROP_TYPE = PropTypes.shape(ATTACHMENT_PROP_TYPE_MAP);

export default ATTACHMENT_PROP_TYPE;
