import { DateToDayOfWeekPipe } from './date-to-day-of-week.pipe';

describe('DateToDayOfWeekPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToDayOfWeekPipe();
    expect(pipe).toBeTruthy();
  });
});
