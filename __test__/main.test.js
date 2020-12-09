it('calls console.log with "err"', () => {
  const consoleSpy = jest.spyOn(console, 'log');

  console.log('err');

  expect(consoleSpy).toHaveBeenCalledWith('err');
});
