document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const playerCount = parseInt(document.getElementById('player-count').value);

    const factions = ['Albion', 'Togawa', 'Polania', 'Crimea', 'Rusviet', 'Nordic', 'Saxony'];
    const types = ['Engineering', 'Industrial', 'Patriotic', 'Mechanical', 'Agricultural', 'Militant', 'Innovative'];

    const invalidCombinations = [
        'Rusviet - Industrial',
        'Crimea - Patriotic'
    ];

    const selectedFactions = shuffleArray(factions).slice(0, playerCount);
    const selectedTypes = shuffleArray(types).slice(0, playerCount);

    const results = [];
    for (let i = 0; i < playerCount; i++) {
        let combination = `${selectedFactions[i]} - ${selectedTypes[i]}`;
        if (invalidCombinations.includes(combination)) {
            let validCombination = false;
            while (!validCombination) {
                const tempFaction = selectedFactions[i];
                selectedFactions[i] = selectedFactions[(i + 1) % playerCount];
                selectedFactions[(i + 1) % playerCount] = tempFaction;
                combination = `${selectedFactions[i]} - ${selectedTypes[i]}`;
                if (!invalidCombinations.includes(combination)) {
                    validCombination = true;
                }
            }
        }
        results.push(combination);
    }

    document.getElementById('result').innerHTML = results.join('<br>');
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
