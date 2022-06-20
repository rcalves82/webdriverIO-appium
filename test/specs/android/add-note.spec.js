const { default: ChromeDriverService } = require("wdio-chromedriver-service");

describe('Add Notes', () => {
    it('add a note, save e changes & verify note', async () => {
        await expect($('//*[@text="Adicionar nota"]')).toBeDisplayed();

        await $('//*[@text="Adicionar nota"]').click();
        await $('//*[@text="Texto"]').click();
        await expect($('//*[@text="Editando"]')).toBeDisplayed();

        // add note title
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]')
            .addValue("Fav Anime List");

        // add note body
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]')
            .addValue("Naruto\nOnePiece\nAOT");

        // save the changes
        await driver.back();
        await driver.back();

        // asserttion
        await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]'))
            .toBeDisplayed();
        await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]'))
            .toHaveText("Naruto\nOnePiece\nAOT");

    });
});