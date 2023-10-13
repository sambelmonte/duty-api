import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';


const sampleEntry = {id: '891723', name: 'test-task'};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DbModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  
  describe('getDuties', () => {
    it('should return all duties', async () => {
      const result = Promise.resolve([sampleEntry]);
      jest.spyOn(appService, 'getDuties').mockImplementation(() => result);

      expect(await appController.getDuties()).toStrictEqual([sampleEntry]);
    });
  });

  describe('getDuty', () => {
    it('should return a duty by ID', async () => {
      const result = Promise.resolve(sampleEntry);
      jest.spyOn(appService, 'getDuty').mockImplementation(() => result);

      expect(await appController.getDuty('891723')).toBe(sampleEntry);
    });
  });

  describe('createDuty', () => {
    it('should create a duty', async () => {
      const sampleMessage = {message: 'Task is successfully created.'};
      const result = Promise.resolve(sampleMessage);
      jest.spyOn(appService, 'createDuty').mockImplementation(() => result);

      expect(await appController.createDuty({name: 'Sample Task'})).toBe(sampleMessage);
    });
  });

  describe('updateDuty', () => {
    it('should update a duty', async () => {
      const sampleMessage = {message: 'Task is successfully updated.'};
      const result = Promise.resolve(sampleMessage);
      jest.spyOn(appService, 'updateDuty').mockImplementation(() => result);

      expect(await appController.updateDuty(
        '345346',
        {name: 'Sample Task #4'},
      )).toBe(sampleMessage);
    });
  });
});