// Hand-written OpenAPI spec served at /api-docs via swagger-ui-express
const student = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    courseId: { type: 'string' },
    academicYear: { type: 'string' },
  },
}

const course = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    courseName: { type: 'string' },
  },
}

const jsonBody = (schema) => ({
  required: true,
  content: { 'application/json': { schema } },
})

module.exports = {
  openapi: '3.0.0',
  info: { title: 'Students & Courses API', version: '1.0.0' },
  paths: {
    '/students': {
      get: { summary: 'List all students', responses: { 200: { description: 'OK' } } },
      post: {
        summary: 'Create a student',
        requestBody: jsonBody({ $ref: '#/components/schemas/Student' }),
        responses: { 201: { description: 'Created' }, 400: { description: 'Invalid data' } },
      },
    },
    '/students/{id}': {
      get: {
        summary: 'Get a student by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        summary: 'Update a student',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: jsonBody({ $ref: '#/components/schemas/Student' }),
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } },
      },
      delete: {
        summary: 'Delete a student',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Deleted' }, 404: { description: 'Not found' } },
      },
    },
    '/courses': {
      get: { summary: 'List all courses', responses: { 200: { description: 'OK' } } },
      post: {
        summary: 'Create a course',
        requestBody: jsonBody({ $ref: '#/components/schemas/Course' }),
        responses: { 201: { description: 'Created' } },
      },
    },
    '/courses/{id}': {
      get: {
        summary: 'Get a course by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
    },
  },
  components: { schemas: { Student: student, Course: course } },
}
