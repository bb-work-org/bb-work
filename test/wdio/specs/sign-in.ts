import { browser } from "@wdio/globals";

describe("Sign In", () => {
  it("should sign in", async () => {
    const title = $("~Sign In");
    await title.waitForDisplayed({ timeout: 20000 });

    await browser.debug();
  });
});
