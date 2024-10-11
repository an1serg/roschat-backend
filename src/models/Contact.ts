import { Pool } from 'pg';

export class Contact {
  cid: number;
  name: string;
  surname: string;
  post: string;
  static pool: Pool;

  constructor(cid: number, name: string, surname: string, post: string) {
    this.cid = cid;
    this.name = name;
    this.surname = surname;
    this.post = post;
  }

  // Получить все контакты
  static async getAll() {
    const res = await this.pool.query('SELECT * FROM contacts');
    return res.rows;
  }

  // Получить контакт по ID
  static async getById(cid: number) {
    const res = await this.pool.query('SELECT * FROM contacts WHERE cid = $1', [cid]);
    return res.rows[0];
  }

  // Создать контакт
  static async create({ name, surname, post }: { name: string; surname: string; post: string }) {
    const res = await this.pool.query(
      'INSERT INTO contacts (name, surname, post) VALUES ($1, $2, $3) RETURNING *',
      [name, surname, post]
    );
    return res.rows[0];
  }

  // Обновить контакт
  static async update(cid: number, { name, surname, post }: { name: string; surname: string; post: string }) {
    const res = await this.pool.query(
      'UPDATE contacts SET name = $1, surname = $2, post = $3 WHERE cid = $4 RETURNING *',
      [name, surname, post, cid]
    );
    return res.rows[0];
  }
}