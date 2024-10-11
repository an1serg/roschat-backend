import { Context } from 'koa';
import { Contact } from '../models/Contact';
import { InvalidArgumentsError } from '../utils/errors';

export class ContactController {
  // Получение всех контактов
  static async getAllContacts(ctx: Context) {
    try {
      const contacts = await Contact.getAll();
      ctx.body = contacts;
    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      } else {
        ctx.throw(500, 'An unknown error occurred');
      }
    }
  }

  // Получение контакта по ID
  static async getContactById(ctx: Context) {
    const { cid } = ctx.params;
    if (!cid) throw new InvalidArgumentsError("Contact ID is required");

    try {
      const contact = await Contact.getById(Number(cid));
      if (!contact) {
        ctx.throw(404, 'Contact not found');
      }
      ctx.body = contact;
    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      } else {
        ctx.throw(500, 'An unknown error occurred');
      }
    }
  }

  // Создание нового контакта
  static async createContact(ctx: Context) {
    const { name, surname, post } = ctx.request.body;

    if (!name || !surname || !post) {
      throw new InvalidArgumentsError("Name, surname, and post are required");
    }

    try {
      const newContact = await Contact.create({ name, surname, post });
      ctx.body = newContact;
    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      } else {
        ctx.throw(500, 'An unknown error occurred');
      }
    }
  }

  // Обновление контакта
  static async updateContact(ctx: Context) {
    const { cid } = ctx.params;
    const { name, surname, post } = ctx.request.body;

    if (!cid || !name || !surname || !post) {
      throw new InvalidArgumentsError("Contact ID, name, surname, and post are required");
    }

    try {
      const updatedContact = await Contact.update(Number(cid), { name, surname, post });
      ctx.body = updatedContact;
    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      } else {
        ctx.throw(500, 'An unknown error occurred');
      }
    }
  }
}
