import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Duty } from './duty/duty.interface';
import { Result } from './result.interface';

@Injectable()
export class AppService {
  constructor(@Inject('PG_CONNECTION') private conn: any) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDuties(): Promise<Duty[]> {
    const res = await this.conn.query('SELECT * FROM duties');
    return res.rows;
  }

  async getDuty(id: string): Promise<Duty> {
    const res = await this.conn.query('SELECT * FROM duties WHERE id = $1', [id]);
    
    if (res.rows.length === 0) {
      throw new NotFoundException();
    }

    return res.rows[0];
  }

  async createDuty(name: string): Promise<Result> {
    try {
      await this.conn.query('INSERT INTO duties (name) VALUES ($1)', [name]);
      return { message: 'Task is successfully created.' };
    } catch (error) {
      if (error.constraint === 'duty-unique') {
        throw new BadRequestException('Task already exists. Try another name.');
      } else {
        console.log(error);
        throw new BadRequestException(error);
      }
    }
  }

  async updateDuty(id: string, name: string): Promise<Result> {
    try {
      const res = await this.conn.query('UPDATE duties SET name = $1 WHERE id = $2', [name, id]);

      if (res.rowCount === 0) {
        return { message: 'Task with ID does not exist.' };
      }

      return { message: 'Task is successfully updated.' };
    } catch (error) {
      if (error.constraint === 'duty-unique') {
        throw new BadRequestException('Task already exists. Try another name.');
      } else {
        console.log(error);
        throw new BadRequestException(error);
      }
    }
  }
}
