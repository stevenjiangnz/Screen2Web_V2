import { Screen2web2Page } from './app.po';

describe('screen2web2 App', () => {
  let page: Screen2web2Page;

  beforeEach(() => {
    page = new Screen2web2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
