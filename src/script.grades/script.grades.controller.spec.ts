import { Test, TestingModule } from '@nestjs/testing';
import { ScriptGradesController } from './script.grades.controller';
import { ScriptGradesService } from './script.grades.service';

describe('ScriptGradesController', () => {
  let controller: ScriptGradesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScriptGradesController],
      providers: [ScriptGradesService],
    }).compile();

    controller = module.get<ScriptGradesController>(ScriptGradesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
