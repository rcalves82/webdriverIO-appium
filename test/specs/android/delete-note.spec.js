const { default: ChromeDriverService } = require("wdio-chromedriver-service");

describe('Delete Notes', () => {
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

    it('Delete a note & check the note in trash can', async () => {
        await driver.back();

        const note = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]')
            .getText();

        // click on the note
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]').click();

        // click on more icon
        await $('~Mais').click();

        // click on Delete item
        await $('//*[@text="Remover"]').click();

        // accept alert
        await driver.acceptAlert();

        // click on nav icon
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]').click();

        // click on trash can item
        await $('//*[@text="Lixeira"]').click();

        // assertions
        const trashCanItem = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
        
        await expect(trashCanItem).toHaveText(note);

    });
});