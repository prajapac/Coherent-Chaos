
Feature('navigate through the menu page');

Scenario('create a new game', (I) => {
    I.amOnPage('http://18.191.224.215:5000/');
    I.click('Create Game');
    I.see('YOU', '.hexlabel-children');
});

Scenario('create a new game and go back to menu page', (I) => {
    I.amOnPage('http://18.191.224.215:5000/');
    I.click('Create Game');
    I.see('YOU', '.hexlabel-children');
    I.click('< Leave');
    I.see('Start Playing!', 'h2');
});

Scenario('join in a game successfully with an existing game id', async (I) => {
    I.amOnPage('http://18.191.224.215:5000/');
    I.click('Create Game');
    let gameId = await I.grabTextFrom('div.header-gid');
    I.click('< Leave');
    I.fillField('input.game-id-input', gameId);
    I.click('Join Game');
    I.click('Player 2');
    I.see('YOU', '.hexlabel-children');
});

Scenario('join in a game unsuccessfully with a non-existing game id', (I) => {
    I.amOnPage('http://18.191.224.215:5000/');
    I.fillField('input.game-id-input', 'A4B6');
    I.click('Join Game');
    I.see('Start Playing!', 'h2');
});
