
Feature('make a move on the game board');

Scenario('Make a valid move on the game board', (I) => {
    I.amOnPage('http://18.191.224.215:5000/');
    I.click('Create Game');
    I.see('YOU', '.hexlabel-children');
    I.click('.cell-bg');
    I.click('.visitable');
    I.seeElement('.hexlabel .secondary');
});

Scenario('Make an invalid move on the game board', (I) => {
    I.amOnPage('http://18.191.224.215:5000/');
    I.click('Create Game');
    I.see('YOU', '.hexlabel-children');
    I.click('.cell-bg');
    I.click('.light:not(.visitable)');
    I.dontSeeElement('.hexlabel .secondary');
});

