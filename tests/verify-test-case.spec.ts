import { test, expect } from '@playwright/test';
import { TestCasePage } from '../src/pages/test-cases.page';
import { readJsonFile } from '../src/helpers/read-json.helper';

interface TestCase {
  steps: string[];
}

test('TC#7 Verify test case', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await page.locator('#header').getByRole('link', { name: 'Test Cases ' }).click();
  await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
  await page.waitForLoadState('domcontentloaded');
  const testCaseSteps = await readJsonFile<TestCase>('../src/data/tc1-steps.json')

  const testCasePage = new TestCasePage(page);
  await testCasePage.expandTestCase('Test Case 1: Register User');
  const actualTestCaseSteps = await testCasePage.getTestCaseSteps('#collapse1');

  console.log('test case steps from json', JSON.stringify(testCaseSteps.steps));
  expect(actualTestCaseSteps).toEqual(testCaseSteps.steps);
});
