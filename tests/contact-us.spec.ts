import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../src/pages/contact-us.page';
import path from 'path';
import { fileURLToPath } from 'url';


test('TC#6 Contact Form', async ({ page }) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, '..', 'src/fixtures', 'sample.txt');
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await expect(page.getByText('GET IN TOUCH')).toBeVisible();
  await new ContactUsPage(page).fill('John Doe', 'johndoe111@example.com', 'How are you',
    'How is the progress of you automating this demo site',
    filePath
  );
  await page.getByRole('button', { name: 'Submit' }).click();
});


test.fixme('Submit button not working', async ({ page }) => {
  await expect(page.getByText('Success! Your details have been submitted successfully.')).toBeVisible();
});