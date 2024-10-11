import Router from 'koa-router'
import { requestLogger } from './middlewares/requestLogger'
import { responseBuilder } from './middlewares/responseBuilder'
import { ContactController } from './controllers/ContactController';

const apiRouter = new Router({ prefix: '/api' })

apiRouter.use(responseBuilder)
apiRouter.use(requestLogger)

// GET /api/contacts - получение всех контактов
apiRouter.get('/contacts', ContactController.getAllContacts);

// GET /api/contacts/:cid - получение контакта по ID
apiRouter.get('/contacts/:cid', ContactController.getContactById);

// POST /api/contacts - создание нового контакта
apiRouter.post('/contacts', ContactController.createContact);

// PUT /api/contacts/:cid - редактирование контакта
apiRouter.put('/contacts/:cid', ContactController.updateContact);

export default [apiRouter]