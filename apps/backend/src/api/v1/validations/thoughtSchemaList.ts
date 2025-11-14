export const thoughtSchemaList = {
  type: 'object',
  properties: {
    author: { type: 'string', minLength: 1, maxLength: 255 },
    content: { type: 'string', minLength: 1, maxLength: 1000 },
  },
  required: ['author', 'content'],
  additionalProperties: false,
};