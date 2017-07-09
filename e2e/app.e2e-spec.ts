import { PhograUi.2aPage } from './app.po';

describe('phogra-ui.2a App', () => {
  let page: PhograUi.2aPage;

  beforeEach(() => {
    page = new PhograUi.2aPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
