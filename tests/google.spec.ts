import { test, expect } from 'fixtures';
import { searchQuery, searchQueryLink } from 'data';

test.describe('Google', () => {
  test('search playwright', async ({ mainPage, searchPage }) => {
    // Arrange
    await mainPage.goto();
    const textLanguage = await mainPage.getSwitchLanguageTextBlock();
    expect(textLanguage).toEqual('Мова Google: русский English');

    // Act
    await mainPage.searchFragment.search(searchQuery.playwright);

    // Assert
    await searchPage.checkFirstResultLink(searchQueryLink.playwright);
  });

  test('search cypress', async ({ mainPage, searchPage }) => {
    // Arrange
    await mainPage.goto();

    // Act
    await mainPage.searchFragment.search(searchQuery.cypress);

    // Assert
    await searchPage.checkFirstResultLink(searchQueryLink.cypress);
  });
});
