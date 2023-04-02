import { Test, TestingModule } from '@nestjs/testing';
import { ScriptGradesService } from './script-grades.service';

describe('ScriptGradesService', () => {
  let service: ScriptGradesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptGradesService],
    }).compile();

    service = module.get<ScriptGradesService>(ScriptGradesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
