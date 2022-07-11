import { email } from 'data';
import { test, expect } from 'fixtures';
import { sleep } from 'helpers';

test.describe('First test', () => {
  test('search playwright', async ({ notConfirmedAlarmsPage, logInPage }) => {
    // Arrange
    await logInPage.goto();
    await logInPage.signIn(email.viacheslavKharchenko);

    await expect(notConfirmedAlarmsPage.title).toBeVisible();

    await notConfirmedAlarmsPage.goto();

    // Act
    await sleep(20000);

    // Assert
  });

  // test('search cypress', async ({ notConfirmedAlarmsPage }) => {
  //   // Arrange
  //   await notConfirmedAlarmsPage.goto();

  //   // Act
  //   await sleep(20000);

  //   // Assert
  // });
});
